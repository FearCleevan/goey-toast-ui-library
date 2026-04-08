import React, { useEffect } from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../../theme";
import type { IRadius } from "../../theme/radius";

export interface ISkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  radius?: keyof IRadius;
  /** Use "circle" to get a perfectly round skeleton (width === height required) */
  circle?: boolean;
  style?: StyleProp<ViewStyle>;
}

function Skeleton({
  width = "100%",
  height = 16,
  radius = "md",
  circle = false,
  style,
}: ISkeletonProps) {
  const theme = useTheme();
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.4, {
        duration: 800,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
    return () => cancelAnimation(opacity);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  const dim = circle ? Math.min(height, typeof width === "number" ? width : height) : undefined;

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          width: circle ? dim : width,
          height: circle ? dim : height,
          borderRadius: circle
            ? (dim ?? height) / 2
            : theme.radius[radius],
          backgroundColor: theme.colors.muted,
        },
        style,
      ]}
    />
  );
}

export { Skeleton };
