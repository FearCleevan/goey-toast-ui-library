import { useTheme } from "@gooey/core";
import React from "react";
import { Dimensions, View, type StyleProp, type ViewStyle } from "react-native";
import { VictoryPie } from "victory-native";
import { getChartColors } from "../../utils/chart-colors";
import { CHART_HEIGHT } from "../../utils/chart-defaults";
import { makeVictoryTheme } from "../../utils/victory-theme";

export interface IPieChartSlice {
  /** Slice label displayed outside the wedge */
  x: string;
  /** Numeric value that determines the slice size */
  y: number;
  /** Override slice color — defaults to the chart palette */
  color?: string;
}

export interface IPieChartProps {
  data: IPieChartSlice[];
  /** Chart height in dp. Defaults to 220 */
  height?: number;
  /** Show labels on each slice. Defaults to true */
  showLabels?: boolean;
  /** Called when the user taps a slice */
  onSlicePress?: (slice: IPieChartSlice) => void;
  style?: StyleProp<ViewStyle>;
}

function PieChart({
  data,
  height = CHART_HEIGHT,
  showLabels = true,
  onSlicePress,
  style,
}: IPieChartProps) {
  const theme = useTheme();
  const palette = getChartColors(theme);
  const victoryTheme = makeVictoryTheme(theme);
  const width = Dimensions.get("window").width - 32;

  const colorScale = data.map((s, i) => s.color ?? palette[i % palette.length]);

  return (
    <View style={[{ height }, style]}>
      <VictoryPie
        data={data}
        width={width}
        height={height}
        colorScale={colorScale}
        theme={victoryTheme as never}
        labels={showLabels ? ({ datum }) => datum.x : () => ""}
        style={{
          labels: {
            fill: theme.colors.foreground,
            fontSize: 11,
          },
        }}
        events={
          onSlicePress
            ? [
                {
                  target: "data",
                  eventHandlers: {
                    onPress: (_evt, props) => {
                      const datum = props.datum as IPieChartSlice;
                      onSlicePress(datum);
                      return [];
                    },
                  },
                },
              ]
            : []
        }
        animate={{ duration: 400 }}
      />
    </View>
  );
}

export { PieChart };
