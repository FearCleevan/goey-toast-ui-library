import React, { type ReactNode, useEffect } from "react";
import {
  Modal as RNModal,
  Pressable,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../../theme";

export interface IModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Close modal when backdrop is pressed */
  dismissOnBackdrop?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}

function Modal({
  visible,
  onClose,
  children,
  dismissOnBackdrop = true,
  contentStyle,
}: IModalProps) {
  const theme = useTheme();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(40);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 200, easing: Easing.out(Easing.cubic) });
      translateY.value = withSpring(0, { damping: 18, stiffness: 280 });
    } else {
      opacity.value = withTiming(0, { duration: 160 });
      translateY.value = withTiming(24, { duration: 160 });
    }
  }, [visible, opacity, translateY]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const contentAnimStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <RNModal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* Backdrop */}
        <Animated.View
          style={[
            backdropStyle,
            {
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.45)",
            },
          ]}
        >
          <Pressable
            style={{ flex: 1 }}
            onPress={dismissOnBackdrop ? onClose : undefined}
            accessibilityLabel="Close modal"
          />
        </Animated.View>

        {/* Content */}
        <Animated.View
          style={[
            contentAnimStyle,
            {
              backgroundColor: theme.colors.background,
              borderRadius: theme.radius["2xl"],
              padding: 24,
              width: "90%",
              maxWidth: 420,
              ...theme.shadows.xl,
            },
            contentStyle,
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </RNModal>
  );
}

export { Modal };
