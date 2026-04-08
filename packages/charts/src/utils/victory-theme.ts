import type { ITheme } from "@gooey/core";

/**
 * Generates a Victory Native theme object from a Gooey ITheme.
 * Pass the result as the `theme` prop on VictoryChart.
 */
export function makeVictoryTheme(theme: ITheme) {
  const axisStyle = {
    axis: { stroke: theme.colors.border },
    grid: { stroke: theme.colors.border, strokeDasharray: "4 4", opacity: 0.6 },
    tickLabels: {
      fill: theme.colors.mutedForeground,
      fontSize: 10,
      padding: 4,
    },
    ticks: { stroke: "transparent" },
  };

  return {
    axis: { style: axisStyle },
    bar: { style: { data: { fill: theme.colors.toast.info.icon } } },
    line: {
      style: {
        data: { stroke: theme.colors.toast.info.icon, strokeWidth: 2.5 },
      },
    },
    area: {
      style: {
        data: {
          stroke: theme.colors.toast.info.icon,
          fill: theme.colors.toast.info.icon,
          fillOpacity: 0.18,
          strokeWidth: 2.5,
        },
      },
    },
    pie: { style: { labels: { fill: theme.colors.foreground, fontSize: 12 } } },
  } as const;
}
