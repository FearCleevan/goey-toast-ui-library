import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { Command } from "commander";
import pc from "picocolors";
import { requireConfig, writeConfig } from "../utils/config";
import { getInstallCommand } from "../utils/detect-pm";
import { logger } from "../utils/logger";
import { findComponent } from "../registry";

// ─── Command ──────────────────────────────────────────────────────────────────

export const addCommand = new Command("add")
  .description("Add one or more components to your project")
  .argument("<components...>", "Component name(s) to add")
  .option("-o, --overwrite", "Overwrite existing files without asking")
  .action((componentNames: string[], opts: { overwrite?: boolean }) => {
    const cwd = process.cwd();
    const config = requireConfig(cwd);

    logger.blank();
    logger.info(pc.bold(`Adding ${componentNames.join(", ")}`));
    logger.divider();

    let addedCount = 0;
    const depsToInstall = new Set<string>();

    for (const name of componentNames) {
      const entry = findComponent(name);

      if (!entry) {
        logger.error(
          `Unknown component "${name}". Run ${pc.cyan("gooey list")} to see available components.`,
        );
        continue;
      }

      const outputDir = path.join(cwd, config.outputDir);
      const filePath = path.join(outputDir, entry.fileName);

      // Create output directory if needed
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Check for existing file
      if (fs.existsSync(filePath) && !opts.overwrite) {
        logger.warn(
          `${entry.fileName} already exists — use ${pc.cyan("--overwrite")} to replace it.`,
        );
        continue;
      }

      // Write the component file
      fs.writeFileSync(filePath, entry.template, "utf8");
      logger.success(
        `${pc.cyan(entry.fileName)} → ${pc.dim(path.relative(cwd, filePath))}`,
      );

      // Queue deps
      for (const dep of entry.peerDeps) {
        depsToInstall.add(dep);
      }

      // Track in config
      if (!config.components.includes(entry.name)) {
        config.components.push(entry.name);
      }

      addedCount++;
    }

    // ── Install peer deps ────────────────────────────────────────────────

    if (depsToInstall.size > 0) {
      const depList = [...depsToInstall];
      logger.blank();
      logger.step(`Installing peer dependencies…`);
      const installCmd = getInstallCommand(
        config.packageManager,
        depList,
        config.expo,
      );
      try {
        execSync(installCmd, { stdio: "inherit", cwd });
      } catch {
        logger.warn(
          `Install failed — run ${pc.cyan(installCmd)} manually.`,
        );
      }
    }

    // ── Persist updated config ────────────────────────────────────────────

    if (addedCount > 0) {
      writeConfig(config, cwd);
    }

    logger.blank();

    if (addedCount === 0) {
      logger.warn("No components were added.");
      return;
    }

    logger.success(
      `${addedCount} component${addedCount !== 1 ? "s" : ""} added to ${pc.cyan(config.outputDir)}`,
    );
    logger.blank();
    logger.info("Import from your components directory:");
    logger.blank();

    for (const name of componentNames) {
      const entry = findComponent(name);
      if (!entry) continue;
      const baseName = entry.fileName.replace(".tsx", "");
      const rel = `${config.outputDir}/${baseName}`;
      console.log(
        pc.dim(`  import { ${baseName} } from "${rel}";`),
      );
    }

    logger.blank();
  });
