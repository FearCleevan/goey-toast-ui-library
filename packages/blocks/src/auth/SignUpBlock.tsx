import {
  Button,
  HStack,
  Input,
  Text,
  VStack,
  gooeyToast,
  useTheme,
} from "@gooey/core";
import React, { type ReactNode, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from "react-native";

export interface ISignUpData {
  name: string;
  email: string;
  password: string;
}

export interface ISignUpBlockProps {
  onSignUp: (data: ISignUpData) => Promise<void> | void;
  onSignIn?: () => void;
  logo?: ReactNode;
  submitLabel?: string;
  disableToast?: boolean;
}

function SignUpBlock({
  onSignUp,
  onSignIn,
  logo,
  submitLabel = "Create account",
  disableToast = false,
}: ISignUpBlockProps) {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!name || !email || !password) {
      if (!disableToast) {
        gooeyToast.warning("Missing fields", {
          description: "Please fill in all fields to continue.",
          duration: 3000,
        });
      }
      return;
    }
    if (password.length < 8) {
      if (!disableToast) {
        gooeyToast.warning("Password too short", {
          description: "Use at least 8 characters.",
          duration: 3000,
        });
      }
      return;
    }

    setLoading(true);
    try {
      await onSignUp({ name, email, password });
      if (!disableToast) {
        gooeyToast.success("Account created", {
          description: `Welcome, ${name}!`,
          duration: 3200,
          showTimestamp: false,
        });
      }
    } catch (err) {
      if (!disableToast) {
        gooeyToast.error("Sign up failed", {
          description:
            err instanceof Error ? err.message : "Something went wrong. Try again.",
          duration: 4000,
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <VStack
          flex={1}
          gap={24}
          style={{
            paddingHorizontal: theme.spacing[6],
            paddingTop: theme.spacing[12],
            paddingBottom: theme.spacing[8],
          }}
        >
          {logo && <View style={{ alignItems: "center" }}>{logo}</View>}

          <VStack gap={4}>
            <Text size="3xl" weight="bold" color={theme.colors.foreground}>
              Create an account
            </Text>
            <Text size="sm" color={theme.colors.mutedForeground}>
              Fill in the details below to get started.
            </Text>
          </VStack>

          <VStack gap={16}>
            <Input
              label="Full name"
              placeholder="Jane Smith"
              value={name}
              onChangeText={setName}
              autoComplete="name"
            />
            <Input
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <Input
              label="Password"
              placeholder="Min. 8 characters"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="new-password"
            />
          </VStack>

          <Button
            onPress={handleSubmit}
            loading={loading}
            size="lg"
            style={{ alignSelf: "stretch" }}
            accessibilityLabel={submitLabel}
          >
            {submitLabel}
          </Button>

          {onSignIn && (
            <HStack align="center" justify="center" gap={4}>
              <Text size="sm" color={theme.colors.mutedForeground}>
                Already have an account?
              </Text>
              <Pressable onPress={onSignIn}>
                <Text size="sm" weight="semibold" color={theme.colors.toast.info.icon}>
                  Sign in
                </Text>
              </Pressable>
            </HStack>
          )}
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export { SignUpBlock };
