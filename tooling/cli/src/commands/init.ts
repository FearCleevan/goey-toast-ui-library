import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { Command } from "commander";
import pc from "picocolors";
import { writeConfig } from "../utils/config";
import { detectExpo } from "../utils/detect-expo";
import { detectPackageManager, getInstallCommand } from "../utils/detect-pm";
import { logger } from "../utils/logger";

// ─── Prompt helper (no external deps) ────────────────────────────────────────

function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    process.stdout.write(question);
    process.stdin.setEncoding("utf8");
    process.stdin.once("data", (data: string) => {
      process.stdin.pause();
      resolve(data.trim());
    });
    process.stdin.resume();
  });
}

// ─── Command ──────────────────────────────────────────────────────────────────

export const initCommand = new Command("init")
  .description("Set up Gooey UI in your React Native / Expo project")
  .option("-y, --yes", "Skip prompts and use defaults")
  .action(async (opts: { yes?: boolean }) => {
    const cwd = process.cwd();

    logger.blank();
    logger.info(pc.bold("Initialising Gooey UI"));
    logger.divider();

    // ── 1. Detect environment ─────────────────────────────────────────────

    const { isExpo, sdkVersion, usesExpoRouter } = detectExpo(cwd);
    const pm = detectPackageManager(cwd);

    logger.step(`Package manager : ${pc.cyan(pm)}`);
    logger.step(
      `Expo project    : ${isExpo ? pc.green("yes") + (sdkVersion ? ` (SDK ${sdkVersion})` : "") : pc.dim("no")}`,
    );
    logger.step(`Expo Router     : ${usesExpoRouter ? pc.green("yes") : pc.dim("no")}`);
    logger.blank();

    // ── 2. Output directory ───────────────────────────────────────────────

    const defaultDir = "src/components/ui";
    let outputDir = defaultDir;

    if (!opts.yes) {
      const answer = await prompt(
        `  ${pc.dim("Output directory")} ${pc.dim(`[${defaultDir}]`)}: `,
      );
      if (answer) outputDir = answer;
    }

    // ── 3. Create the output directory ────────────────────────────────────

    const absoluteDir = path.join(cwd, outputDir);
    if (!fs.existsSync(absoluteDir)) {
      fs.mkdirSync(absoluteDir, { recursive: true });
      logger.step(`Created ${pc.cyan(outputDir)}`);
    }

    // ── 4. Install @gooey/core ────────────────────────────────────────────

    const corePkg = "@gooey/core";
    const pkgJsonPath = path.join(cwd, "package.json");
    let alreadyInstalled = false;

    if (fs.existsSync(pkgJsonPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8")) as Record<
        string,
        Record<string, string>
      >;
      alreadyInstalled =
        corePkg in (pkg["dependencies"] ?? {}) ||
        corePkg in (pkg["devDependencies"] ?? {});
    }

    if (!alreadyInstalled) {
      logger.step(`Installing ${pc.cyan(corePkg)}…`);
      const installCmd = getInstallCommand(pm, [corePkg], isExpo);
      try {
        execSync(installCmd, { stdio: "inherit", cwd });
      } catch {
        logger.warn(`Install failed — run ${pc.cyan(installCmd)} manually.`);
      }
    } else {
      logger.step(`${pc.cyan(corePkg)} is already installed`);
    }

    // ── 5. Write gooey.config.json ────────────────────────────────────────

    writeConfig({ outputDir, packageManager: pm, expo: isExpo, components: [] }, cwd);
    logger.step(`Wrote ${pc.cyan("gooey.config.json")}`);

    // ── 6. ThemeProvider reminder ─────────────────────────────────────────

    logger.blank();
    logger.success("Gooey UI is ready!");
    logger.blank();
    logger.info("Wrap your app with ThemeProvider:");
    logger.blank();
    console.log(
      pc.dim(
        [
          `  import { ThemeProvider } from "@gooey/core";`,
          ``,
          `  export default function App() {`,
          `    return (`,
          `      <ThemeProvider>`,
          `        {/* your app */}`,
          `      </ThemeProvider>`,
          `    );`,
          `  }`,
        ].join("\n"),
      ),
    );
    logger.blank();
    logger.info(`Run ${pc.cyan("gooey add <component>")} to add components.`);
    logger.blank();
  });
