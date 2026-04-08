import { styles } from "@/styles/toast.styles";
import type { IToastProgressProps } from "@/typings";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { useTheme } from "../theme";

function ToastProgress(props: IToastProgressProps) {
  const theme = useTheme();
  const trackStyle = props.inline
    ? styles.inlineProgressTrack
    : styles.progressTrack;
  const fillStyle = props.inline
    ? styles.inlineProgressFill
    : styles.progressFill;

  return (
    <View
      style={[trackStyle, { backgroundColor: theme.colors.progressTrack }]}
    >
      <Animated.View
        style={[
          fillStyle,
          { backgroundColor: props.backgroundColor },
          props.style,
        ]}
      />
    </View>
  );
}

export { ToastProgress };
