import { EjsOptions } from "../types";

export interface PromptsProps {
  name: string;
  git: boolean;
  jest: boolean;
  linter: string;
  tailwind: boolean;
  storybook: boolean;
  transpiler: "babel" | "swc";
  reactVersion: "17" | "18";
}

export default function buildEsjOptions(prompts: PromptsProps): EjsOptions {
  return {
    name: prompts.name,
    usesGit: prompts.git,
    usesJest: prompts.jest,
    usesLinter: prompts.linter === "none" ? false : true,
    linterType: prompts.linter,
    transpiler: prompts.transpiler,
    reactVersion: prompts.reactVersion,
    usesTailwind: prompts.tailwind,
    usesStorybook: prompts.storybook,
  };
}
