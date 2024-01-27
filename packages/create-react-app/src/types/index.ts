export interface EjsOptions {
  name: string;
  usesGit: boolean;
  usesJest: boolean;
  usesLinter: boolean;
  linterType: string;
  transpiler: "babel" | "swc";
  reactVersion: "17" | "18";
  usesTailwind: boolean;
  usesStorybook: boolean;
}
