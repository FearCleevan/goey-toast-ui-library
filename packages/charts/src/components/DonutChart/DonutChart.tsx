import { Text, useTheme } from "@gooey/core";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { VictoryPie } from "victory-native";
import { getChartColors } from "../../utils/chart-colors";
import { CHART_HEIGHT, DONUT_INNER_RADIUS } from "../../utils/chart-defaults";
import { makeVictoryTheme } from "../../utils/victory-theme";
import type { IPieChartSlice } from "../PieChart/PieChart";

export interface IDonutChartProps {
  data: IPieChartSlice[];
  /** Chart height in dp. Defaults to 220 */
  height?: number;
  /**
   * Inner radius as a fraction of the chart half-width (0–1).
   * Defaults to 0.58.
   */
  innerRadius?: number;
  /** Large label at the donut centre */
  centerLabel?: string;
  /** Smaller label below the centre label */
  centerSubLabel?: string;
  /** Called when the user taps a slice */
  onSlicePress?: (slice: IPieChartSlice) => void;
  style?: StyleProp<ViewStyle>;
}

function DonutChart({
  data,
  height = CHART_HEIGHT,
  innerRadius = DONUT_INNER_RADIUS,
  centerLabel,
  centerSubLabel,
  onSlicePress,
  style,
}: IDonutChartProps) {
  const theme = useTheme();
  const palette = getChartColors(theme);
  const victoryTheme = makeVictoryTheme(theme);
  const width = Dimensions.get("window").width - 32;
  const computedInnerRadius = (Math.min(width, height) / 2) * innerRadius;

  const colorScale = data.map((s, i) => s.color ?? palette[i % palette.length]);

  return (
    <View style={[styles.wrapper, { height }, style]}>
      <VictoryPie
        data={data}
        width={width}
        height={height}
        colorScale={colorScale}
        innerRadius={computedInnerRadius}
        theme={victoryTheme as never}
        labels={() => ""}
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

      {(centerLabel != null || centerSubLabel != null) && (
        <View style={styles.center} pointerEvents="none">
          {centerLabel != null && (
            <Text
              size="xl"
              weight="bold"
              color={theme.colors.foreground}
              align="center"
            >
              {centerLabel}
            </Text>
          )}
          {centerSubLabel != null && (
            <Text
              size="xs"
              color={theme.colors.mutedForeground}
              align="center"
            >
              {centerSubLabel}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    position: "relative",
  },
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
});

export { DonutChart };
