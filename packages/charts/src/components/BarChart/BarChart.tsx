import { useTheme } from "@gooey/core";
import React from "react";
import { Dimensions, View, type StyleProp, type ViewStyle } from "react-native";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryVoronoiContainer,
} from "victory-native";
import { getChartColors } from "../../utils/chart-colors";
import { CHART_HEIGHT, CHART_PADDING } from "../../utils/chart-defaults";
import { makeVictoryTheme } from "../../utils/victory-theme";

export interface IBarChartDataPoint {
  x: string | number;
  y: number;
  [key: string]: string | number;
}

export interface IBarChartProps {
  data: IBarChartDataPoint[];
  /** Chart height in dp. Defaults to 220 */
  height?: number;
  /** Override bar fill color */
  color?: string;
  /** Override x-axis label formatter */
  formatXLabel?: (t: string | number) => string;
  /** Override y-axis label formatter */
  formatYLabel?: (t: number) => string;
  /** Called when the user taps a bar */
  onPress?: (datum: IBarChartDataPoint) => void;
  style?: StyleProp<ViewStyle>;
}

function BarChart({
  data,
  height = CHART_HEIGHT,
  color,
  formatXLabel,
  formatYLabel,
  onPress,
  style,
}: IBarChartProps) {
  const theme = useTheme();
  const colors = getChartColors(theme);
  const victoryTheme = makeVictoryTheme(theme);
  const width = Dimensions.get("window").width - 32;
  const barColor = color ?? colors[0];

  const container = onPress ? (
    <VictoryVoronoiContainer
      voronoiDimension="x"
      onActivated={(points) => {
        if (points[0]) onPress(points[0] as unknown as IBarChartDataPoint);
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
        domainPadding={{ x: 20, y: [0, 16] }}
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
        <VictoryBar
          data={data}
          style={{ data: { fill: barColor, borderRadius: 4 } as never }}
          cornerRadius={{ top: 4 }}
          animate={{ duration: 400, onLoad: { duration: 300 } }}
        />
      </VictoryChart>
    </View>
  );
}

export { BarChart };
