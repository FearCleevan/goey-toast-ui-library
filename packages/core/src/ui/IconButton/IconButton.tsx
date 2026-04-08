import React, { type ReactNode } from "react";
import { Pressable, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "../../theme";

export type TIconButtonVariant = "solid" | "outline" | "ghost";
export type TIconButtonSize = "sm" | "md" | "lg";
export type TIconButtonShape = "circle" | "square";

export interface IIconButtonProps {
  icon: ReactNode;
  variant?: TIconButtonVariant;
  size?: TIconButtonSize;
  shape?: TIconButtonShape;
  color?: string;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel: string;
}

const SIZE_MAP = {
  sm: 32,
  md: 40,
  lg: 48,
};

function IconButton({
  icon,
  variant = "ghost",
  size = "md",
  shape = "circle",
  color,
  disabled = false,
  onPress,
  style,
  accessibilityLabel,
}: IIconButtonProps) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const dim = SIZE_MAP[size];
  const accent = color ?? theme.colors.toast.info.icon;
  const radius = shape === "circle" ? dim / 2 : theme.radius.md;

  const containerStyle: ViewStyle = {
    width: dim,
    height: dim,
    borderRadius: radius,
    alignItems: "center",
    justifyContent: "center",
    opacity: disabled ? 0.5 : 1,
    ...(variant === "solid" && { backgroundColor: accent }),
    ...(variant === "outline" && {
      borderWidth: 1.5,
      borderColor: accent,
    }),
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={disabled ? undefined : onPress}
        onPressIn={() => {
          if (!disabled)
            scale.value = withSpring(0.92, { damping: 20, stiffness: 400 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 20, stiffness: 400 });
        }}
        style={[containerStyle, style]}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled }}
      >
        {icon}
      </Pressable>
    </Animated.View>
  );
}

export { IconButton };
