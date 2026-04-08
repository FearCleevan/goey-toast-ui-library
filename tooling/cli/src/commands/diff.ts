import fs from "fs";
import path from "path";
import { Command } from "commander";
import pc from "picocolors";
import { requireConfig } from "../utils/config";
import { logger } from "../utils/logger";
import { findComponent } from "../registry";

// ─── Minimal line-diff ────────────────────────────────────────────────────────

function lineDiff(original: string, modified: string): string {
  const origLines = original.split("\n");
  const modLines = modified.split("\n");
  const maxLen = Math.max(origLines.length, modLines.length);
  const output: string[] = [];

  for (let i = 0; i < maxLen; i++) {
    const o = origLines[i];
    const m = modLines[i];
    if (o === undefined) {
      output.push(pc.green(`+ ${m}`));
    } else if (m === undefined) {
      output.push(pc.red(`- ${o}`));
    } else if (o !== m) {
      output.push(pc.red(`- ${o}`));
      output.push(pc.green(`+ ${m}`));
    }
  }
  return output.join("\n");
}

// ─── Command ──────────────────────────────────────────────────────────────────

export const diffCommand = new Command("diff")
  .description("Show what changed in the registry vs your local copy")
  .argument("<component>", "Component name to diff")
  .action((componentName: string) => {
    const cwd = process.cwd();
    const config = requireConfig(cwd);
    const entry = findComponent(componentName);

    if (!entry) {
      logger.error(
        `Unknown component "${componentName}". Run ${pc.cyan("gooey list")} to see available components.`,
      );
      process.exit(1);
    }

    const filePath = path.join(cwd, config.outputDir, entry.fileName);

    if (!fs.existsSync(filePath)) {
      logger.warn(
        `${entry.fileName} not found — run ${pc.cyan(`gooey add ${componentName}`)} first.`,
      );
      process.exit(1);
    }

    const localContent = fs.readFileSync(filePath, "utf8");
    const registryContent = entry.template;

    if (localContent === registryContent) {
      logger.blank();
      logger.success(`${pc.cyan(entry.fileName)} is up to date with the registry.`);
      logger.blank();
      return;
    }

    logger.blank();
    logger.info(
      pc.bold(`Diff: ${pc.cyan(entry.fileName)}`),
    );
    logger.info(
      `${pc.red("- local")}  ${pc.green("+ registry")}`,
    );
    logger.divider();
    console.log(lineDiff(localContent, registryContent));
    logger.divider();
    logger.blank();
    logger.info(
      `Run ${pc.cyan(`gooey add ${componentName} --overwrite`)} to pull the latest version.`,
    );
    logger.blank();
  });
