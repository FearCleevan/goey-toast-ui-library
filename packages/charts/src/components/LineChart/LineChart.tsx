import { useTheme } from "@gooey/core";
import React from "react";
import { Dimensions, View, type StyleProp, type ViewStyle } from "react-native";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryVoronoiContainer,
} from "victory-native";
import { getChartColors } from "../../utils/chart-colors";
import { CHART_HEIGHT, CHART_PADDING, LINE_STROKE_WIDTH } from "../../utils/chart-defaults";
import { makeVictoryTheme } from "../../utils/victory-theme";

export interface ILineChartDataPoint {
  x: string | number;
  y: number;
  [key: string]: string | number;
}

export interface ILineChartProps {
  data: ILineChartDataPoint[];
  /** Chart height in dp. Defaults to 220 */
  height?: number;
  /** Stroke width. Defaults to 2.5 */
  strokeWidth?: number;
  /** Show dots at each data point. Defaults to true */
  showDots?: boolean;
  /** Override line color */
  color?: string;
  /** Override x-axis label formatter */
  formatXLabel?: (t: string | number) => string;
  /** Override y-axis label formatter */
  formatYLabel?: (t: number) => string;
  /** Called when the user taps a point */
  onPress?: (datum: ILineChartDataPoint) => void;
  style?: StyleProp<ViewStyle>;
}

function LineChart({
  data,
  height = CHART_HEIGHT,
  strokeWidth = LINE_STROKE_WIDTH,
  showDots = true,
  color,
  formatXLabel,
  formatYLabel,
  onPress,
  style,
}: ILineChartProps) {
  const theme = useTheme();
  const colors = getChartColors(theme);
  const victoryTheme = makeVictoryTheme(theme);
  const width = Dimensions.get("window").width - 32;
  const lineColor = color ?? colors[0];

  const container = onPress ? (
    <VictoryVoronoiContainer
      voronoiDimension="x"
      onActivated={(points) => {
        if (points[0]) onPress(points[0] as unknown as ILineChartDataPoint);
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
        <VictoryLine
          data={data}
          style={{ data: { stroke: lineColor, strokeWidth } }}
          animate={{ duration: 400, onLoad: { duration: 300 } }}
          interpolation="natural"
        />
        {showDots && (
          <VictoryScatter
            data={data}
            size={4}
            style={{ data: { fill: lineColor } }}
          />
        )}
      </VictoryChart>
    </View>
  );
}

export { LineChart };
