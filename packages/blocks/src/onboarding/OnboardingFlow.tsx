import {
  Button,
  HStack,
  Text,
  VStack,
  gooeyToast,
  useTheme,
} from "@gooey/core";
import React, { type ReactNode, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  View,
  type ViewToken,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export interface IOnboardingSlideData {
  id: string;
  title: string;
  description: string;
  illustration?: ReactNode;
  accentColor?: string;
}

export interface IOnboardingFlowProps {
  slides: IOnboardingSlideData[];
  onComplete: () => void;
  onSkip?: () => void;
  ctaLabel?: string;
  disableToast?: boolean;
}

function OnboardingSlide({
  slide,
  accentColor,
}: {
  slide: IOnboardingSlideData;
  accentColor: string;
}) {
  const theme = useTheme();
  const color = slide.accentColor ?? accentColor;

  return (
    <View
      style={{
        width: SCREEN_WIDTH,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: theme.spacing[8],
        gap: theme.spacing[6],
      }}
    >
      {slide.illustration && (
        <View
          style={{
            width: 180,
            height: 180,
            borderRadius: theme.radius["3xl"],
            backgroundColor: theme.colors.muted,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: theme.spacing[2],
          }}
        >
          {slide.illustration}
        </View>
      )}

      <VStack gap={10} style={{ alignItems: "center" }}>
        <Text size="2xl" weight="bold" color={theme.colors.foreground} align="center">
          {slide.title}
        </Text>
        <Text size="sm" color={theme.colors.mutedForeground} align="center">
          {slide.description}
        </Text>
      </VStack>

      <View
        style={{
          width: 40,
          height: 3,
          borderRadius: theme.radius.full,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

function PaginationDots({
  count,
  activeIndex,
  accentColor,
}: {
  count: number;
  activeIndex: number;
  accentColor: string;
}) {
  const theme = useTheme();
  return (
    <HStack gap={6} align="center" justify="center">
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={{
            width: i === activeIndex ? 20 : 6,
            height: 6,
            borderRadius: theme.radius.full,
            backgroundColor: i === activeIndex ? accentColor : theme.colors.border,
          }}
        />
      ))}
    </HStack>
  );
}

function OnboardingFlow({
  slides,
  onComplete,
  onSkip,
  ctaLabel = "Get started",
  disableToast = false,
}: IOnboardingFlowProps) {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<IOnboardingSlideData>>(null);
  const accentColor = slides[activeIndex]?.accentColor ?? theme.colors.toast.info.icon;
  const isLast = activeIndex === slides.length - 1;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]?.index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
  ).current;

  function handleNext() {
    if (isLast) {
      if (!disableToast) {
        gooeyToast.success("You're all set!", {
          description: "Let's get started.",
          duration: 2400,
          showTimestamp: false,
        });
      }
      onComplete();
      return;
    }
    flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
  }

  const ctaText = isLast ? ctaLabel : "Next";

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {onSkip && !isLast && (
        <Pressable
          onPress={onSkip}
          style={{ position: "absolute", top: 52, right: 24, zIndex: 10 }}
        >
          <Text size="sm" color={theme.colors.mutedForeground}>
            Skip
          </Text>
        </Pressable>
      )}

      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(s) => s.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <OnboardingSlide slide={item} accentColor={accentColor} />
        )}
        style={{ flex: 1 }}
      />

      <VStack
        gap={20}
        style={{
          paddingHorizontal: theme.spacing[6],
          paddingBottom: theme.spacing[10],
        }}
      >
        <PaginationDots
          count={slides.length}
          activeIndex={activeIndex}
          accentColor={accentColor}
        />
        <Button
          onPress={handleNext}
          size="lg"
          color={accentColor}
          style={{ alignSelf: "stretch" }}
          accessibilityLabel={ctaText}
        >
          {ctaText}
        </Button>
      </VStack>
    </View>
  );
}

export { OnboardingFlow, OnboardingSlide };
