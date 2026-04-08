// ─── Auth ─────────────────────────────────────────────────────────────────────
export { SignInBlock, SignUpBlock } from "./auth";
export type { ISignInBlockProps, ISignUpBlockProps, ISignUpData } from "./auth";

// ─── Onboarding ───────────────────────────────────────────────────────────────
export { OnboardingFlow, OnboardingSlide } from "./onboarding";
export type { IOnboardingFlowProps, IOnboardingSlideData } from "./onboarding";

// ─── Dashboard ────────────────────────────────────────────────────────────────
export { StatsCard, ActivityFeed } from "./dashboard";
export type { IStatsCardProps, IActivityFeedProps, IActivityItem } from "./dashboard";

// ─── E-commerce ───────────────────────────────────────────────────────────────
export { ProductCard, CartItem } from "./ecommerce";
export type { IProductCardProps, ICartItemProps } from "./ecommerce";

// ─── Settings ─────────────────────────────────────────────────────────────────
export { SettingsRow, SettingsGroup, ProfileHeader } from "./settings";
export type {
  ISettingsRowProps,
  ISettingsGroupProps,
  IProfileHeaderProps,
  IProfileStat,
  TSettingsRowType,
} from "./settings";
