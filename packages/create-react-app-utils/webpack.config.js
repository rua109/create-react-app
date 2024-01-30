const path = require("path");

module.exports = {
  mode: "production",
  target: "node",
  entry: {
    main: "./src/index.ts",
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  output: {
    library: {
      name: "createReactAppUtilsLib",
      type: "umd",
    },
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "lib/module"),
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
        },
      },
    ],
  },
};
