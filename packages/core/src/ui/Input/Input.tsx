import React, { useState, type ReactNode } from "react";
import {
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from "react-native";
import { Text } from "../../primitives/Text";
import { useTheme } from "../../theme";

export interface IInputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** Full width or auto */
  fullWidth?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

function Input({
  label,
  error,
  helper,
  leftIcon,
  rightIcon,
  fullWidth = true,
  containerStyle,
  style,
  onFocus,
  onBlur,
  ...rest
}: IInputProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  const hasError = Boolean(error);
  const borderColor = hasError
    ? theme.colors.toast.error.icon
    : focused
      ? theme.colors.toast.info.icon
      : theme.colors.border;

  const rowStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    borderRadius: theme.radius.lg,
    borderWidth: 1.5,
    borderColor,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 12,
    gap: 8,
    ...(fullWidth && { width: "100%" }),
  };

  return (
    <View style={[{ gap: 4 }, containerStyle]}>
      {label ? (
        <Text size="sm" weight="medium" color={theme.colors.foreground}>
          {label}
        </Text>
      ) : null}
      <View style={rowStyle}>
        {leftIcon}
        <TextInput
          style={[
            {
              flex: 1,
              fontSize: theme.typography.fontSizes.md,
              color: theme.colors.foreground,
              paddingVertical: 0,
            },
            style,
          ]}
          placeholderTextColor={theme.colors.mutedForeground}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />
        {rightIcon}
      </View>
      {hasError ? (
        <Text size="xs" color={theme.colors.toast.error.icon}>
          {error}
        </Text>
      ) : helper ? (
        <Text size="xs" color={theme.colors.mutedForeground}>
          {helper}
        </Text>
      ) : null}
    </View>
  );
}

export { Input };
