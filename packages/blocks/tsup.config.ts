import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    "react",
    "react-native",
    "react-native-reanimated",
    "react-native-safe-area-context",
    "@gooey/core",
  ],
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
});
