import fs from "fs";
import path from "path";

export interface ExpoInfo {
  isExpo: boolean;
  sdkVersion: string | null;
  usesExpoRouter: boolean;
}

/**
 * Detects whether the project uses Expo by checking:
 * 1. app.json / app.config.js for the `expo` key
 * 2. package.json for `expo` in dependencies
 */
export function detectExpo(cwd = process.cwd()): ExpoInfo {
  // Check package.json
  const pkgPath = path.join(cwd, "package.json");
  if (!fs.existsSync(pkgPath)) {
    return { isExpo: false, sdkVersion: null, usesExpoRouter: false };
  }

  let pkg: Record<string, unknown> = {};
  try {
    pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8")) as Record<string, unknown>;
  } catch {
    return { isExpo: false, sdkVersion: null, usesExpoRouter: false };
  }

  const allDeps = {
    ...((pkg["dependencies"] as Record<string, string>) ?? {}),
    ...((pkg["devDependencies"] as Record<string, string>) ?? {}),
  };

  const isExpo = "expo" in allDeps;
  const usesExpoRouter = "expo-router" in allDeps;

  // Derive SDK version from the expo package version string (e.g. "~52.0.0" → "52")
  let sdkVersion: string | null = null;
  const expoVersion = allDeps["expo"];
  if (expoVersion) {
    const match = /(\d+)/.exec(expoVersion);
    if (match) sdkVersion = match[1];
  }

  return { isExpo, sdkVersion, usesExpoRouter };
}
