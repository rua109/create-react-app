const fs = require("fs");
const path = require("path");

export default function createAndSwitchToDirectory(newDirName: string): void {
  const currentDir: string = process.cwd(); // Get the current working directory

  // Create a new directory path
  const newDirPath: string = path.join(currentDir, newDirName);

  try {
    // Create the new directory
    fs.mkdirSync(newDirPath);

    // Change the current working directory to the new directory
    process.chdir(newDirPath);
  } catch (error: any) {
    console.error(
      `Error creating or switching to the directory: ${error.message}`
    );
  }
}
