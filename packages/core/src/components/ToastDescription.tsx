import { styles } from "@/styles/toast.styles";
import type { IToastDescriptionProps } from "@/typings";
import { ToastBodyLayout } from "@/typings";
import { Text, View } from "react-native";
import { useTheme } from "../theme";

function ToastDescription(props: IToastDescriptionProps) {
  const theme = useTheme();
  const textColor = theme.colors.foreground;
  const metaColor = theme.colors.mutedForeground;

  if (
    props.layout === ToastBodyLayout.Spread ||
    props.layout === ToastBodyLayout.Right
  ) {
    return (
      <View style={styles.descRow}>
        <View style={styles.descTextWrap}>
          <Text style={[styles.descText, styles.textLeft, { color: textColor }]}>
            {props.description}
          </Text>
        </View>
        {props.meta ? (
          <Text style={[styles.descMeta, { color: metaColor }]}>
            {props.meta}
          </Text>
        ) : null}
      </View>
    );
  }

  const alignStyle =
    props.layout === ToastBodyLayout.Center
      ? styles.textCenter
      : styles.textLeft;

  return (
    <View>
      <Text style={[styles.descText, alignStyle, { color: textColor }]}>
        {props.description}
      </Text>
      {props.meta ? (
        <Text style={[styles.descMetaInline, alignStyle, { color: metaColor }]}>
          {props.meta}
        </Text>
      ) : null}
    </View>
  );
}

export { ToastDescription };
