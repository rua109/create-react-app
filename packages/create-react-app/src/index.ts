// const { copyDir } = require("./utils/copyDir");
import copyDir from "./utils/copyDir";
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
  },
  {
    type: "select",
    name: "transpiler",
    message: "Which transpiler would you like to use ?",
    choices: [
      { title: "babel", value: "babel" },
      { title: "swc", value: "swc" },
    ],
  },
  {
    type: "confirm",
    name: "storybook",
    message: "Use Storybooks?",
    initial: false,
  },
];

const COMMON_FILES = path.resolve(__dirname, "../templates/common");
const CONFIG_SWC = path.resolve(__dirname, "../templates/config-swc");
const CONFIG_ESLINT = path.resolve(__dirname, "../templates/config-eslint");
const CONFIG_JEST = path.resolve(__dirname, "../templates/config-jest");
const CONFIG_STORYBOOK = path.resolve(
  __dirname,
  "../templates/config-storybook"
);
const CONFIG_TAILWIND = path.resolve(__dirname, "../templates/config-tailwind");

const CMD_INSTALL_DEPS = `npm install`;
const initGitCommand = `rm -rf .git && git init && git add . && git commit -m "Initialize project using Create React app swc"`;

const folder = path.resolve(process.cwd(), ".");

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

  // user has completed all prompts
  console.log(response); // => { value: 24 }

  const esjOptions = buildEsjOptions(response);
  console.log("esjOptions", esjOptions);

  console.log(`Creating a new React app ${repoName}`);
  copyDir(COMMON_FILES, folder, esjOptions);
  copyDir(CONFIG_SWC, folder, esjOptions);
  copyDir(CONFIG_ESLINT, folder, esjOptions);
  copyDir(CONFIG_JEST, folder, esjOptions);
  if (esjOptions.usesStorybook) {
    copyDir(CONFIG_STORYBOOK, folder, esjOptions);
  }
  copyDir(CONFIG_TAILWIND, folder, esjOptions);

  //   console.log(`Installing packages. This may take a couple of minutes.
  // `);
  //   const installedDeps = runCommand(CMD_INSTALL_DEPS);
  //   if (!installedDeps) {
  //     process.exit(-1);
  //   }
})();
