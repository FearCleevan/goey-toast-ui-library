import React, { type ReactNode, useEffect } from "react";
import {
  Pressable,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../theme";

export interface IBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Sheet height as fraction of screen (0–1). Defaults to 0.5 */
  snapPoint?: number;
  contentStyle?: StyleProp<ViewStyle>;
}

const DRAG_THRESHOLD = 80;

function BottomSheet({
  visible,
  onClose,
  children,
  snapPoint = 0.5,
  contentStyle,
}: IBottomSheetProps) {
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();
  const translateY = useSharedValue(600);
  const backdropOpacity = useSharedValue(0);
  const dragY = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, { damping: 22, stiffness: 280 });
      backdropOpacity.value = withTiming(1, { duration: 200 });
    } else {
      translateY.value = withTiming(600, { duration: 280, easing: Easing.in(Easing.cubic) });
      backdropOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible, translateY, backdropOpacity]);

  const pan = Gesture.Pan()
    .activeOffsetY([0, 10])
    .onUpdate((e) => {
      if (e.translationY > 0) {
        dragY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (e.translationY > DRAG_THRESHOLD || e.velocityY > 800) {
        runOnJS(onClose)();
      } else {
        dragY.value = withSpring(0, { damping: 20, stiffness: 280 });
      }
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value + dragY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  if (!visible && translateY.value >= 590) return null;

  return (
    <View
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 9999,
        justifyContent: "flex-end",
      }}
      pointerEvents={visible ? "auto" : "none"}
    >
      {/* Backdrop */}
      <Animated.View
        style={[
          backdropStyle,
          { position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.45)" },
        ]}
      >
        <Pressable
          style={{ flex: 1 }}
          onPress={onClose}
          accessibilityLabel="Close sheet"
        />
      </Animated.View>

      {/* Sheet */}
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            sheetStyle,
            {
              backgroundColor: theme.colors.background,
              borderTopLeftRadius: theme.radius["3xl"],
              borderTopRightRadius: theme.radius["3xl"],
              minHeight: `${snapPoint * 100}%` as `${number}%`,
              paddingBottom: bottom + 16,
              ...theme.shadows["2xl"],
            },
            contentStyle,
          ]}
        >
          {/* Drag handle */}
          <View style={{ alignItems: "center", paddingTop: 12, paddingBottom: 4 }}>
            <View
              style={{
                width: 36,
                height: 4,
                borderRadius: theme.radius.full,
                backgroundColor: theme.colors.border,
              }}
            />
          </View>
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

export { BottomSheet };
