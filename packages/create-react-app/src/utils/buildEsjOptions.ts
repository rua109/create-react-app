import { EjsOptions } from "../types";

export default function buildEsjOptions(prompts: any): EjsOptions {
  return {
    name: prompts.name,
    usesJest: prompts.jest,
    usesLinter: prompts.linter,
    transpiler: prompts.transpiler,
    reactVersion: prompts.reactVersion,
    usesTailwind: prompts.tailwind,
    usesStorybook: prompts.storybook,
  };
}
