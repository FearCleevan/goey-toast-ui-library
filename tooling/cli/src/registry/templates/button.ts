export const buttonTemplate = `\
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Text, useTheme } from "@gooey/core";

export type TButtonVariant = "solid" | "outline" | "ghost";
export type TButtonSize = "sm" | "md" | "lg";

export interface IButtonProps {
  label: string;
  onPress?: () => void;
  variant?: TButtonVariant;
  size?: TButtonSize;
  color?: string;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

const SIZE_MAP = {
  sm: { px: 14, py: 8,  fontSize: "xs" as const, height: 32 },
  md: { px: 18, py: 11, fontSize: "sm" as const, height: 40 },
  lg: { px: 22, py: 14, fontSize: "md" as const, height: 48 },
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function Button({
  label,
  onPress,
  variant = "solid",
  size = "md",
  color,
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
}: IButtonProps) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const { px, py, fontSize, height } = SIZE_MAP[size];
  const accent = color ?? theme.colors.toast.info.icon;
  const isDisabled = disabled || loading;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const containerStyle = {
    height,
    paddingHorizontal: px,
    paddingVertical: py,
    borderRadius: theme.radius.lg,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    flexDirection: "row" as const,
    gap: 8,
    opacity: isDisabled ? 0.45 : 1,
    alignSelf: fullWidth ? ("stretch" as const) : ("flex-start" as const),
    ...(variant === "solid" && { backgroundColor: accent }),
    ...(variant === "outline" && {
      borderWidth: 1.5,
      borderColor: accent,
      backgroundColor: "transparent",
    }),
    ...(variant === "ghost" && { backgroundColor: "transparent" }),
  };

  const textColor =
    variant === "solid" ? "#fff" : accent;

  return (
    <AnimatedPressable
      style={[animatedStyle, containerStyle, style]}
      onPress={onPress}
      disabled={isDisabled}
      onPressIn={() => { scale.value = withSpring(0.96, { damping: 18, stiffness: 300 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 18, stiffness: 300 }); }}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {loading && <ActivityIndicator size="small" color={textColor} />}
      <Text size={fontSize} weight="semibold" color={textColor}>
        {label}
      </Text>
    </AnimatedPressable>
  );
}

export { Button };
`;
