const { execSync } = require("child_process");

export default function runCommand(command: string, { mute = false } = {}) {
  try {
    execSync(`${command}`, { stdio: mute ? "pipe" : "inherit" });
  } catch (e) {
    console.error(`Failed to execute ${command}`, e);
    return false;
  }
  return true;
}
