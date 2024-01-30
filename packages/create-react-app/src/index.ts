import {
  runCommand,
  createAndSwitchToDirectory,
  copyDirApplyingEjsTransforms,
} from "@rua109/create-react-app-utils";
import buildEsjOptions, { PromptsProps } from "./utils/buildEsjOptions";
import ora from "ora";
import kleur from "kleur";
import dedent from "dedent";

const path = require("path");
const prompts = require("prompts");

const repoName = process.argv[2] ?? "example";

const questions = [
  {
    type: "text",
    name: "name",
    message: "Name of the project:",
    initial: repoName,
  },
  {
    type: "select",
    name: "reactVersion",
    message: "Which version of react are you targeting ?",
    choices: [
      { title: "react17", value: "17" },
      { title: "react18", value: "18" },
    ],
    initial: 1,
  },
  {
    type: "select",
    name: "transpiler",
    message: "Which transpiler would you like to use ?",
    choices: [
      { title: "babel", value: "babel" },
      { title: "swc", value: "swc" },
    ],
    initial: 1,
  },
  {
    type: "confirm",
    name: "storybook",
    message: "Use Storybooks?",
    initial: false,
  },
  {
    type: "confirm",
    name: "tailwind",
    message: "Use Tailwind?",
    initial: false,
  },
  {
    type: "select",
    name: "linter",
    message: "Which linter would you like to use",
    choices: [
      { title: "standard with typescript", value: "standard" },
      { title: "airbnb with typescript", value: "airbnb" },
      { title: "none", value: "none" },
    ],
    initial: 0,
  },
  {
    type: "confirm",
    name: "jest",
    message: "Use Jest?",
    initial: true,
  },
  {
    type: "confirm",
    name: "git",
    message: "Use Git?",
    initial: true,
  },
];

const COMMON_FILES = path.resolve(__dirname, "../templates/common");
const CONFIG_SWC = path.resolve(__dirname, "../templates/config-swc");
const CONFIG_BABEL = path.resolve(__dirname, "../templates/config-babel");
const CONFIG_ESLINT = path.resolve(__dirname, "../templates/config-eslint");
const CONFIG_JEST = path.resolve(__dirname, "../templates/config-jest");
const CONFIG_STORYBOOK = path.resolve(
  __dirname,
  "../templates/config-storybook"
);
const CONFIG_JEST_STORYBOOK = path.resolve(
  __dirname,
  "../templates/config-jest-storybook"
);
const CONFIG_TAILWIND = path.resolve(__dirname, "../templates/config-tailwind");

const CMD_INSTALL_DEPS = `npm install`;
const CMD_INIT_GIT = `rm -rf .git && git init && git add . && git commit -m "Initialize project using Create React app"`;
const CMD_CD = `cd ${repoName}`;

const folder = path.resolve(process.cwd(), repoName);

(async () => {
  let cancelled = false;

  // callback invoked when user cancels/exits the prompt
  const onCancel = () => {
    cancelled = true;
  };

  const response: PromptsProps = await prompts(questions, { onCancel });

  // user has hit ctrl-C
  if (cancelled) {
    process.exit(-1);
  }

  const esjOptions = buildEsjOptions(response);

  const spinner = ora().start();

  spinner.text = "Copying files";
  createAndSwitchToDirectory(repoName);

  copyDirApplyingEjsTransforms(COMMON_FILES, folder, esjOptions);

  if (esjOptions.transpiler === "swc") {
    copyDirApplyingEjsTransforms(CONFIG_SWC, folder, esjOptions);
  } else {
    copyDirApplyingEjsTransforms(CONFIG_BABEL, folder, esjOptions);
  }
  if (esjOptions.usesLinter) {
    copyDirApplyingEjsTransforms(CONFIG_ESLINT, folder, esjOptions);
  }
  if (esjOptions.usesJest) {
    copyDirApplyingEjsTransforms(CONFIG_JEST, folder, esjOptions);
  }
  if (esjOptions.usesStorybook) {
    copyDirApplyingEjsTransforms(CONFIG_STORYBOOK, folder, esjOptions);
  }
  if (esjOptions.usesJest && esjOptions.usesStorybook) {
    copyDirApplyingEjsTransforms(CONFIG_JEST_STORYBOOK, folder, esjOptions);
  }
  if (esjOptions.usesTailwind) {
    copyDirApplyingEjsTransforms(CONFIG_TAILWIND, folder, esjOptions);
  }

  const installedDeps = runCommand(CMD_INSTALL_DEPS);
  if (!installedDeps) {
    process.exit(-1);
  }

  if (esjOptions.usesGit) {
    const initializedGit = runCommand(CMD_INIT_GIT, { mute: true });
    if (!initializedGit) {
      process.exit(-1);
    }
  }

  spinner.succeed(
    `Project created successfully at ${kleur.yellow(repoName)}!\n`
  );

  console.log(
    dedent(`
    Inside the directory you can run several commands.

    ${kleur.blue("npm run start")}
    Starts the development server

    ${kleur.blue("npm run build")}
    Creates a build
    ${
      esjOptions.usesStorybook
        ? `\n${kleur.blue("npm run storybook")}
    Starts the storybook\n`
        : ""
    }${
      esjOptions.usesJest
        ? `\n${kleur.blue("npm run jest")}
    Runs the jest tests\n`
        : ""
    }${
      esjOptions.usesLinter
        ? `\n${kleur.blue("npm run lint")}
    Runs linter\n`
        : ""
    }
  `)
  );
})();
