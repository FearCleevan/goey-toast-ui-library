import { palette } from "@gooey/core";
import type { ITheme } from "@gooey/core";

/**
 * Returns an ordered list of chart series colors derived from the design token palette.
 * Cycle through these for multi-series charts.
 */
export function getChartColors(theme: ITheme): string[] {
  return [
    theme.colors.toast.info.icon,
    theme.colors.toast.success.icon,
    theme.colors.toast.warning.icon,
    theme.colors.toast.error.icon,
    palette.blue200,
    palette.green200,
    palette.slate400,
  ];
}

/** Fallback single-series color */
export const DEFAULT_CHART_COLOR = palette.blue600;

/** Neutral grid / axis color token */
export const GRID_COLOR = palette.slate200;
