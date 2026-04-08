import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { useTheme } from "../../theme";

export interface IDividerProps {
  orientation?: "horizontal" | "vertical";
  color?: string;
  thickness?: number;
  style?: StyleProp<ViewStyle>;
}

function Divider({
  orientation = "horizontal",
  color,
  thickness = 1,
  style,
}: IDividerProps) {
  const theme = useTheme();

  const computedStyle: ViewStyle =
    orientation === "horizontal"
      ? {
          width: "100%",
          height: thickness,
          backgroundColor: color ?? theme.colors.border,
        }
      : {
          width: thickness,
          alignSelf: "stretch",
          backgroundColor: color ?? theme.colors.border,
        };

  return <View style={[computedStyle, style]} />;
}

export { Divider };
