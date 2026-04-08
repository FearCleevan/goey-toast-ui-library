export const bottomSheetTemplate = `\
import React, { type ReactNode, useEffect } from "react";
import { Pressable, View, type StyleProp, type ViewStyle } from "react-native";
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
import { useTheme } from "@gooey/core";

export interface IBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Sheet height as fraction of screen height (0–1). Defaults to 0.5 */
  snapPoint?: number;
  contentStyle?: StyleProp<ViewStyle>;
}

const DRAG_THRESHOLD = 80;
const SCREEN_HEIGHT = require("react-native").Dimensions.get("window").height;

function BottomSheet({
  visible,
  onClose,
  children,
  snapPoint = 0.5,
  contentStyle,
}: IBottomSheetProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const sheetHeight = SCREEN_HEIGHT * snapPoint;

  const translateY = useSharedValue(sheetHeight);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      backdropOpacity.value = withTiming(1, { duration: 220, easing: Easing.out(Easing.ease) });
      translateY.value = withSpring(0, { damping: 22, stiffness: 260 });
    } else {
      backdropOpacity.value = withTiming(0, { duration: 180 });
      translateY.value = withTiming(sheetHeight, { duration: 200 });
    }
  }, [visible]);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) translateY.value = e.translationY;
    })
    .onEnd((e) => {
      if (e.translationY > DRAG_THRESHOLD) {
        translateY.value = withTiming(sheetHeight, { duration: 200 });
        runOnJS(onClose)();
      } else {
        translateY.value = withSpring(0, { damping: 22, stiffness: 260 });
      }
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  if (!visible) return null;

  return (
    <View style={{ ...StyleSheet.absoluteFillObject, zIndex: 999 }}>
      <Animated.View
        style={[{ ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.5)" }, backdropStyle]}
      >
        <Pressable style={{ flex: 1 }} onPress={onClose} accessibilityLabel="Close sheet" />
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: sheetHeight + insets.bottom,
              backgroundColor: theme.colors.card,
              borderTopLeftRadius: theme.radius["2xl"],
              borderTopRightRadius: theme.radius["2xl"],
              overflow: "hidden",
            },
            sheetStyle,
          ]}
        >
          {/* Drag handle */}
          <View style={{ alignItems: "center", paddingTop: 10, paddingBottom: 4 }}>
            <View
              style={{
                width: 36,
                height: 4,
                borderRadius: 2,
                backgroundColor: theme.colors.border,
              }}
            />
          </View>

          <View style={[{ flex: 1, paddingBottom: insets.bottom }, contentStyle]}>
            {children}
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

// Inline StyleSheet import to keep template self-contained
const { StyleSheet } = require("react-native");

export { BottomSheet };
`;
