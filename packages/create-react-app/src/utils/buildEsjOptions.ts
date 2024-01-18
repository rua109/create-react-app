import { EjsOptions } from "../types";

export default function buildEsjOptions(prompts: any): EjsOptions {
  return {
    name: prompts.name,
    transpiler: prompts.transpiler,
    reactVersion: prompts.reactVersion,
  };
}
