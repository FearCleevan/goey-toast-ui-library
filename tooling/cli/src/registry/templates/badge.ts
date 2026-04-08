export const badgeTemplate = `\
import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { Text, useTheme } from "@gooey/core";
import type { TGooeyToastType } from "@gooey/core";

export type TBadgeVariant = TGooeyToastType | "neutral";
export type TBadgeSize = "sm" | "md" | "lg";

export interface IBadgeProps {
  label?: string;
  variant?: TBadgeVariant;
  size?: TBadgeSize;
  /** Render as a small coloured dot without text */
  dot?: boolean;
  style?: StyleProp<ViewStyle>;
}

const SIZE_MAP = {
  sm: { px: 6,  py: 2,  fontSize: "2xs" as const, dot: 6 },
  md: { px: 8,  py: 3,  fontSize: "xs"  as const, dot: 8 },
  lg: { px: 10, py: 4,  fontSize: "sm"  as const, dot: 10 },
};

function Badge({
  label,
  variant = "neutral",
  size = "md",
  dot = false,
  style,
}: IBadgeProps) {
  const theme = useTheme();
  const { px, py, fontSize, dot: dotSize } = SIZE_MAP[size];

  const colors =
    variant === "neutral"
      ? { surface: theme.colors.muted, stroke: theme.colors.border, icon: theme.colors.mutedForeground }
      : theme.colors.toast[variant];

  if (dot) {
    return (
      <View
        style={[
          { width: dotSize, height: dotSize, borderRadius: dotSize / 2, backgroundColor: colors.icon },
          style,
        ]}
      />
    );
  }

  return (
    <View
      style={[
        {
          paddingHorizontal: px,
          paddingVertical: py,
          borderRadius: theme.radius.full,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.stroke,
          alignSelf: "flex-start",
        },
        style,
      ]}
    >
      <Text size={fontSize} weight="semibold" color={colors.icon}>
        {label}
      </Text>
    </View>
  );
}

export { Badge };
`;
