import type { TGooeyToastType } from "@/typings";

// ---------------------------------------------------------------------------
// Primitive palette
// ---------------------------------------------------------------------------
const palette = {
  // slate
  slate50: "#f8fafc",
  slate100: "#f1f5f9",
  slate200: "#e2e8f0",
  slate300: "#cbd5e1",
  slate400: "#94a3b8",
  slate500: "#64748b",
  slate600: "#475569",
  slate700: "#334155",
  slate800: "#1e293b",
  slate900: "#0f172a",
  slate950: "#020617",

  // green
  green50: "#f0fdf4",
  green100: "#dcfce7",
  green200: "#bbf7d0",
  green700: "#15803d",
  green800: "#166534",
  green900: "#14532d",

  // red
  red50: "#fef2f2",
  red100: "#fee2e2",
  red200: "#fecaca",
  red600: "#dc2626",
  red700: "#b91c1c",
  red800: "#991b1b",
  red900: "#7f1d1d",

  // orange
  orange50: "#fff7ed",
  orange100: "#ffedd5",
  orange200: "#fed7aa",
  orange700: "#c2410c",
  orange800: "#9a3412",
  orange900: "#7c2d12",

  // blue
  blue50: "#eff6ff",
  blue100: "#dbeafe",
  blue200: "#bfdbfe",
  blue600: "#2563eb",
  blue700: "#1d4ed8",
  blue800: "#1e40af",
  blue900: "#1e3a8a",

  // neutrals
  white: "#ffffff",
  black: "#000000",
} as const;

// ---------------------------------------------------------------------------
// Toast type color tokens
// ---------------------------------------------------------------------------
export interface IToastTypeColors {
  /** Icon and title color */
  icon: string;
  /** Card background fill */
  surface: string;
  /** SVG blob stroke */
  stroke: string;
  /** Action button background */
  action: string;
  /** Action button label */
  actionText: string;
}

type TToastColors = Record<TGooeyToastType, IToastTypeColors>;

const lightToastColors: TToastColors = {
  default: {
    icon: palette.slate600,
    surface: palette.slate50,
    stroke: "rgba(148,163,184,0.26)",
    action: palette.slate200,
    actionText: palette.slate700,
  },
  success: {
    icon: palette.green700,
    surface: palette.green50,
    stroke: "rgba(34,197,94,0.18)",
    action: palette.green100,
    actionText: palette.green800,
  },
  error: {
    icon: palette.red600,
    surface: palette.red50,
    stroke: "rgba(239,68,68,0.2)",
    action: palette.red100,
    actionText: palette.red800,
  },
  warning: {
    icon: palette.orange700,
    surface: palette.orange50,
    stroke: "rgba(249,115,22,0.2)",
    action: palette.orange100,
    actionText: palette.orange800,
  },
  info: {
    icon: palette.blue600,
    surface: palette.blue50,
    stroke: "rgba(59,130,246,0.18)",
    action: palette.blue100,
    actionText: palette.blue800,
  },
};

const darkToastColors: TToastColors = {
  default: {
    icon: palette.slate400,
    surface: palette.slate800,
    stroke: "rgba(148,163,184,0.14)",
    action: palette.slate700,
    actionText: palette.slate200,
  },
  success: {
    icon: "#4ade80",
    surface: "#052e16",
    stroke: "rgba(74,222,128,0.16)",
    action: palette.green900,
    actionText: "#86efac",
  },
  error: {
    icon: "#f87171",
    surface: "#450a0a",
    stroke: "rgba(248,113,113,0.18)",
    action: palette.red900,
    actionText: "#fca5a5",
  },
  warning: {
    icon: "#fb923c",
    surface: "#431407",
    stroke: "rgba(251,146,60,0.18)",
    action: palette.orange900,
    actionText: "#fdba74",
  },
  info: {
    icon: "#60a5fa",
    surface: "#172554",
    stroke: "rgba(96,165,250,0.16)",
    action: palette.blue900,
    actionText: "#93c5fd",
  },
};

// ---------------------------------------------------------------------------
// Semantic color tokens
// ---------------------------------------------------------------------------
export interface ISemanticColors {
  /** App / card background */
  background: string;
  /** Primary text */
  foreground: string;
  /** Subtle fills */
  muted: string;
  /** Subtle / secondary text */
  mutedForeground: string;
  /** Dividers and borders */
  border: string;
  /** Shadow base color */
  shadow: string;
  /** Progress track overlay */
  progressTrack: string;
  /** Per-type toast color sets */
  toast: TToastColors;
}

const lightSemanticColors: ISemanticColors = {
  background: palette.white,
  foreground: "#1f2937",
  muted: palette.slate100,
  mutedForeground: palette.slate500,
  border: palette.slate200,
  shadow: palette.slate900,
  progressTrack: "rgba(15,23,42,0.06)",
  toast: lightToastColors,
};

const darkSemanticColors: ISemanticColors = {
  background: palette.slate900,
  foreground: palette.slate50,
  muted: palette.slate800,
  mutedForeground: palette.slate400,
  border: palette.slate700,
  shadow: palette.slate950,
  progressTrack: "rgba(255,255,255,0.08)",
  toast: darkToastColors,
};

export { darkSemanticColors, lightSemanticColors, palette };
