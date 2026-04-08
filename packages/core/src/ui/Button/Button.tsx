import React, { type ReactNode } from "react";
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
import { Text } from "../../primitives/Text";
import { useTheme } from "../../theme";

export type TButtonVariant = "solid" | "outline" | "ghost";
export type TButtonSize = "sm" | "md" | "lg";

export interface IButtonProps {
  children: ReactNode;
  variant?: TButtonVariant;
  size?: TButtonSize;
  /** Accent color override — defaults to theme brand (blue) */
  color?: string;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

const SIZE_MAP = {
  sm: { px: 12, py: 8,  fontSize: "sm" as const, height: 36, iconSize: 14 },
  md: { px: 16, py: 10, fontSize: "md" as const, height: 44, iconSize: 16 },
  lg: { px: 20, py: 14, fontSize: "lg" as const, height: 52, iconSize: 18 },
};

function Button({
  children,
  variant = "solid",
  size = "md",
  color,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  onPress,
  style,
  accessibilityLabel,
}: IButtonProps) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const dim = SIZE_MAP[size];
  const accent = color ?? theme.colors.toast.info.icon;
  const isDisabled = disabled || loading;

  const containerStyle: ViewStyle = {
    height: dim.height,
    paddingHorizontal: dim.px,
    paddingVertical: dim.py,
    borderRadius: theme.radius.full,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    opacity: isDisabled ? 0.5 : 1,
    ...(variant === "solid" && { backgroundColor: accent }),
    ...(variant === "outline" && {
      backgroundColor: "transparent",
      borderWidth: 1.5,
      borderColor: accent,
    }),
    ...(variant === "ghost" && { backgroundColor: "transparent" }),
  };

  const textColor =
    variant === "solid" ? "#ffffff" : accent;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (isDisabled) return;
    scale.value = withSpring(0.96, { damping: 20, stiffness: 400 });
  };
  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 20, stiffness: 400 });
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={isDisabled ? undefined : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[containerStyle, style]}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled: isDisabled, busy: loading }}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={textColor}
          />
        ) : (
          <>
            {leftIcon}
            <Text size={dim.fontSize} weight="bold" color={textColor}>
              {children}
            </Text>
            {rightIcon}
          </>
        )}
      </Pressable>
    </Animated.View>
  );
}

export { Button };
