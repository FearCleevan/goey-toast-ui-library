import React, { type ReactNode } from "react";
import { Pressable, View, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { HStack } from "../../primitives/Stack";
import { Text } from "../../primitives/Text";
import { useTheme } from "../../theme";

export interface ICheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  onChange?: (checked: boolean) => void;
  color?: string;
  size?: "sm" | "md" | "lg";
  style?: StyleProp<ViewStyle>;
}

const SIZE_MAP = { sm: 16, md: 20, lg: 24 };

function Checkbox({
  checked = false,
  indeterminate = false,
  disabled = false,
  label,
  onChange,
  color,
  size = "md",
  style,
}: ICheckboxProps) {
  const theme = useTheme();
  const dim = SIZE_MAP[size];
  const accent = color ?? theme.colors.toast.info.icon;
  const scale = useSharedValue(1);

  const isChecked = indeterminate || checked;

  const checkStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isChecked ? 1 : 0, { duration: 120 }),
    transform: [
      { scale: withSpring(isChecked ? 1 : 0.5, { damping: 18, stiffness: 300 }) },
    ],
  }));

  const boxStyle: ViewStyle = {
    width: dim,
    height: dim,
    borderRadius: theme.radius.sm,
    borderWidth: 2,
    borderColor: isChecked ? accent : theme.colors.border,
    backgroundColor: isChecked ? accent : "transparent",
    alignItems: "center",
    justifyContent: "center",
    opacity: disabled ? 0.5 : 1,
  };

  const pressScale = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[pressScale, { alignSelf: "flex-start" }]}>
      <Pressable
        onPress={() => {
          if (disabled) return;
          onChange?.(!checked);
        }}
        onPressIn={() => {
          if (!disabled)
            scale.value = withSpring(0.9, { damping: 20, stiffness: 400 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 20, stiffness: 400 });
        }}
        accessibilityRole="checkbox"
        accessibilityState={{ checked, disabled }}
        style={[{ flexDirection: "row", alignItems: "center", gap: 8 }, style]}
      >
        <View style={boxStyle}>
          <Animated.View style={checkStyle}>
            {indeterminate ? (
              <View
                style={{
                  width: dim * 0.5,
                  height: 2,
                  borderRadius: 1,
                  backgroundColor: "#fff",
                }}
              />
            ) : (
              // Simple check mark using two rotated rectangles
              <View style={{ width: dim * 0.55, height: dim * 0.55, alignItems: "center", justifyContent: "center" }}>
                <View style={{ position: "absolute", bottom: 1, left: 0, width: dim * 0.25, height: 2, borderRadius: 1, backgroundColor: "#fff", transform: [{ rotate: "45deg" }, { translateX: 1 }] }} />
                <View style={{ position: "absolute", bottom: 2, right: -1, width: dim * 0.45, height: 2, borderRadius: 1, backgroundColor: "#fff", transform: [{ rotate: "-55deg" }] }} />
              </View>
            )}
          </Animated.View>
        </View>
        {label ? (
          typeof label === "string" ? (
            <Text
              size={size === "sm" ? "sm" : "md"}
              color={disabled ? theme.colors.mutedForeground : theme.colors.foreground}
            >
              {label}
            </Text>
          ) : (
            label
          )
        ) : null}
      </Pressable>
    </Animated.View>
  );
}

export { Checkbox };
