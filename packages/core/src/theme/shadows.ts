export interface IShadowToken {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface IShadows {
  none: IShadowToken;
  sm: IShadowToken;
  md: IShadowToken;
  lg: IShadowToken;
  xl: IShadowToken;
  "2xl": IShadowToken;
}

function makeShadows(color: string): IShadows {
  return {
    none: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 3,
      elevation: 2,
    },
    md: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.12,
      shadowRadius: 22,
      elevation: 10,
    },
    xl: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.14,
      shadowRadius: 32,
      elevation: 14,
    },
    "2xl": {
      shadowColor: color,
      shadowOffset: { width: 0, height: 24 },
      shadowOpacity: 0.18,
      shadowRadius: 48,
      elevation: 20,
    },
  };
}

const lightShadows = makeShadows("#0f172a");
const darkShadows = makeShadows("#000000");

export { darkShadows, lightShadows, makeShadows };
