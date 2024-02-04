## Steps to import this library into another React Native Project

To use this library in another react native project, simply add it to its peer dependency and dev dependency.

## Steps to import this library into a web project

React Native libraries are currently only supported on `babel` transpiler. There is no support for `swc`

### React 18 projects

To import this library into a web project using React18; first install the following dependencies -

```
npm i react-native react-native-web
```

#### Bundler

Configure your module bundler to alias the package to react-native. For example, modify your webpack configuration as follows:

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

### React 17 projects

The newer versions of React Native depends on React18, so it is a bit more tricky to make it compatible with packages still using React 17

Install the following dependencies -

```
npm i react-native@0.68.7 react-native-web@0.18.12
```

Configure `webpack` as shown above
