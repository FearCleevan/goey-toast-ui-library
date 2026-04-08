import {
  Badge,
  Button,
  Card,
  HStack,
  Text,
  VStack,
  gooeyToast,
  useTheme,
} from "@gooey/core";
import React from "react";
import { Image, View, type StyleProp, type ViewStyle } from "react-native";

export interface IProductCardProps {
  name: string;
  price: string;
  originalPrice?: string;
  imageUri?: string;
  badge?: string;
  onAddToCart?: () => void;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disableToast?: boolean;
}

function ProductCard({
  name,
  price,
  originalPrice,
  imageUri,
  badge,
  onAddToCart,
  onPress,
  style,
  disableToast = false,
}: IProductCardProps) {
  const theme = useTheme();

  function handleAddToCart() {
    if (!disableToast) {
      gooeyToast.success("Added to cart", {
        description: name,
        duration: 2400,
        showTimestamp: false,
      });
    }
    onAddToCart?.();
  }

  return (
    <Card onPress={onPress} style={[{ width: 180 }, style]}>
      <VStack gap={12}>
        <View
          style={{
            height: 140,
            borderRadius: theme.radius.xl,
            backgroundColor: theme.colors.muted,
            overflow: "hidden",
            position: "relative",
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
              <Text size="3xl">🛍️</Text>
            </View>
          )}
          {badge && (
            <View style={{ position: "absolute", top: 8, left: 8 }}>
              <Badge variant="info" size="sm">{badge}</Badge>
            </View>
          )}
        </View>

        <VStack gap={4}>
          <Text size="sm" weight="semibold" color={theme.colors.foreground} numberOfLines={2}>
            {name}
          </Text>
          <HStack align="center" gap={6}>
            <Text size="md" weight="bold" color={theme.colors.foreground}>
              {price}
            </Text>
            {originalPrice && (
              <Text
                size="xs"
                color={theme.colors.mutedForeground}
                style={{ textDecorationLine: "line-through" }}
              >
                {originalPrice}
              </Text>
            )}
          </HStack>
        </VStack>

        {onAddToCart && (
          <Button
            onPress={handleAddToCart}
            size="sm"
            style={{ alignSelf: "stretch" }}
            accessibilityLabel="Add to cart"
          >
            Add to cart
          </Button>
        )}
      </VStack>
    </Card>
  );
}

export { ProductCard };
