# Contributing

## Development workflow

This project contains the following packages:

- The library package in the root directory.
- An example app in the `example/` directory.

To get started with the project, run `npm i` in the root and example directories to install the required dependencies for each package:

```sh
npm i
cd example
npm i
```

The [example app](/example/) demonstrates usage of the library. You need to run it to test any changes you make.

It is configured to use the local version of the library, so any changes you make to the library's source code will be reflected in the example app. Changes to the library's JavaScript code will be reflected in the example app without a rebuild, but native code changes will require a rebuild of the example app.

To run commands in `example`; you need to first cd to it

```sh
cd example
```

To start the packager:

```sh
npm run start
```

To run the example app on Android:

```sh
npm run android
```

To run the example app on iOS:

```sh
npm run ios
```

To run the example app on Web:

```sh
npm run web
```

## Adding a new dependency

To add a new dependency do

```
npx expo install <package_name>
```

# Integration

## Steps to import this library into another library package

To use this library in another react native package, simply add it to its peer dependency and dev dependency.

## Steps to import this library into a web package

Note that this libraries are currently only supported on packages using the `babel` transpiler. There is no support for `swc`

To import this library into a web package using React18; first install the following dependencies -

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
