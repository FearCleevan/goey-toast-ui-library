import React, { type ReactNode } from "react";
import {
  View,
  type FlexStyle,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";

export interface IStackProps extends ViewProps {
  children?: ReactNode;
  /** Space between children (raw pixels) */
  gap?: number;
  /** flexDirection — defaults to "column" */
  direction?: "row" | "column";
  align?: FlexStyle["alignItems"];
  justify?: FlexStyle["justifyContent"];
  flex?: number;
  wrap?: FlexStyle["flexWrap"];
  style?: StyleProp<ViewStyle>;
}

function Stack({
  children,
  gap,
  direction = "column",
  align,
  justify,
  flex,
  wrap,
  style,
  ...rest
}: IStackProps) {
  const computedStyle: ViewStyle = {
    flexDirection: direction,
    ...(gap !== undefined && { gap }),
    ...(align !== undefined && { alignItems: align }),
    ...(justify !== undefined && { justifyContent: justify }),
    ...(flex !== undefined && { flex }),
    ...(wrap !== undefined && { flexWrap: wrap }),
  };

  return (
    <View style={[computedStyle, style]} {...rest}>
      {children}
    </View>
  );
}

/** Vertical stack (column direction) */
function VStack(props: Omit<IStackProps, "direction">) {
  return <Stack direction="column" {...props} />;
}

/** Horizontal stack (row direction) */
function HStack(props: Omit<IStackProps, "direction">) {
  return <Stack direction="row" {...props} />;
}

export { HStack, Stack, VStack };
