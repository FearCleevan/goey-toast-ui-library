export const alertTemplate = `\
import React, { type ReactNode } from "react";
import { Pressable, View, type StyleProp, type ViewStyle } from "react-native";
import { HStack, Text, useTheme } from "@gooey/core";
import type { TGooeyToastType } from "@gooey/core";

export type TAlertVariant = TGooeyToastType;

export interface IAlertProps {
  variant?: TAlertVariant;
  title: string;
  description?: string;
  icon?: ReactNode;
  onClose?: () => void;
  style?: StyleProp<ViewStyle>;
}

function Alert({
  variant = "default",
  title,
  description,
  icon,
  onClose,
  style,
}: IAlertProps) {
  const theme = useTheme();
  const colors = theme.colors.toast[variant] ?? theme.colors.toast.info;

  return (
    <View
      style={[
        {
          borderRadius: theme.radius.xl,
          borderWidth: 1,
          borderColor: \`\${colors.icon}30\`,
          backgroundColor: \`\${colors.icon}10\`,
          padding: theme.spacing[4],
          flexDirection: "row",
          gap: 10,
          alignItems: "flex-start",
        },
        style,
      ]}
    >
      {icon ? (
        <View style={{ paddingTop: 2 }}>{icon}</View>
      ) : null}

      <View style={{ flex: 1, gap: 2 }}>
        <Text size="sm" weight="semibold" color={colors.icon}>
          {title}
        </Text>
        {description ? (
          <Text size="sm" color={theme.colors.mutedForeground}>
            {description}
          </Text>
        ) : null}
      </View>

      {onClose ? (
        <Pressable
          onPress={onClose}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Dismiss alert"
        >
          <Text size="sm" color={theme.colors.mutedForeground}>✕</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export { Alert };
`;
