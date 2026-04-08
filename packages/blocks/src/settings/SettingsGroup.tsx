import {
  Card,
  Divider,
  HStack,
  Switch,
  Text,
  VStack,
  useTheme,
} from "@gooey/core";
import React, { type ReactNode } from "react";
import { Pressable, View } from "react-native";

// ─── Row types ────────────────────────────────────────────────────────────────

export type TSettingsRowType = "navigate" | "toggle" | "info";

export interface ISettingsRowProps {
  label: string;
  /** Optional leading icon */
  icon?: ReactNode;
  /** Trailing value text (shown for "info" and "navigate" types) */
  value?: string;
  type?: TSettingsRowType;
  /** Controlled checked state for "toggle" type */
  checked?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
  /** Tint color for the icon container */
  iconColor?: string;
  destructive?: boolean;
}

// ─── Single row ───────────────────────────────────────────────────────────────

function SettingsRow({
  label,
  icon,
  value,
  type = "navigate",
  checked = false,
  onPress,
  onToggle,
  iconColor,
  destructive = false,
}: ISettingsRowProps) {
  const theme = useTheme();
  const labelColor = destructive
    ? theme.colors.toast.error.icon
    : theme.colors.foreground;

  const rowContent = (
    <HStack align="center" gap={12} style={{ paddingVertical: 13 }}>
      {/* Icon */}
      {icon && (
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: theme.radius.md,
            backgroundColor: iconColor ?? theme.colors.muted,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </View>
      )}

      {/* Label */}
      <Text size="sm" weight="medium" color={labelColor} style={{ flex: 1 }}>
        {label}
      </Text>

      {/* Trailing */}
      {type === "toggle" ? (
        <Switch
          value={checked}
          onChange={onToggle ?? (() => {})}
        />
      ) : (
        <HStack align="center" gap={6}>
          {value ? (
            <Text size="sm" color={theme.colors.mutedForeground}>
              {value}
            </Text>
          ) : null}
          {type === "navigate" && (
            <Text size="sm" color={theme.colors.mutedForeground}>
              ›
            </Text>
          )}
        </HStack>
      )}
    </HStack>
  );

  if (type === "toggle") return rowContent;

  return (
    <Pressable onPress={onPress} disabled={!onPress}>
      {rowContent}
    </Pressable>
  );
}

// ─── Group ────────────────────────────────────────────────────────────────────

export interface ISettingsGroupProps {
  title?: string;
  rows: ISettingsRowProps[];
}

function SettingsGroup({ title, rows }: ISettingsGroupProps) {
  const theme = useTheme();

  return (
    <VStack gap={6}>
      {title && (
        <Text
          size="xs"
          weight="semibold"
          color={theme.colors.mutedForeground}
          style={{ paddingHorizontal: 4, textTransform: "uppercase", letterSpacing: 0.5 }}
        >
          {title}
        </Text>
      )}
      <Card bordered>
        {rows.map((row, i) => (
          <View key={i}>
            <SettingsRow {...row} />
            {i < rows.length - 1 && <Divider style={{ marginHorizontal: -4 }} />}
          </View>
        ))}
      </Card>
    </VStack>
  );
}

export { SettingsRow, SettingsGroup };
