import type { ISemanticColors } from "./colors";
import type { IMotion } from "./motion";
import type { IRadius } from "./radius";
import type { IShadows } from "./shadows";
import type { ISpacing } from "./spacing";
import type { ITypography } from "./typography";

export interface ITheme {
  colors: ISemanticColors;
  typography: ITypography;
  spacing: ISpacing;
  radius: IRadius;
  shadows: IShadows;
  motion: IMotion;
  /** "light" | "dark" — useful for conditional rendering */
  colorScheme: "light" | "dark";
}

/** Recursively make all properties optional */
export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;
