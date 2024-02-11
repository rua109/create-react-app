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

### `react-native-svg`

> This section applies to web, expo and react native

react-native-svg provides SVG support to React Native on iOS, Android, macOS, Windows, and a compatibility layer for the web.

To install do -

```
npx install react-native-svg
```

> For native RN projects, run additional command
> `cd ios && bundle exec pod install`
