import React, { type ReactNode } from "react";
import {
  Text as RNText,
  type StyleProp,
  type TextProps,
  type TextStyle,
} from "react-native";
import { useTheme } from "../../theme";
import type { ITypography } from "../../theme/typography";

export interface IGooeyTextProps extends TextProps {
  children?: ReactNode;
  /** Font size token key */
  size?: keyof ITypography["fontSizes"];
  /** Font weight token key */
  weight?: keyof ITypography["fontWeights"];
  /** Text color (any valid color string) */
  color?: string;
  align?: TextStyle["textAlign"];
  /** Italic */
  italic?: boolean;
  /** Uppercase transform */
  uppercase?: boolean;
  style?: StyleProp<TextStyle>;
}

function Text({
  children,
  size = "md",
  weight = "normal",
  color,
  align,
  italic,
  uppercase,
  style,
  ...rest
}: IGooeyTextProps) {
  const theme = useTheme();

  const computedStyle: TextStyle = {
    fontSize: theme.typography.fontSizes[size],
    fontWeight: theme.typography.fontWeights[weight] as TextStyle["fontWeight"],
    color: color ?? theme.colors.foreground,
    ...(align !== undefined && { textAlign: align }),
    ...(italic && { fontStyle: "italic" }),
    ...(uppercase && { textTransform: "uppercase" }),
  };

  return (
    <RNText style={[computedStyle, style]} {...rest}>
      {children}
    </RNText>
  );
}

export { Text };
