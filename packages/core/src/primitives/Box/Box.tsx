import React, { useMemo, type ReactNode } from "react";
import { View, type StyleProp, type ViewStyle, type ViewProps } from "react-native";
import { useTheme } from "../../theme";
import type { IRadius } from "../../theme/radius";
import type { IShadows } from "../../theme/shadows";

export interface IBoxProps extends ViewProps {
  children?: ReactNode;
  /** Background color (any valid color string) */
  bg?: string;
  /** Uniform padding (raw pixels) */
  p?: number;
  /** Horizontal padding */
  px?: number;
  /** Vertical padding */
  py?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  /** Uniform margin */
  m?: number;
  mx?: number;
  my?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  /** Border radius token key */
  radius?: keyof IRadius;
  /** Shadow token key */
  shadow?: keyof IShadows;
  /** Border color */
  borderColor?: string;
  /** Border width */
  borderWidth?: number;
  flex?: number;
  /** Sets flexDirection: "row" */
  row?: boolean;
  /** Sets alignItems: "center" */
  centered?: boolean;
  style?: StyleProp<ViewStyle>;
}

function Box({
  children,
  bg,
  p, px, py, pt, pb, pl, pr,
  m, mx, my, mt, mb, ml, mr,
  radius,
  shadow,
  borderColor,
  borderWidth,
  flex,
  row,
  centered,
  style,
  ...rest
}: IBoxProps) {
  const theme = useTheme();

  const computedStyle = useMemo<ViewStyle>(() => {
    const s: ViewStyle = {};
    if (bg !== undefined) s.backgroundColor = bg;
    if (p !== undefined) s.padding = p;
    if (px !== undefined) s.paddingHorizontal = px;
    if (py !== undefined) s.paddingVertical = py;
    if (pt !== undefined) s.paddingTop = pt;
    if (pb !== undefined) s.paddingBottom = pb;
    if (pl !== undefined) s.paddingLeft = pl;
    if (pr !== undefined) s.paddingRight = pr;
    if (m !== undefined) s.margin = m;
    if (mx !== undefined) s.marginHorizontal = mx;
    if (my !== undefined) s.marginVertical = my;
    if (mt !== undefined) s.marginTop = mt;
    if (mb !== undefined) s.marginBottom = mb;
    if (ml !== undefined) s.marginLeft = ml;
    if (mr !== undefined) s.marginRight = mr;
    if (radius !== undefined) s.borderRadius = theme.radius[radius];
    if (shadow !== undefined) Object.assign(s, theme.shadows[shadow]);
    if (borderColor !== undefined) s.borderColor = borderColor;
    if (borderWidth !== undefined) s.borderWidth = borderWidth;
    if (flex !== undefined) s.flex = flex;
    if (row) s.flexDirection = "row";
    if (centered) s.alignItems = "center";
    return s;
  }, [bg, p, px, py, pt, pb, pl, pr, m, mx, my, mt, mb, ml, mr, radius,
      shadow, borderColor, borderWidth, flex, row, centered, theme]);

  return (
    <View style={[computedStyle, style]} {...rest}>
      {children}
    </View>
  );
}

export { Box };
