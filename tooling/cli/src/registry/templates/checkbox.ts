export const checkboxTemplate = `\
import React from "react";
import { Pressable, View, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Text, useTheme } from "@gooey/core";

export interface ICheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  indeterminate?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

function Checkbox({
  checked,
  onChange,
  label,
  indeterminate = false,
  disabled = false,
  style,
}: ICheckboxProps) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const checkScale = useSharedValue(checked ? 1 : 0);
  const accent = theme.colors.toast.info.icon;

  React.useEffect(() => {
    checkScale.value = withSpring(checked || indeterminate ? 1 : 0, {
      damping: 16,
      stiffness: 300,
    });
  }, [checked, indeterminate]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const checkStyle = useAnimatedStyle(() => ({
    opacity: checkScale.value,
    transform: [{ scale: checkScale.value }],
  }));

  const isActive = checked || indeterminate;

  return (
    <Pressable
      style={[{ flexDirection: "row", alignItems: "center", gap: 10 }, style]}
      onPress={() => !disabled && onChange(!checked)}
      onPressIn={() => { scale.value = withSpring(0.92, { damping: 18, stiffness: 300 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 18, stiffness: 300 }); }}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      disabled={disabled}
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            width: 20,
            height: 20,
            borderRadius: theme.radius.sm,
            borderWidth: isActive ? 0 : 2,
            borderColor: theme.colors.border,
            backgroundColor: isActive ? accent : "transparent",
            alignItems: "center",
            justifyContent: "center",
            opacity: disabled ? 0.4 : 1,
          },
        ]}
      >
        <Animated.View style={checkStyle}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text size="2xs" weight="bold" color="#fff">
              {indeterminate ? "─" : "✓"}
            </Text>
          </View>
        </Animated.View>
      </Animated.View>

      {label ? (
        <Text
          size="sm"
          color={disabled ? theme.colors.mutedForeground : theme.colors.foreground}
        >
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}

export { Checkbox };
`;
