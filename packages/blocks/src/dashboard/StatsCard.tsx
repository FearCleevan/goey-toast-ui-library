import { Badge, Card, HStack, Text, VStack, useTheme } from "@gooey/core";
import React, { type ReactNode } from "react";
import { View } from "react-native";

export interface IStatsCardProps {
  title: string;
  value: string;
  /** Percentage change — positive = green, negative = red */
  change?: number;
  /** Optional icon rendered top-right */
  icon?: ReactNode;
  onPress?: () => void;
}

function StatsCard({ title, value, change, icon, onPress }: IStatsCardProps) {
  const theme = useTheme();

  const changeLabel =
    change != null
      ? `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`
      : null;

  const changeVariant =
    change == null ? "neutral" : change >= 0 ? "success" : "error";

  return (
    <Card onPress={onPress} style={{ flex: 1 }}>
      <VStack gap={12}>
        {/* Header row */}
        <HStack align="center" justify="space-between">
          <Text size="xs" weight="medium" color={theme.colors.mutedForeground}>
            {title.toUpperCase()}
          </Text>
          {icon && (
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: theme.radius.lg,
                backgroundColor: theme.colors.muted,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </View>
          )}
        </HStack>

        {/* Value */}
        <Text size="3xl" weight="bold" color={theme.colors.foreground}>
          {value}
        </Text>

        {/* Change badge */}
        {changeLabel && (
          <Badge variant={changeVariant} size="sm">
            {changeLabel}
          </Badge>
        )}
      </VStack>
    </Card>
  );
}

export { StatsCard };
