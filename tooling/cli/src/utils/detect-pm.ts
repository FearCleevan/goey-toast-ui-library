import fs from "fs";
import path from "path";
import type { GooeyConfig } from "./config";

type PackageManager = GooeyConfig["packageManager"];

/**
 * Detects the package manager by looking for lock files in the project root.
 * Falls back to npm if nothing is found.
 */
export function detectPackageManager(cwd = process.cwd()): PackageManager {
  if (fs.existsSync(path.join(cwd, "bun.lockb"))) return "bun";
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

/** Returns the install command for a given package manager */
export function getInstallCommand(
  pm: PackageManager,
  packages: string[],
  isExpo: boolean,
): string {
  const pkgList = packages.join(" ");
  if (isExpo) {
    // Expo's install command validates SDK compatibility
    return `npx expo install ${pkgList}`;
  }
  switch (pm) {
    case "bun":
      return `bun add ${pkgList}`;
    case "pnpm":
      return `pnpm add ${pkgList}`;
    case "yarn":
      return `yarn add ${pkgList}`;
    default:
      return `npm install ${pkgList}`;
  }
}
