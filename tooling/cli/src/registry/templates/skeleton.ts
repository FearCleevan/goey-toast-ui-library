export const skeletonTemplate = `\
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
import { useTheme } from "@gooey/core";

export interface ISkeletonProps {
  width?: number | \`\${number}%\`;
  height?: number;
  radius?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
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
      withTiming(0.4, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    return () => cancelAnimation(opacity);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  const r = circle
    ? typeof width === "number" ? width / 2 : 999
    : theme.radius[radius];

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: r,
          backgroundColor: theme.colors.muted,
        },
        animatedStyle,
        style,
      ]}
    />
  );
}

export { Skeleton };
`;
