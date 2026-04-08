const fontSizes = {
  "2xs": 10,
  xs: 11,
  sm: 12,
  md: 13,
  lg: 15,
  xl: 17,
  "2xl": 20,
  "3xl": 24,
  "4xl": 30,
} as const;

const fontWeights = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

const lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

const letterSpacings = {
  tighter: -0.5,
  tight: -0.25,
  normal: 0,
  wide: 0.25,
  wider: 0.5,
} as const;

export interface ITypography {
  fontSizes: typeof fontSizes;
  fontWeights: typeof fontWeights;
  lineHeights: typeof lineHeights;
  letterSpacings: typeof letterSpacings;
}

const typography: ITypography = {
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
};

export { typography };
