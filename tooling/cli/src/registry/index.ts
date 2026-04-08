import { badgeTemplate } from "./templates/badge";
import { buttonTemplate } from "./templates/button";
import { cardTemplate } from "./templates/card";
import { checkboxTemplate } from "./templates/checkbox";
import { inputTemplate } from "./templates/input";
import { modalTemplate } from "./templates/modal";

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
