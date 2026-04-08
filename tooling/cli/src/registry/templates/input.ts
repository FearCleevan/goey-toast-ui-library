export const inputTemplate = `\
import React, { useState, type ReactNode } from "react";
import {
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from "react-native";
import { Text, useTheme } from "@gooey/core";

export interface IInputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

function Input({
  label,
  error,
  helper,
  leftIcon,
  rightIcon,
  containerStyle,
  ...textInputProps
}: IInputProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? theme.colors.toast.error.stroke
    : focused
      ? theme.colors.toast.info.icon
      : theme.colors.border;

  return (
    <View style={[{ gap: 6 }, containerStyle]}>
      {label ? (
        <Text size="sm" weight="semibold" color={theme.colors.foreground}>
          {label}
        </Text>
      ) : null}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: focused ? 1.5 : 1,
          borderColor,
          borderRadius: theme.radius.lg,
          backgroundColor: theme.colors.background,
          paddingHorizontal: theme.spacing[3],
          gap: 8,
          minHeight: 44,
        }}
      >
        {leftIcon ?? null}
        <TextInput
          style={{
            flex: 1,
            color: theme.colors.foreground,
            fontSize: 15,
            paddingVertical: theme.spacing[2],
          }}
          placeholderTextColor={theme.colors.mutedForeground}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...textInputProps}
        />
        {rightIcon ?? null}
      </View>

      {(error || helper) ? (
        <Text
          size="xs"
          color={error ? theme.colors.toast.error.icon : theme.colors.mutedForeground}
        >
          {error ?? helper}
        </Text>
      ) : null}
    </View>
  );
}

export { Input };
`;
