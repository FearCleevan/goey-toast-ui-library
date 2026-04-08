import { lightSemanticColors } from "./colors";
import { motion } from "./motion";
import { radius } from "./radius";
import { lightShadows } from "./shadows";
import { spacing } from "./spacing";
import { typography } from "./typography";
import type { ITheme } from "./types";

const lightTheme: ITheme = {
  colors: lightSemanticColors,
  typography,
  spacing,
  radius,
  shadows: lightShadows,
  motion,
  colorScheme: "light",
};

export { lightTheme };
