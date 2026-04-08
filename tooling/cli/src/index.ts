import { Command } from "commander";
import { addCommand } from "./commands/add";
import { diffCommand } from "./commands/diff";
import { initCommand } from "./commands/init";
import { listCommand } from "./commands/list";

const program = new Command();

program
  .name("gooey")
  .description("Add Gooey UI components to your React Native / Expo project")
  .version("0.1.0");

program.addCommand(initCommand);
program.addCommand(addCommand);
program.addCommand(listCommand);
program.addCommand(diffCommand);

program.parse();
