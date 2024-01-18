export interface EjsOptions {
  name: string;
  transpiler?: "babel" | "swc";
  reactVersion?: "17" | "18";
  usesTailwind?: boolean;
  usesStorybook?: boolean;
}
