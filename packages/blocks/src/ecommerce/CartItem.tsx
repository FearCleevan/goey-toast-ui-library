import {
  Divider,
  HStack,
  IconButton,
  Text,
  VStack,
  gooeyToast,
  useTheme,
} from "@gooey/core";
import React from "react";
import { Image, View, type StyleProp, type ViewStyle } from "react-native";

export interface ICartItemProps {
  id: string;
  name: string;
  price: string;
  quantity: number;
  imageUri?: string;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  style?: StyleProp<ViewStyle>;
  disableToast?: boolean;
}

// ─── Quantity stepper icons ───────────────────────────────────────────────────

function MinusIcon() {
  return <Text size="lg" weight="bold">−</Text>;
}
function PlusIcon() {
  return <Text size="lg" weight="bold">+</Text>;
}
function TrashIcon() {
  return <Text size="sm">🗑</Text>;
}

// ─── Component ────────────────────────────────────────────────────────────────

function CartItem({
  id,
  name,
  price,
  quantity,
  imageUri,
  onQuantityChange,
  onRemove,
  style,
  disableToast = false,
}: ICartItemProps) {
  const theme = useTheme();

  function handleRemove() {
    if (!disableToast) {
      gooeyToast("Removed from cart", {
        description: name,
        duration: 2200,
        showTimestamp: false,
      });
    }
    onRemove(id);
  }

  function handleDecrease() {
    if (quantity <= 1) {
      handleRemove();
      return;
    }
    onQuantityChange(id, quantity - 1);
  }

  return (
    <VStack gap={0}>
      <HStack align="center" gap={12} style={[{ paddingVertical: 14 }, style]}>
        {/* Thumbnail */}
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: theme.radius.xl,
            backgroundColor: theme.colors.muted,
            overflow: "hidden",
          }}
        >
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          ) : (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Text size="2xl">📦</Text>
            </View>
          )}
        </View>

        {/* Name + price */}
        <VStack gap={4} flex={1}>
          <Text size="sm" weight="medium" color={theme.colors.foreground} numberOfLines={2}>
            {name}
          </Text>
          <Text size="md" weight="bold" color={theme.colors.foreground}>
            {price}
          </Text>
        </VStack>

        {/* Controls */}
        <VStack gap={8} style={{ alignItems: "flex-end" }}>
          {/* Remove */}
          <IconButton
            icon={<TrashIcon />}
            onPress={handleRemove}
            accessibilityLabel="Remove item"
            variant="ghost"
            size="sm"
          />

          {/* Stepper */}
          <HStack align="center" gap={8}>
            <IconButton
              icon={<MinusIcon />}
              onPress={handleDecrease}
              accessibilityLabel="Decrease quantity"
              size="sm"
            />
            <Text size="sm" weight="semibold" color={theme.colors.foreground}>
              {quantity}
            </Text>
            <IconButton
              icon={<PlusIcon />}
              onPress={() => onQuantityChange(id, quantity + 1)}
              accessibilityLabel="Increase quantity"
              size="sm"
            />
          </HStack>
        </VStack>
      </HStack>
      <Divider />
    </VStack>
  );
}

export { CartItem };
