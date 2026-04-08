import {
  Badge,
  Card,
  Divider,
  HStack,
  Text,
  VStack,
  gooeyToast,
  useTheme,
} from "@gooey/core";
import React from "react";
import { Pressable, View } from "react-native";
import type { TGooeyToastType } from "@gooey/core";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface IActivityItem {
  id: string;
  label: string;
  meta?: string;
  timestamp: string;
  type?: TGooeyToastType;
  badge?: string;
}

export interface IActivityFeedProps {
  items: IActivityItem[];
  title?: string;
  /** Show a "See all" row at the bottom */
  onSeeAll?: () => void;
  /** Called when an item row is pressed */
  onItemPress?: (item: IActivityItem) => void;
  /** Show a GooeyToast with item details on row press. Defaults to true */
  showToastOnPress?: boolean;
}

// ─── Row ─────────────────────────────────────────────────────────────────────

function ActivityRow({
  item,
  onPress,
}: {
  item: IActivityItem;
  onPress?: () => void;
}) {
  const theme = useTheme();
  const variant = item.type ?? "default";

  return (
    <Pressable onPress={onPress} disabled={!onPress}>
      <HStack align="center" gap={12} style={{ paddingVertical: 10 }}>
        {/* Type dot */}
        <Badge dot variant={variant} size="sm">{null}</Badge>

        {/* Labels */}
        <VStack gap={2} flex={1}>
          <Text size="sm" weight="medium" color={theme.colors.foreground}>
            {item.label}
          </Text>
          {item.meta && (
            <Text size="xs" color={theme.colors.mutedForeground}>
              {item.meta}
            </Text>
          )}
        </VStack>

        {/* Right side */}
        <VStack gap={4} style={{ alignItems: "flex-end" }}>
          <Text size="xs" color={theme.colors.mutedForeground}>
            {item.timestamp}
          </Text>
          {item.badge && (
            <Badge variant={variant} size="sm">{item.badge}</Badge>
          )}
        </VStack>
      </HStack>
    </Pressable>
  );
}

// ─── Feed ─────────────────────────────────────────────────────────────────────

function ActivityFeed({
  items,
  title = "Activity",
  onSeeAll,
  onItemPress,
  showToastOnPress = true,
}: IActivityFeedProps) {
  const theme = useTheme();

  function handleItemPress(item: IActivityItem) {
    if (showToastOnPress) {
      gooeyToast(item.label, {
        description: item.meta,
        duration: 2800,
        type: item.type ?? "default",
        showTimestamp: false,
      });
    }
    onItemPress?.(item);
  }

  return (
    <Card>
      <VStack gap={0}>
        {/* Header */}
        <HStack align="center" justify="space-between" style={{ marginBottom: 8 }}>
          <Text size="sm" weight="semibold" color={theme.colors.foreground}>
            {title}
          </Text>
          {onSeeAll && (
            <Pressable onPress={onSeeAll}>
              <Text size="xs" color={theme.colors.toast.info.icon}>
                See all
              </Text>
            </Pressable>
          )}
        </HStack>

        {/* Rows */}
        {items.map((item, i) => (
          <View key={item.id}>
            <ActivityRow
              item={item}
              onPress={() => handleItemPress(item)}
            />
            {i < items.length - 1 && <Divider />}
          </View>
        ))}

        {/* Empty state */}
        {items.length === 0 && (
          <Text
            size="sm"
            color={theme.colors.mutedForeground}
            align="center"
            style={{ paddingVertical: 24 }}
          >
            No activity yet
          </Text>
        )}
      </VStack>
    </Card>
  );
}

export { ActivityFeed };
