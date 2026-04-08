import { Command } from "commander";
import pc from "picocolors";
import { readConfig } from "../utils/config";
import { logger } from "../utils/logger";
import { getAllComponents } from "../registry";

const TIER_LABEL: Record<number, string> = {
  1: pc.dim("Tier 1  "),
  2: pc.dim("Tier 2  "),
  3: pc.dim("Tier 3  "),
};

export const listCommand = new Command("list")
  .description("List all available components")
  .action(() => {
    const cwd = process.cwd();
    const config = readConfig(cwd);
    const components = getAllComponents();

    logger.blank();
    logger.info(pc.bold("Available components"));
    logger.divider();

    for (const comp of components) {
      const isAdded = config?.components.includes(comp.name) ?? false;
      const status = isAdded ? pc.green("✓ added ") : pc.dim("        ");
      const deps =
        comp.peerDeps.length > 0
          ? pc.dim(` (requires ${comp.peerDeps.join(", ")})`)
          : "";

      console.log(
        `  ${status}${TIER_LABEL[comp.tier]}${pc.cyan(comp.name.padEnd(12))}  ${comp.description}${deps}`,
      );
    }

    logger.blank();
    logger.info(`Run ${pc.cyan("gooey add <component>")} to add a component.`);
    logger.blank();
  });
