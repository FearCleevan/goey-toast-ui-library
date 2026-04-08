import fs from "fs";
import path from "path";

export interface GooeyConfig {
  /** Relative path where components will be written. Defaults to "src/components/ui" */
  outputDir: string;
  /** Package manager used in this project */
  packageManager: "npm" | "yarn" | "pnpm" | "bun";
  /** Whether this is an Expo project */
  expo: boolean;
  /** List of component names already added via the CLI */
  components: string[];
}

const CONFIG_FILENAME = "gooey.config.json";

export function getConfigPath(cwd = process.cwd()): string {
  return path.join(cwd, CONFIG_FILENAME);
}

export function readConfig(cwd = process.cwd()): GooeyConfig | null {
  const configPath = getConfigPath(cwd);
  if (!fs.existsSync(configPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(configPath, "utf8")) as GooeyConfig;
  } catch {
    return null;
  }
}

export function writeConfig(config: GooeyConfig, cwd = process.cwd()): void {
  fs.writeFileSync(
    getConfigPath(cwd),
    JSON.stringify(config, null, 2) + "\n",
    "utf8",
  );
}

export function requireConfig(cwd = process.cwd()): GooeyConfig {
  const config = readConfig(cwd);
  if (!config) {
    throw new Error(
      `No gooey.config.json found. Run ${"`"}gooey init${"`"} first.`,
    );
  }
  return config;
}
