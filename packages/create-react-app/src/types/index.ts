export interface EjsOptions {
  name: string;
  usesLinter?: boolean;
  transpiler?: "babel" | "swc";
  reactVersion?: "17" | "18";
  usesTailwind?: boolean;
  usesStorybook?: boolean;
}
