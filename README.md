# gooey-toast

Morphing blob toasts and a full React Native UI library for Expo.

https://github.com/user-attachments/assets/ed0c75b8-3ee3-43b3-8e24-eec3f25c5135

---

## What's inside

| Package | Description |
|---|---|
| `@gooey/core` | Toast system, theming engine, and 20+ animated components |
| `@gooey/charts` | BarChart, LineChart, AreaChart, PieChart, DonutChart |
| `@gooey/blocks` | Pre-built screen blocks: Auth, Onboarding, Dashboard, E-commerce, Settings |
| `@gooey/cli` | shadcn-style component installer — `gooey add button` |

---

## Features

- Morphing blob animation (pill → card → pill) driven by Reanimated + SVG
- Promise toasts with automatic spinner
- Swipe-to-dismiss, action buttons, timestamps
- Full theming system with light/dark tokens and `createTheme`
- 20+ animated UI components (Button, Input, Switch, Card, Modal, BottomSheet, …)
- Pre-built screen compositions with automatic toast feedback
- Shadcn-style CLI installer — copy components into your project and own the code
- Full TypeScript — no `@types/*` needed

---

## Repository structure

```
goey-toast/
├── apps/
│   ├── expo-demo/      # Expo reference app (SDK 55, RN 0.83)
│   └── docs/           # Next.js + Nextra documentation site
├── packages/
│   ├── core/           # @gooey/core — toast + components + theme
│   ├── charts/         # @gooey/charts — Victory Native chart suite
│   └── blocks/         # @gooey/blocks — pre-built screen blocks
└── tooling/
    ├── cli/            # @gooey/cli — component installer
    └── tsconfig/       # shared TypeScript configs
```

> The repo is a pnpm monorepo managed with Turborepo. Each package lives in `packages/` or `tooling/`, each app in `apps/`. **Do not `npm install` from a sub-folder** — always install from the root.

---

## Installation

### As a package in your own Expo project

```bash
# Install the core package and required peer deps
npx expo install @gooey/core react-native-reanimated react-native-svg react-native-gesture-handler react-native-safe-area-context
```

Add the Reanimated Babel plugin to `babel.config.js`:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"], // must be last
  };
};
```

Wrap your root layout:

```tsx
// app/_layout.tsx
import { ThemeProvider, GooeyToaster } from "@gooey/core";

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      {children}
      <GooeyToaster />
    </ThemeProvider>
  );
}
```

### Charts (optional)

```bash
npx expo install @gooey/charts victory-native react-native-svg
```

### Blocks (optional)

```bash
pnpm add @gooey/blocks @gooey/core
```

### CLI (optional)

```bash
npm install -g @gooey/cli
# or use without installing
npx @gooey/cli init
```

---

## Running the demo app locally

```bash
# 1. Clone
git clone https://github.com/your-org/goey-toast
cd goey-toast

# 2. Install all workspace deps from the root (do NOT cd into sub-folders first)
pnpm install

# 3. Build internal packages (core, charts, blocks)
pnpm build

# 4. Start the Expo demo
pnpm demo
```

> Requires **Node >= 20** and **pnpm >= 10**. Install pnpm with `npm i -g pnpm`.

---

## Usage

### Basic toasts

```tsx
import { gooeyToast } from "@gooey/core";

gooeyToast("Hello world");
gooeyToast.success("Saved!", { description: "Your changes are safe." });
gooeyToast.error("Upload failed", { description: "Check your connection." });
gooeyToast.warning("Low storage", { duration: 6000 });
gooeyToast.info("Update available");
```

### Promise toast

```tsx
gooeyToast.promise(uploadFile(), {
  loading: "Uploading…",
  success: (data) => `Uploaded ${data.name}`,
  error: (err) => err.message,
});
```

### Action button

```tsx
gooeyToast("File deleted", {
  description: "invoice.pdf",
  action: {
    label: "Undo",
    onPress: () => restoreFile(),
  },
  duration: 6000,
});
```

### Update / dismiss

```tsx
const id = gooeyToast("Processing…", { duration: Infinity });

gooeyToast.update(id, { title: "Done!", type: "success", duration: 3000 });
gooeyToast.dismiss(id);   // one
gooeyToast.dismiss();     // all
```

---

## GooeyToaster props

| Prop | Type | Default | Description |
|---|---|---|---|
| `position` | `"top-left" \| "top-center" \| "top-right" \| "bottom-left" \| "bottom-center" \| "bottom-right"` | `"bottom-center"` | Toast stack position |
| `maxToasts` | `number` | `3` | Max visible toasts |
| `defaultDuration` | `number` | `4000` | Auto-dismiss in ms |
| `defaultShowTimestamp` | `boolean` | `false` | Show elapsed time label |
| `theme` | `ITheme` | inherited | Override theme for toasts only |

---

## gooeyToast options

| Option | Type | Default | Description |
|---|---|---|---|
| `description` | `string` | — | Secondary text below title |
| `duration` | `number` | `4000` | Auto-dismiss in ms. `Infinity` to persist |
| `icon` | `ReactNode` | — | Custom icon (replaces type icon) |
| `action` | `{ label: string; onPress: () => void }` | — | Action button |
| `dismissible` | `boolean` | `true` | Swipe-to-dismiss |
| `showTimestamp` | `boolean` | `false` | Elapsed time label |
| `id` | `string` | auto | Fixed ID for deduplication |
| `type` | `"default" \| "success" \| "error" \| "warning" \| "info"` | `"default"` | Toast variant |

---

## Theming

```tsx
import { createTheme, ThemeProvider, darkTheme } from "@gooey/core";

// Use built-in dark theme
<ThemeProvider theme={darkTheme}>{/* … */}</ThemeProvider>

// Create a brand theme (deep-merges with lightTheme)
const brandTheme = createTheme({
  colors: { primary: "#6C47FF" },
});
<ThemeProvider theme={brandTheme}>{/* … */}</ThemeProvider>
```

Access tokens anywhere with `useTheme`:

```tsx
import { useTheme } from "@gooey/core";

const theme = useTheme();
// theme.colors.card, theme.radius.xl, theme.spacing[4], theme.shadows.md …
```

---

## Components (from @gooey/core)

| Category | Components |
|---|---|
| Toast | `GooeyToaster`, `gooeyToast`, `removeToast`, `dismissAll` |
| Layout | `Box`, `HStack`, `VStack`, `Divider` |
| Typography | `Text` |
| Inputs | `Button`, `IconButton`, `Input`, `Switch`, `Checkbox` |
| Display | `Avatar`, `Badge`, `Card`, `Chip`, `Alert` |
| Overlays | `Modal`, `BottomSheet` |
| Feedback | `Skeleton` |
| Theme | `ThemeProvider`, `useTheme`, `createTheme`, `lightTheme`, `darkTheme` |
| Tokens | `palette`, `radius`, `spacing`, `typography`, `motion` |

---

## CLI — gooey add

Copy individual components into your own project and customize them freely:

```bash
# Initialize (creates gooey.config.json)
npx @gooey/cli init

# List available components
npx @gooey/cli list

# Add a component
npx @gooey/cli add button
npx @gooey/cli add switch
npx @gooey/cli add bottom-sheet

# Preview diff before applying
npx @gooey/cli diff button
```

Available components: `button`, `card`, `input`, `badge`, `modal`, `checkbox`, `switch`, `chip`, `icon-button`, `alert`, `skeleton`, `bottom-sheet`

---

## Stack

- Expo SDK 55 · React Native 0.83
- React Native Reanimated 4
- React Native SVG
- React Native Gesture Handler
- Turborepo · pnpm workspaces · Changesets

---

## License

MIT
