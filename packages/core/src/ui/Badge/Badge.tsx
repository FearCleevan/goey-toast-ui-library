import React, { type ReactNode } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { Text } from "../../primitives/Text";
import { useTheme } from "../../theme";
import type { TGooeyToastType } from "../../typings";

export type TBadgeVariant = TGooeyToastType | "neutral";
export type TBadgeSize = "sm" | "md" | "lg";

export interface IBadgeProps {
  children: ReactNode;
  variant?: TBadgeVariant;
  size?: TBadgeSize;
  /** Render as a dot (no text) */
  dot?: boolean;
  style?: StyleProp<ViewStyle>;
}

const SIZE_MAP = {
  sm: { px: 6,  py: 2, fontSize: "xs"  as const, dotSize: 6  },
  md: { px: 8,  py: 3, fontSize: "sm"  as const, dotSize: 8  },
  lg: { px: 10, py: 4, fontSize: "md"  as const, dotSize: 10 },
};

function Badge({
  children,
  variant = "neutral",
  size = "md",
  dot = false,
  style,
}: IBadgeProps) {
  const theme = useTheme();
  const dim = SIZE_MAP[size];

  const bg =
    variant === "neutral"
      ? theme.colors.muted
      : theme.colors.toast[variant].action;
  const textColor =
    variant === "neutral"
      ? theme.colors.mutedForeground
      : theme.colors.toast[variant].actionText;

  if (dot) {
    return (
      <View
        style={[
          {
            width: dim.dotSize,
            height: dim.dotSize,
            borderRadius: dim.dotSize / 2,
            backgroundColor: variant === "neutral"
              ? theme.colors.mutedForeground
              : theme.colors.toast[variant].icon,
          },
          style,
        ]}
      />
    );
  }

  return (
    <View
      style={[
        {
          paddingHorizontal: dim.px,
          paddingVertical: dim.py,
          borderRadius: theme.radius.full,
          backgroundColor: bg,
          alignSelf: "flex-start",
        },
        style,
      ]}
    >
      <Text size={dim.fontSize} weight="semibold" color={textColor}>
        {children}
      </Text>
    </View>
  );
}

export { Badge };
