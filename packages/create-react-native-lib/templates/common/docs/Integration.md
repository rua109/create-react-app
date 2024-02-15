## Integration steps

### `react-native` and `react-native-web`

> This section applies to only web projects

Note that this libraries are currently only supported on packages using the `babel` transpiler. There is no support for `swc`

To import this library into a web project using React18; first install the following dependencies -

```
npm i react-native react-native-web
```

> Note that since v0.69 react native depends on React18; so if you wish to use it in a web package still using React17, you will have to install an older version of react native
>
> npm i react-native@0.68.7 react-native-web@0.18.12

Next, configure your module bundler to alias the package to react-native. If you are using `webpack`; the configuration looks like follows:

```js
// webpack.config.js
module.exports = {
  // ...the rest of your config
  extensions: [..., ".web.js", ".js"],

  resolve: {
    alias: {
      "react-native$": "react-native-web",
    },
  },
};
```

### `metro-react-native-babel-preset`

> This section applies to only web projects

Install the following components

```sh
npm i -D metro-react-native-babel-preset babel-plugin-react-native-web
```

Next, modify `webpack.common.js` to compile react native packages that are
not compiled to ES5 before being published.

```js
const path = require("path");
const appDirectory = path.resolve(__dirname, ".");

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.(tsx|ts|jsx|js|mjs)$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, "src"),
    // add more components
  ],
  use: {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
      presets: ["module:metro-react-native-babel-preset"],
      // Re-write paths to import only the modules needed by the app
      plugins: ["react-native-web"],
    },
  },
};

module.exports = {
  ...
  module: {
    rules: [
-     {
-       test: /\.(ts|tsx|js|jsx)$/,
-       exclude: /node_modules/,
-       use: {
-         loader: "babel-loader",
-       },
-     },
+     babelLoaderConfiguration,
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        type: "asset/resource",
      },
    ],
  },
}
```

### `react-native-svg`

> This section applies to web, expo and react native

react-native-svg provides SVG support to React Native on iOS, Android, macOS, Windows, and a compatibility layer for the web.

To install do -

```
npx install react-native-svg
```

> For native RN projects, run additional command
> `cd ios && bundle exec pod install`

### `react-native-safe-area-context`

> This section applies to web, expo and react native

Run the following command

```
npm install react-native-safe-area-context
```

> For native RN projects, run additional command
> `cd ios && bundle exec pod install`

### `react-native-paper`

> This section applies to only web projects

For `web` add the following to `babelLoaderConfiguration` include

```js
path.resolve(appDirectory, "node_modules/react-native-vector-icons/"),
```
