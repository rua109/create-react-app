const fs = require("fs");
const ejs = require("ejs");
const path = require("path");

const BINARIES = [
  /(gradlew|\.(jar|keystore|png|jpg|gif))$/,
  /\$\.yarn(?![a-z])/,
];

export default function copyDirApplyingEjsTransforms(
  source: string,
  destination: string,
  options: any
) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  // Read the contents of the source directory
  const files = fs.readdirSync(source);

  // Loop through each file in the source directory
  files.forEach((file: any) => {
    const sourcePath = path.join(source, file);
    let destinationPath = path.join(destination, file);
    const isEjsFile = path.extname(file) === ".ejs"; // Check if the file has a .ejs extension

    // Check if the current item is a file or a directory
    if (fs.statSync(sourcePath).isDirectory()) {
      // If it's a directory, recursively copy it
      copyDirApplyingEjsTransforms(sourcePath, destinationPath, options);
    } else if (!BINARIES.some((r) => r.test(file))) {
      // Read the content of the file
      let content = fs.readFileSync(sourcePath, "utf-8");

      if (isEjsFile) {
        // apply ejs transforms
        content = ejs.render(content, { options });
        // Remove the .ejs extension
        destinationPath = destinationPath.replace(/\.ejs$/, "");
      }

      // Write the transformed content to the destination
      fs.writeFileSync(destinationPath, content);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  });
}
