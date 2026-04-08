import { gooeyToast } from "@gooey/core";
import React from "react";
import { VictoryTooltip, VictoryVoronoiContainer } from "victory-native";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface IChartToastConfig {
  /**
   * Build the toast title from the active data point.
   * Defaults to `String(datum.x)`.
   */
  title?: (datum: Record<string, unknown>) => string;
  /**
   * Build the toast description from the active data point.
   * Defaults to `String(datum.y)`.
   */
  description?: (datum: Record<string, unknown>) => string;
  /** Toast display duration in ms. Defaults to 2800 */
  duration?: number;
}

export interface IChartTooltipProps {
  /**
   * When `true`, show Victory's built-in floating label tooltip on the chart
   * in addition to (or instead of) the GooeyToast.
   * Defaults to `false`.
   */
  showNativeTooltip?: boolean;
  /** GooeyToast config. Omit to suppress toast entirely. */
  toastConfig?: IChartToastConfig;
  /** Additional VictoryVoronoiContainer props forwarded through */
  voronoiDimension?: "x" | "y";
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * `ChartTooltip` — drop this as the `containerComponent` prop on any
 * Victory chart to get GooeyToast notifications when a data point is pressed.
 *
 * ```tsx
 * <VictoryChart
 *   containerComponent={
 *     <ChartTooltip
 *       toastConfig={{
 *         title: (d) => String(d.x),
 *         description: (d) => `Revenue: $${d.y}`,
 *       }}
 *     />
 *   }
 * >
 *   <VictoryBar data={data} />
 * </VictoryChart>
 * ```
 */
function ChartTooltip({
  showNativeTooltip = false,
  toastConfig,
  voronoiDimension = "x",
}: IChartTooltipProps) {
  return (
    <VictoryVoronoiContainer
      voronoiDimension={voronoiDimension}
      labels={showNativeTooltip ? ({ datum }) => `${datum.y}` : undefined}
      labelComponent={showNativeTooltip ? <VictoryTooltip /> : undefined}
      onActivated={(points) => {
        if (!toastConfig || !points[0]) return;
        const datum = points[0] as Record<string, unknown>;
        const title = toastConfig.title
          ? toastConfig.title(datum)
          : String(datum["x"] ?? "");
        const description = toastConfig.description
          ? toastConfig.description(datum)
          : String(datum["y"] ?? "");

        gooeyToast(title, {
          description,
          duration: toastConfig.duration ?? 2800,
          showTimestamp: false,
        });
      }}
    />
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * `useGooeyChartTooltip` — convenience hook that returns a pre-configured
 * `<ChartTooltip />` element ready to pass as `containerComponent`.
 *
 * ```tsx
 * const tooltip = useGooeyChartTooltip({
 *   title: (d) => String(d.x),
 *   description: (d) => `$${d.y}`,
 * });
 *
 * <VictoryChart containerComponent={tooltip}>...</VictoryChart>
 * ```
 */
function useGooeyChartTooltip(config?: IChartToastConfig): React.ReactElement {
  return <ChartTooltip toastConfig={config} />;
}

export { ChartTooltip, useGooeyChartTooltip };
