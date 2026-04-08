import React from "react";
import { Pressable, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { HStack } from "../../primitives/Stack";
import { Text } from "../../primitives/Text";
import { useTheme } from "../../theme";

export interface ISwitchProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const SIZE_MAP = {
  sm: { track: { w: 36, h: 20 }, thumb: 14, offset: 16 },
  md: { track: { w: 44, h: 24 }, thumb: 18, offset: 20 },
  lg: { track: { w: 52, h: 28 }, thumb: 22, offset: 24 },
};

function Switch({
  value = false,
  onChange,
  disabled = false,
  size = "md",
  label,
  color,
  style,
}: ISwitchProps) {
  const theme = useTheme();
  const dim = SIZE_MAP[size];
  const accent = color ?? theme.colors.toast.info.icon;
  const translateX = useSharedValue(value ? dim.offset : 0);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(translateX.value, {
          damping: 18,
          stiffness: 300,
        }),
      },
    ],
  }));

  const trackStyle: ViewStyle = {
    width: dim.track.w,
    height: dim.track.h,
    borderRadius: dim.track.h / 2,
    backgroundColor: value ? accent : theme.colors.border,
    justifyContent: "center",
    paddingHorizontal: 3,
    opacity: disabled ? 0.5 : 1,
  };

  const thumbDim = dim.thumb;

  const handlePress = () => {
    if (disabled) return;
    const next = !value;
    translateX.value = next ? dim.offset : 0;
    onChange?.(next);
  };

  return (
    <HStack align="center" gap={8} style={style}>
      <Pressable
        onPress={handlePress}
        style={trackStyle}
        accessibilityRole="switch"
        accessibilityState={{ checked: value, disabled }}
      >
        <Animated.View
          style={[
            {
              width: thumbDim,
              height: thumbDim,
              borderRadius: thumbDim / 2,
              backgroundColor: "#ffffff",
              ...theme.shadows.sm,
            },
            thumbStyle,
          ]}
        />
      </Pressable>
      {label ? (
        <Text
          size="md"
          color={disabled ? theme.colors.mutedForeground : theme.colors.foreground}
        >
          {label}
        </Text>
      ) : null}
    </HStack>
  );
}

export { Switch };
