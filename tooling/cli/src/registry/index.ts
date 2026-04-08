import { alertTemplate } from "./templates/alert";
import { badgeTemplate } from "./templates/badge";
import { bottomSheetTemplate } from "./templates/bottom-sheet";
import { buttonTemplate } from "./templates/button";
import { cardTemplate } from "./templates/card";
import { checkboxTemplate } from "./templates/checkbox";
import { chipTemplate } from "./templates/chip";
import { iconButtonTemplate } from "./templates/icon-button";
import { inputTemplate } from "./templates/input";
import { modalTemplate } from "./templates/modal";
import { skeletonTemplate } from "./templates/skeleton";
import { switchTemplate } from "./templates/switch";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface RegistryEntry {
  /** Unique component identifier used in CLI commands */
  name: string;
  description: string;
  /** Complexity tier — mirrors @gooey/core tiers */
  tier: 1 | 2 | 3;
  /** npm packages that must be installed alongside this component */
  peerDeps: string[];
  /** File name written to the user's outputDir */
  fileName: string;
  /** Full source of the component */
  template: string;
}

// ─── Registry ─────────────────────────────────────────────────────────────────

const REGISTRY: RegistryEntry[] = [
  {
    name: "button",
    description: "Animated pressable button with solid, outline, and ghost variants",
    tier: 2,
    peerDeps: ["react-native-reanimated"],
    fileName: "Button.tsx",
    template: buttonTemplate,
  },
  {
    name: "card",
    description: "Themed surface with optional press animation and shadow",
    tier: 3,
    peerDeps: ["react-native-reanimated"],
    fileName: "Card.tsx",
    template: cardTemplate,
  },
  {
    name: "input",
    description: "Text input with label, error, helper, and icon slots",
    tier: 2,
    peerDeps: [],
    fileName: "Input.tsx",
    template: inputTemplate,
  },
  {
    name: "badge",
    description: "Small status label or dot using toast-type color variants",
    tier: 2,
    peerDeps: [],
    fileName: "Badge.tsx",
    template: badgeTemplate,
  },
  {
    name: "modal",
    description: "Animated RN Modal with backdrop dismiss and spring entry",
    tier: 3,
    peerDeps: ["react-native-reanimated"],
    fileName: "Modal.tsx",
    template: modalTemplate,
  },
  {
    name: "checkbox",
    description: "Animated checkbox with indeterminate state",
    tier: 2,
    peerDeps: ["react-native-reanimated"],
    fileName: "Checkbox.tsx",
    template: checkboxTemplate,
  },
  {
    name: "switch",
    description: "Animated toggle switch with size variants and optional label",
    tier: 2,
    peerDeps: ["react-native-reanimated"],
    fileName: "Switch.tsx",
    template: switchTemplate,
  },
  {
    name: "chip",
    description: "Selectable pill chip with selected state and optional leading icon",
    tier: 2,
    peerDeps: ["react-native-reanimated"],
    fileName: "Chip.tsx",
    template: chipTemplate,
  },
  {
    name: "icon-button",
    description: "Square or circle icon-only button with solid, outline, and ghost variants",
    tier: 2,
    peerDeps: ["react-native-reanimated"],
    fileName: "IconButton.tsx",
    template: iconButtonTemplate,
  },
  {
    name: "alert",
    description: "Inline alert banner with toast-type color variants and optional close button",
    tier: 1,
    peerDeps: [],
    fileName: "Alert.tsx",
    template: alertTemplate,
  },
  {
    name: "skeleton",
    description: "Pulsing placeholder skeleton for loading states",
    tier: 2,
    peerDeps: ["react-native-reanimated"],
    fileName: "Skeleton.tsx",
    template: skeletonTemplate,
  },
  {
    name: "bottom-sheet",
    description: "Gesture-driven bottom sheet with snap point and backdrop dismiss",
    tier: 3,
    peerDeps: [
      "react-native-reanimated",
      "react-native-gesture-handler",
      "react-native-safe-area-context",
    ],
    fileName: "BottomSheet.tsx",
    template: bottomSheetTemplate,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getAllComponents(): RegistryEntry[] {
  return REGISTRY;
}

export function findComponent(name: string): RegistryEntry | undefined {
  return REGISTRY.find((c) => c.name === name.toLowerCase());
}

export function getComponentNames(): string[] {
  return REGISTRY.map((c) => c.name);
}
