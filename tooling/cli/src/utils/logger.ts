import pc from "picocolors";

const prefix = pc.bold(pc.magenta("gooey"));

export const logger = {
  info: (msg: string) => console.log(`${prefix}  ${msg}`),
  success: (msg: string) => console.log(`${prefix}  ${pc.green("✓")} ${msg}`),
  warn: (msg: string) => console.log(`${prefix}  ${pc.yellow("!")} ${pc.yellow(msg)}`),
  error: (msg: string) => console.error(`${prefix}  ${pc.red("✗")} ${pc.red(msg)}`),
  step: (msg: string) => console.log(`  ${pc.dim("→")} ${msg}`),
  divider: () => console.log(pc.dim("─".repeat(44))),
  blank: () => console.log(),
};
