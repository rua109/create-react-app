export interface EjsOptions {
  name: string;
  usesGit: boolean;
  usesJest: boolean;
  usesExpo: boolean;
  usesYarn: boolean;
  usesReact: boolean;
  usesLinter: boolean;
  linterType: string;
  transpiler: "babel" | "swc";
  reactVersion: "17" | "18" | "none";
  usesTailwind: boolean;
  usesStorybook: boolean;
}

export interface PromptsProps {
  name: string;
  git: boolean;
  jest: boolean;
  expo: boolean;
  linter: string;
  tailwind: boolean;
  storybook: boolean;
  transpiler: "babel" | "swc";
  reactVersion: "17" | "18" | "none";
}

export default function buildEsjOptions(prompts: PromptsProps): EjsOptions {
  return {
    name: prompts.name,
    usesGit: prompts.git,
    usesJest: prompts.jest,
    usesYarn: prompts.expo,
    usesExpo: prompts.expo,
    usesReact: prompts.reactVersion === "none" ? false : true,
    usesLinter: prompts.linter === "none" ? false : true,
    linterType: prompts.linter,
    transpiler: prompts.transpiler,
    reactVersion: prompts.reactVersion,
    usesTailwind: prompts.tailwind,
    usesStorybook: prompts.storybook,
  };
}
