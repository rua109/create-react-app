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
];

const COMMON_FILES = path.resolve(__dirname, "../templates/common");

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

  spinner.succeed(
    `Project created successfully at ${kleur.yellow(repoName)}!\n`
  );
})();
