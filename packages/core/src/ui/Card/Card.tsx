import React, { type ReactNode } from "react";
import { Pressable, View, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "../../theme";
import type { IRadius } from "../../theme/radius";
import type { IShadows } from "../../theme/shadows";

export interface ICardProps {
  children?: ReactNode;
  onPress?: () => void;
  radius?: keyof IRadius;
  shadow?: keyof IShadows;
  bg?: string;
  p?: number;
  /** Render a subtle border instead of (or in addition to) shadow */
  bordered?: boolean;
  style?: StyleProp<ViewStyle>;
}

function Card({
  children,
  onPress,
  radius = "xl",
  shadow = "md",
  bg,
  p = 16,
  bordered = false,
  style,
}: ICardProps) {
  const theme = useTheme();
  const scale = useSharedValue(1);
  const pressable = Boolean(onPress);

  const cardStyle: ViewStyle = {
    backgroundColor: bg ?? theme.colors.background,
    borderRadius: theme.radius[radius],
    padding: p,
    ...(bordered && {
      borderWidth: 1,
      borderColor: theme.colors.border,
    }),
    ...theme.shadows[shadow],
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (!pressable) {
    return <View style={[cardStyle, style]}>{children}</View>;
  }

  return (
    <Animated.View style={[animatedStyle]}>
      <Pressable
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.98, { damping: 20, stiffness: 300 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 20, stiffness: 300 });
        }}
        style={[cardStyle, style]}
        accessibilityRole="button"
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

export { Card };
