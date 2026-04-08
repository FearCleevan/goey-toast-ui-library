import React from "react";
import { Image, View, type StyleProp, type ViewStyle } from "react-native";
import { Text } from "../../primitives/Text";
import { useTheme } from "../../theme";

export type TAvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface IAvatarProps {
  /** Remote or local image URI */
  src?: string;
  /** Used to generate initials when no image is provided */
  name?: string;
  size?: TAvatarSize;
  /** Custom background color for the initials fallback */
  bg?: string;
  style?: StyleProp<ViewStyle>;
}

const SIZE_MAP: Record<TAvatarSize, { dim: number; fontSize: "xs" | "sm" | "md" | "lg" | "xl" }> = {
  xs:  { dim: 24,  fontSize: "xs" },
  sm:  { dim: 32,  fontSize: "sm" },
  md:  { dim: 40,  fontSize: "md" },
  lg:  { dim: 48,  fontSize: "lg" },
  xl:  { dim: 64,  fontSize: "xl" },
  "2xl": { dim: 80, fontSize: "xl" },
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Avatar({ src, name, size = "md", bg, style }: IAvatarProps) {
  const theme = useTheme();
  const { dim, fontSize } = SIZE_MAP[size];
  const radius = dim / 2;

  const containerStyle: ViewStyle = {
    width: dim,
    height: dim,
    borderRadius: radius,
    backgroundColor: bg ?? theme.colors.muted,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  };

  return (
    <View style={[containerStyle, style]}>
      {src ? (
        <Image
          source={{ uri: src }}
          style={{ width: dim, height: dim }}
          accessibilityLabel={name ?? "avatar"}
        />
      ) : (
        <Text
          size={fontSize}
          weight="semibold"
          color={theme.colors.mutedForeground}
        >
          {name ? getInitials(name) : "?"}
        </Text>
      )}
    </View>
  );
}

export { Avatar };
