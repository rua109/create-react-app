// const { copyDir } = require("./utils/copyDir");
import { switchToBlueColor, switchToDefaultColor } from "./const";
import createAndSwitchToDirectory from "./utils/createAndSwitchToDirectory";
import copyDirApplyingEjsTransforms from "./utils/copyDirApplyingEjsTransforms";
import runCommand from "./utils/runCommand";
import buildEsjOptions from "./utils/buildEsjOptions";
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
    type: "confirm",
    name: "linter",
    message: "Use Linter + Prettier?",
    initial: true,
  },
  {
    type: "confirm",
    name: "jest",
    message: "Use Jest?",
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
const initGitCommand = `rm -rf .git && git init && git add . && git commit -m "Initialize project using Create React app"`;

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

  console.log(`\n\n`);
  console.log(`Creating a new React app ${repoName}\n`);
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

  console.log(`Installing packages. This may take a couple of minutes.\n`);
  const installedDeps = runCommand(CMD_INSTALL_DEPS);
  if (!installedDeps) {
    process.exit(-1);
  }

  const initializedGit = runCommand(initGitCommand);
  if (!initializedGit) {
    process.exit(-1);
  }
  console.log(`Created git commit.\n`);

  console.log(`Success! created ${repoName}\n`);

  console.log(`Inside the directory you can run several commands.\n`);

  console.log(
    `${switchToBlueColor} npm run start ${switchToDefaultColor}\n Starts the development server\n`
  );

  console.log(
    `${switchToBlueColor} npm run build ${switchToDefaultColor}\n Creates a build\n`
  );

  if (esjOptions.usesStorybook) {
    console.log(
      `${switchToBlueColor} npm run storybook ${switchToDefaultColor}\n Starts the storybook \n`
    );
  }

  if (esjOptions.usesJest) {
    console.log(
      `${switchToBlueColor} npm run test ${switchToDefaultColor}\n Runs the jest tests\n`
    );
  }

  if (esjOptions.usesLinter) {
    console.log(
      `${switchToBlueColor} npm run lint ${switchToDefaultColor}\n Runs linter\n`
    );
  }
})();
