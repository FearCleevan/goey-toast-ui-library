import { useTheme } from "@gooey/core";
import React from "react";
import { Dimensions, View, type StyleProp, type ViewStyle } from "react-native";
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryVoronoiContainer,
} from "victory-native";
import { getChartColors } from "../../utils/chart-colors";
import {
  AREA_OPACITY,
  CHART_HEIGHT,
  CHART_PADDING,
  LINE_STROKE_WIDTH,
} from "../../utils/chart-defaults";
import { makeVictoryTheme } from "../../utils/victory-theme";

export interface IAreaChartDataPoint {
  x: string | number;
  y: number;
  [key: string]: string | number;
}

export interface IAreaChartProps {
  data: IAreaChartDataPoint[];
  /** Chart height in dp. Defaults to 220 */
  height?: number;
  /** Stroke width. Defaults to 2.5 */
  strokeWidth?: number;
  /** Area fill opacity (0–1). Defaults to 0.18 */
  areaOpacity?: number;
  /** Override series color */
  color?: string;
  /** Override x-axis label formatter */
  formatXLabel?: (t: string | number) => string;
  /** Override y-axis label formatter */
  formatYLabel?: (t: number) => string;
  /** Called when the user taps a point */
  onPress?: (datum: IAreaChartDataPoint) => void;
  style?: StyleProp<ViewStyle>;
}

function AreaChart({
  data,
  height = CHART_HEIGHT,
  strokeWidth = LINE_STROKE_WIDTH,
  areaOpacity = AREA_OPACITY,
  color,
  formatXLabel,
  formatYLabel,
  onPress,
  style,
}: IAreaChartProps) {
  const theme = useTheme();
  const colors = getChartColors(theme);
  const victoryTheme = makeVictoryTheme(theme);
  const width = Dimensions.get("window").width - 32;
  const areaColor = color ?? colors[0];

  const container = onPress ? (
    <VictoryVoronoiContainer
      voronoiDimension="x"
      onActivated={(points) => {
        if (points[0]) onPress(points[0] as unknown as IAreaChartDataPoint);
      }}
    />
  ) : undefined;

  return (
    <View style={[{ height }, style]}>
      <VictoryChart
        width={width}
        height={height}
        padding={CHART_PADDING}
        theme={victoryTheme as never}
        containerComponent={container}
      >
        <VictoryAxis
          tickFormat={formatXLabel}
          style={victoryTheme.axis.style}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={formatYLabel}
          style={victoryTheme.axis.style}
        />
        <VictoryArea
          data={data}
          style={{
            data: {
              fill: areaColor,
              fillOpacity: areaOpacity,
              stroke: areaColor,
              strokeWidth,
            },
          }}
          animate={{ duration: 400, onLoad: { duration: 300 } }}
          interpolation="natural"
        />
      </VictoryChart>
    </View>
  );
}

export { AreaChart };
