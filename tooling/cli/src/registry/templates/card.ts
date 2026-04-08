export const cardTemplate = `\
import React, { type ReactNode } from "react";
import {
  Pressable,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "@gooey/core";

export interface ICardProps {
  children: ReactNode;
  /** Make the card pressable with a scale animation */
  onPress?: () => void;
  /** Show a 1px border instead of a shadow */
  bordered?: boolean;
  style?: StyleProp<ViewStyle>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function Card({ children, onPress, bordered = false, style }: ICardProps) {
  const theme = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const cardStyle = {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius["2xl"],
    padding: theme.spacing[4],
    ...(bordered
      ? { borderWidth: 1, borderColor: theme.colors.border }
      : theme.shadows.md),
  };

  if (onPress) {
    return (
      <AnimatedPressable
        style={[animatedStyle, cardStyle, style]}
        onPress={onPress}
        onPressIn={() => { scale.value = withSpring(0.98, { damping: 18, stiffness: 300 }); }}
        onPressOut={() => { scale.value = withSpring(1, { damping: 18, stiffness: 300 }); }}
      >
        {children}
      </AnimatedPressable>
    );
  }

  return (
    <Animated.View style={[cardStyle, style]}>
      {children}
    </Animated.View>
  );
}

export { Card };
`;
