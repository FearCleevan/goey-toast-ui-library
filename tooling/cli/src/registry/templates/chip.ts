export const chipTemplate = `\
import React, { type ReactNode } from "react";
import { Pressable, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Text, useTheme } from "@gooey/core";

export interface IChipProps {
  children: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  leftIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

function Chip({
  children,
  selected = false,
  disabled = false,
  onPress,
  leftIcon,
  style,
}: IChipProps) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const accent = theme.colors.toast.info.icon;

  const containerStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.radius.full,
    borderWidth: 1.5,
    borderColor: selected ? accent : theme.colors.border,
    backgroundColor: selected ? \`\${accent}18\` : "transparent",
    opacity: disabled ? 0.5 : 1,
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, { alignSelf: "flex-start" }]}>
      <Pressable
        onPress={disabled ? undefined : onPress}
        onPressIn={() => {
          if (!disabled) scale.value = withSpring(0.95, { damping: 20, stiffness: 400 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 20, stiffness: 400 });
        }}
        style={[containerStyle, style]}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: selected, disabled }}
      >
        {leftIcon}
        <Text
          size="sm"
          weight={selected ? "semibold" : "normal"}
          color={selected ? accent : theme.colors.mutedForeground}
        >
          {children}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

export { Chip };
`;
