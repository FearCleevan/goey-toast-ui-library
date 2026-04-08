// ─── Toast ──────────────────────────────────────────────────────────────────
export { GooeyToaster } from "./components/GooeyToaster";
export { gooeyToast } from "./store";

// ─── Theme ──────────────────────────────────────────────────────────────────
export {
  ThemeProvider,
  useTheme,
  createTheme,
  lightTheme,
  darkTheme,
  motion,
  palette,
  radius,
  spacing,
  typography,
} from "./theme";
export type {
  ITheme,
  DeepPartial,
  ISemanticColors,
  IToastTypeColors,
  IShadows,
  IShadowToken,
  IMotion,
  IMotionSprings,
  IMotionDurations,
} from "./theme";

// ─── Primitives ──────────────────────────────────────────────────────────────
export { Box, Divider, HStack, Stack, Text, VStack } from "./primitives";
export type {
  IBoxProps,
  IDividerProps,
  IGooeyTextProps,
  IStackProps,
} from "./primitives";

// ─── UI Components ───────────────────────────────────────────────────────────
export {
  Alert,
  Avatar,
  Badge,
  BottomSheet,
  Button,
  Card,
  Checkbox,
  Chip,
  IconButton,
  Input,
  Modal,
  Skeleton,
  Switch,
} from "./ui";
export type {
  IAlertProps,
  IAvatarProps,
  IBadgeProps,
  IBottomSheetProps,
  IButtonProps,
  ICardProps,
  ICheckboxProps,
  IChipProps,
  IIconButtonProps,
  IInputProps,
  IModalProps,
  ISkeletonProps,
  ISwitchProps,
  TAvatarSize,
  TAlertVariant,
  TBadgeSize,
  TBadgeVariant,
  TButtonSize,
  TButtonVariant,
  TIconButtonShape,
  TIconButtonSize,
  TIconButtonVariant,
} from "./ui";

// ─── Toast types & enums ─────────────────────────────────────────────────────
export {
  ToastBodyLayout,
  ToastHorizontalAlign,
  ToastPosition,
  ToastType,
  ToastVerticalPosition,
} from "./typings";
export type {
  IGooeyPromiseData,
  IGooeyToasterConfig,
  IGooeyToastOptions,
  IGooeyToastTiming,
  TGooeyToastPosition,
  TGooeyToastType,
  TToastBodyLayout,
  TToastSpringConfig,
  TToastVerticalPosition,
} from "./typings";
