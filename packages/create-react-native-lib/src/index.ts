import {
  runCommand,
  createAndSwitchToDirectory,
  copyDirApplyingEjsTransforms,
} from "@rua109/create-react-app-utils";
import ora from "ora";
import kleur from "kleur";
import dedent from "dedent";
import buildEsjOptions from "./utils/buildEsjOptions";

const path = require("path");
const prompts = require("prompts");

const repoName = process.argv[2];

const questions = [
  {
    type: "text",
    name: "name",
    message: "Name of the library:",
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
    type: "confirm",
    name: "expo",
    message: "Create example folder?",
    initial: true,
  },
  {
    type: (prev: any, values: any) => (values.expo ? "confirm" : null),
    name: "storybook",
    message: "Use Storybooks?",
    initial: true,
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
    type: (prev: any, values: any) => (values.storybook ? "confirm" : null),
    name: "svg",
    message: "Include react-native-svg?",
    initial: true,
  },
  {
    type: (prev: any, values: any) => (values.storybook ? "confirm" : null),
    name: "paper",
    message: "Include react-native-paper?",
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
const CONFIG_EXPO = path.resolve(__dirname, "../templates/config-expo");
const CONFIG_ESLINT = path.resolve(__dirname, "../templates/config-eslint");
const CONFIG_JEST = path.resolve(__dirname, "../templates/config-jest");
const CONFIG_NO_STORYBOOK = path.resolve(
  __dirname,
  "../templates/config-expo-no-storybook"
);
const CONFIG_JEST_STORYBOOK = path.resolve(
  __dirname,
  "../templates/config-jest-storybook"
);
const CONFIG_STORYBOOK = path.resolve(
  __dirname,
  "../templates/config-storybook"
);
const CONFIG_RN_SVG = path.resolve(
  __dirname,
  "../templates/config-react-native-svg"
);
const CONFIG_RN_PAPER = path.resolve(
  __dirname,
  "../templates/config-react-native-paper"
);

const CMD_INIT_GIT = `rm -rf .git && git init && git add . && git commit -m "Initialize project using Create React app"`;

const folder = path.resolve(process.cwd(), repoName);

(async () => {
  let cancelled = false;

  // callback invoked when user cancels/exits the prompt
  const onCancel = () => {
    cancelled = true;
  };

  const response = await prompts(questions, { onCancel });

  // user has hit ctrl-C
  if (cancelled) {
    process.exit(-1);
  }

  const esjOptions = buildEsjOptions(response);

  const spinner = ora().start();
  spinner.text = "Copying files";
  createAndSwitchToDirectory(repoName);

  copyDirApplyingEjsTransforms(COMMON_FILES, folder, esjOptions);

  if (esjOptions.usesExpo) {
    copyDirApplyingEjsTransforms(CONFIG_EXPO, folder, esjOptions);

    if (esjOptions.usesStorybook) {
      copyDirApplyingEjsTransforms(CONFIG_STORYBOOK, folder, esjOptions);
    } else {
      copyDirApplyingEjsTransforms(CONFIG_NO_STORYBOOK, folder, esjOptions);
    }
  }

  if (esjOptions.usesLinter) {
    copyDirApplyingEjsTransforms(CONFIG_ESLINT, folder, esjOptions);
  }

  if (esjOptions.usesJest) {
    copyDirApplyingEjsTransforms(CONFIG_JEST, folder, esjOptions);
    if (esjOptions.usesStorybook) {
      copyDirApplyingEjsTransforms(CONFIG_JEST_STORYBOOK, folder, esjOptions);
    }
  }

  if (esjOptions.usesReactNativeSvg) {
    copyDirApplyingEjsTransforms(CONFIG_RN_SVG, folder, esjOptions);
  }

  if (esjOptions.usesReactNativePaper) {
    copyDirApplyingEjsTransforms(CONFIG_RN_PAPER, folder, esjOptions);
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
})();
