import { darkSemanticColors } from "./colors";
import { motion } from "./motion";
import { radius } from "./radius";
import { darkShadows } from "./shadows";
import { spacing } from "./spacing";
import { typography } from "./typography";
import type { ITheme } from "./types";

const darkTheme: ITheme = {
  colors: darkSemanticColors,
  typography,
  spacing,
  radius,
  shadows: darkShadows,
  motion,
  colorScheme: "dark",
};

export { darkTheme };
