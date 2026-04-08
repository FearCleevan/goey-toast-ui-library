import React, { type ReactNode } from "react";
import { Pressable, View, type StyleProp, type ViewStyle } from "react-native";
import { HStack } from "../../primitives/Stack";
import { Text } from "../../primitives/Text";
import { useTheme } from "../../theme";
import type { TGooeyToastType } from "../../typings";

export type TAlertVariant = TGooeyToastType;

export interface IAlertProps {
  variant?: TAlertVariant;
  title: string;
  description?: string;
  /** Custom icon — receives the variant color */
  icon?: ReactNode;
  onClose?: () => void;
  style?: StyleProp<ViewStyle>;
}

const CLOSE_ICON = "✕";

function Alert({
  variant = "default",
  title,
  description,
  icon,
  onClose,
  style,
}: IAlertProps) {
  const theme = useTheme();
  const colors = theme.colors.toast[variant];

  const containerStyle: ViewStyle = {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: colors.stroke,
    backgroundColor: colors.surface,
    padding: 14,
  };

  return (
    <View style={[containerStyle, style]}>
      <HStack align="flex-start" gap={10}>
        {icon ? (
          <View style={{ marginTop: 1 }}>{icon}</View>
        ) : null}
        <View style={{ flex: 1, gap: 2 }}>
          <HStack align="center" justify="space-between">
            <Text size="sm" weight="semibold" color={colors.icon} style={{ flex: 1 }}>
              {title}
            </Text>
            {onClose ? (
              <Pressable onPress={onClose} hitSlop={8} accessibilityLabel="Dismiss alert">
                <Text size="sm" color={theme.colors.mutedForeground}>
                  {CLOSE_ICON}
                </Text>
              </Pressable>
            ) : null}
          </HStack>
          {description ? (
            <Text size="sm" color={theme.colors.foreground}>
              {description}
            </Text>
          ) : null}
        </View>
      </HStack>
    </View>
  );
}

export { Alert };
