export interface EjsOptions {
  name: string;
  usesJest?: boolean;
  usesLinter?: boolean;
  transpiler?: "babel" | "swc";
  reactVersion?: "17" | "18";
  usesTailwind?: boolean;
  usesStorybook?: boolean;
}
