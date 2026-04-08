import {
  Avatar,
  Button,
  Divider,
  HStack,
  Text,
  VStack,
  useTheme,
} from "@gooey/core";
import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

export interface IProfileStat {
  label: string;
  value: string;
}

export interface IProfileHeaderProps {
  name: string;
  username?: string;
  avatarUri?: string;
  stats?: IProfileStat[];
  onEditPress?: () => void;
  showEditButton?: boolean;
  style?: StyleProp<ViewStyle>;
}

function ProfileHeader({
  name,
  username,
  avatarUri,
  stats,
  onEditPress,
  showEditButton = true,
  style,
}: IProfileHeaderProps) {
  const theme = useTheme();

  return (
    <VStack gap={20} style={[{ paddingVertical: theme.spacing[4] }, style]}>
      <HStack align="center" gap={16}>
        <Avatar name={name} src={avatarUri} size="2xl" />

        <VStack gap={4} flex={1}>
          <Text size="lg" weight="bold" color={theme.colors.foreground}>
            {name}
          </Text>
          {username && (
            <Text size="sm" color={theme.colors.mutedForeground}>
              @{username}
            </Text>
          )}
        </VStack>

        {showEditButton && onEditPress && (
          <Button
            onPress={onEditPress}
            variant="outline"
            size="sm"
            accessibilityLabel="Edit profile"
          >
            Edit
          </Button>
        )}
      </HStack>

      {stats && stats.length > 0 && (
        <>
          <Divider />
          <HStack align="center" justify="space-evenly">
            {stats.map((stat, i) => (
              <React.Fragment key={stat.label}>
                <VStack gap={2} style={{ alignItems: "center" }}>
                  <Text size="xl" weight="bold" color={theme.colors.foreground}>
                    {stat.value}
                  </Text>
                  <Text size="xs" color={theme.colors.mutedForeground}>
                    {stat.label}
                  </Text>
                </VStack>
                {i < stats.length - 1 && (
                  <View
                    style={{
                      width: 1,
                      height: 32,
                      backgroundColor: theme.colors.border,
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </HStack>
        </>
      )}
    </VStack>
  );
}

export { ProfileHeader };
