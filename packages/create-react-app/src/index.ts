// const { copyDir } = require("./utils/copyDir");
import copyDir from "./utils/copyDir";
const path = require("path");
const prompts = require("prompts");

const questions = [
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
];

const SRC_FILES = path.resolve(__dirname, "../templates/common");
const folder = path.resolve(process.cwd(), ".");

console.log("common_files", SRC_FILES, folder);

(async () => {
  const response = await prompts(questions);

  console.log(response); // => { value: 24 }
  copyDir(SRC_FILES, folder);
})();
