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

export interface ISignInBlockProps {
  /** Called with credentials when the user submits. Throw to show an error toast. */
  onSignIn: (email: string, password: string) => Promise<void> | void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  /** Slot for a logo or wordmark above the form */
  logo?: ReactNode;
  /** Override the submit button label. Defaults to "Sign in" */
  submitLabel?: string;
  /** Suppress the automatic GooeyToast feedback */
  disableToast?: boolean;
}

function SignInBlock({
  onSignIn,
  onForgotPassword,
  onSignUp,
  logo,
  submitLabel = "Sign in",
  disableToast = false,
}: ISignInBlockProps) {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !password) {
      if (!disableToast) {
        gooeyToast.warning("Missing fields", {
          description: "Enter your email and password to continue.",
          duration: 3000,
        });
      }
      return;
    }

    setLoading(true);
    try {
      await onSignIn(email, password);
      if (!disableToast) {
        gooeyToast.success("Signed in", {
          description: "Welcome back!",
          duration: 2800,
          showTimestamp: false,
        });
      }
    } catch (err) {
      if (!disableToast) {
        gooeyToast.error("Sign in failed", {
          description:
            err instanceof Error ? err.message : "Check your credentials and try again.",
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
              Welcome back
            </Text>
            <Text size="sm" color={theme.colors.mutedForeground}>
              Sign in to your account to continue.
            </Text>
          </VStack>

          <VStack gap={16}>
            <Input
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <VStack gap={6}>
              <Input
                label="Password"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="current-password"
              />
              {onForgotPassword && (
                <Pressable onPress={onForgotPassword} style={{ alignSelf: "flex-end" }}>
                  <Text size="xs" color={theme.colors.toast.info.icon}>
                    Forgot password?
                  </Text>
                </Pressable>
              )}
            </VStack>
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

          {onSignUp && (
            <HStack align="center" justify="center" gap={4}>
              <Text size="sm" color={theme.colors.mutedForeground}>
                Don't have an account?
              </Text>
              <Pressable onPress={onSignUp}>
                <Text size="sm" weight="semibold" color={theme.colors.toast.info.icon}>
                  Sign up
                </Text>
              </Pressable>
            </HStack>
          )}
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export { SignInBlock };
