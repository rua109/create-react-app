# Basic setup

### `@babel/core`

Install dependencies to compile ES6 typescript code

```bash
npm i --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript
```

### `@babel/plugin-transform-runtime`

Babel uses very small helpers for common functions such as \_extend. By default this will be added to every file that requires it. This duplication is sometimes unnecessary, especially when your application is spread out over multiple files.

This is where the @babel/plugin-transform-runtime plugin comes in: all of the helpers will reference the module @babel/runtime to avoid duplication across your compiled output. The runtime will be compiled into your build.

```bash
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime
```

See [here](https://babeljs.io/docs/en/babel-plugin-transform-runtime) for more details

---

Add following to `.babelrc

```json
{
  "presets": [
    "@babel/preset-typescript",
    "@babel/preset-react",
    "@babel/preset-env"
  ],
  "plugins": [["@babel/transform-runtime"]]
}
```

---

## `webpack`

Install basic webpack components

```bash
npm i --save-dev webpack webpack-cli webpack-dev-server
```

Install webpack plugins to manage split configurations

```bash
npm i --save-dev clean-webpack-plugin webpack-merge
```

## `html-webpack-plugin`

The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation (cache busting). You can either let the plugin generate an HTML file for you, supply your own template using lodash templates, or use your own loader.

```bash
npm install --save-dev html-webpack-plugin
```

## `terser-webpack-plugin`

This plugin uses terser to minify/minimize your JavaScript.

Webpack v5 comes with the latest terser-webpack-plugin out of the box

---

Create following files:

`package.json`

```json
  "scripts": {
    "start": "webpack-dev-server  --config webpack.dev.js --open",
    "build": "webpack --config webpack.prod.js",
  },
```

`webpack.common.js`

```js
module.exports = {
  entry: {
    main: './src/index.js',
  },
};
```

`webpack.dev.js`

```js
const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
});
```

`webpack.prod.js`

```js
const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
    ],
  },
  plugins: [new CleanWebpackPlugin()],
});
```

---

## `babel-loader`

This package allows transpiling JavaScript files using Babel and webpack.

```bash
npm i --save-dev babel-loader
```

## `react`

Install react

```sh
npm i react react-dom
```

---

`webpack.common.js`

```js
module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
```

---

## `postcss`

Loader to process css with `PostCSS`

```sh
npm install --save-dev postcss-loader postcss
```

Install other `css` loaders

```sh
npm install --save-dev style-loader css-loader
```

## `mini-css-extract-plugin`

By default the `css` is part of the `javascript` bundle. This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.

```sh
npm install --save-dev mini-css-extract-plugin
```

## `css-minimizer-webpack-plugin`

This plugin uses cssnano to optimize and minify your CSS.

```sh
npm install css-minimizer-webpack-plugin --save-dev
```

---

`webpack.dev.js`

```js
module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [
          'style-loader', //3. Inject styles into DOM
          'css-loader', //2. Turns css into commonjs
          'postcss-loader', //1. Turns sass into css
        ],
      },
    ],
  },
});
```

`webpack.prod.js`

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })],
  module: {
    rules: [
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css into files
          'css-loader', //2. Turns css into commonjs
          'postcss-loader', //1. Turns sass into css
        ],
      },
    ],
  },
});
```

## `autoprefixer`

A `postCSS` plugin that adds vendor prefixes to CSS rules using autoprefixer

```sh
npm install --save-dev autoprefixer
```

## `tailwindcss`

Install tailwindcss and its peer dependencies via npm, and then run the init command to generate both tailwind.config.js and postcss.config.js.

```sh
npm install -save-dev tailwindcss
npx tailwindcss init -p
```

## `postcss-import`

This plugin allows use of `@import` statements in css

```sh
npm install -D postcss-import
```

## `@tailwindcss/nesting`

This plugin allows nesting css styles

```sh
npm install -D @tailwindcss/nesting
```

Add the paths to all of your template files in your tailwind.config.js file.

`tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

`src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`postcss.config.js`

```js
const importer = require('postcss-import');
const nesting = require('@tailwindcss/nesting');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [importer, nesting, tailwindcss, autoprefixer],
};
```

## `eslint`

1. `npm install eslint --save-dev` - install the latest `eslint` package version.

2. `npx eslint --init` - set up a configuration file for `eslint`. This command will ask you a few questions via CLI. Here's a list of them, and the answers we'll need to choose (`✔` and `❯` symbols indicate the selected answers):

```bash
# question 1:
? How would you like to use ESLint? …
  To check syntax only
  To check syntax and find problems
❯ To check syntax, find problems, and enforce code style

# question 2:
? What type of modules does your project use? …
❯ JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these

# question 3:
? Which framework does your project use? …
❯ React
  Vue.js
  None of these

# question 4 (select "Yes" because we are using Typescript):
? Does your project use TypeScript? › No / Yes

# question 5:
? Where does your code run? …
✔ Browser
  Node

# question 6:
? How would you like to define a style for your project? …
❯ Use a popular style guide
  Answer questions about your style
  Inspect your JavaScript file(s)

# question 7 (we'll rely on Airbnb's JavaScript style guide here):
? Which style guide do you want to follow? …
❯ Standard: https://github.com/standard/standard
  Google: https://github.com/google/eslint-config-google

# question 8:
? What format do you want your config file to be in? …
  JavaScript
  YAML
❯ JSON

# the final prompt here is where eslint will ask you if you want to install all the necessary dependencies. Select "Yes" and hit enter:

✔ Which package manager do you want to use? · npm

Installing eslint-plugin-react@latest, eslint-config-standard-with-typescript@latest, @typescript-eslint/eslint-plugin@^5.0.0, eslint@^8.0.1, eslint-plugin-import@^2.25.2, eslint-plugin-n@^15.0.0, eslint-plugin-promise@^6.0.0, typescript@*

? Would you like to install them now with npm? › No / Yes
```

## `typescript`

To make `eslint` work with `typescript`, we need to install `typescript`.

```sh
npm install --save-dev typescript @types/node @types/react @types/react-dom @types/jest
```

## `@tsconfig/create-react-app`

A base TSConfig for working with Create React App.

```sh
npm install --save-dev @tsconfig/create-react-app
```

`tsconfig.json`

```json
// prettier-ignore
{
  "extends": "@tsconfig/create-react-app/tsconfig.json",     
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    "noImplicitAny": false,

    /* Completeness */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}
```

---

As a result, you'll end up having a `.eslintrc.json` file in the root of your project, which looks like so (we'll modify it a little bit later on):

```json
{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": ["plugin:react/recommended", "standard-with-typescript"],
  "overrides": [],
  "parserOptions": {
    "project": ["tsconfig.json"],
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react"],
  "rules": {},
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

## `eslint-plugin-jsdoc`

```
npm i --save-dev eslint-plugin-jsdoc
```

## `eslint-plugin-react-hooks`

```
npm install eslint-plugin-react-hooks --save-dev
```

Add following to `.eslintrc.json`

```json
{
  "plugins": ["react", "react-hooks"],
  "extends": [/*...*/ "plugin:jsdoc/recommended"],
  "rules": {
    "@typescript-eslint/semi": "off",
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/space-before-function-paren": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "semi": "off",
    "comma-dangle": "off",
    "space-before-function-paren": "off",
    "jsdoc/require-returns": 0,
    "jsdoc/check-tag-names": ["error", { "definedTags": ["format"] }],
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
  }
}
```

## `prettier`

```bash
npm install --save-dev eslint-plugin-prettier
npm install --save-dev --save-exact prettier
npm install --save-dev eslint-config-prettier
```

Then in `.eslintrc.json`

```json
{
  "extends": ["plugin:prettier/recommended"]
}
```

Add following to `.prettierrc.json`

```json
{
  "bracketSpacing": true,
  "singleQuote": true,
  "trailingComma": "all",
  "endOfLine": "lf",
  "jsxBracketSameLine": false,
  "printWidth": 80,
  "tabWidth": 2
}
```

## `storybook`

Use the Storybook CLI to install it in a single command.

```sh
npx storybook init
```

## `jest`

Install `jest` packages

```sh
npm install --save-dev jest babel-jest react-test-renderer
```

## `react-testing-library`

React Testing Library builds on top of DOM Testing Library by adding APIs for working with React components.

```sh
npm install --save-dev @testing-library/react
```

## `jest-dom`

jest-dom is a companion library for Testing Library that provides custom DOM element matchers for Jest

```sh
npm install --save-dev @testing-library/jest-dom
```

## `ModuleFederationPlugin`

Define remote dependencies

`webpack.common.js`

```js
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        GoorinApp: 'GoorinApp@http://localhost:3000/remoteEntry.js',
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
  ],
};
```

`tsremote.d.ts`

```js
declare module 'GoorinApp/TextView';
```

## `msw`

Install `msw` addon for storybooks. This should also install `msw`

```sh
npm i msw -D
```

Execute the init command of the Mock Service Worker CLI

```sh
npx msw init .msw-public/ --save
```

Enable MSW in Storybook by initializing MSW in `./storybook/preview.js`

```js
const { worker } = require('../src/mocks/browser');
worker.start();
```

Add the location of `msw`'s `mockServiceWorker.js` as a staticDir location for `storybook` in `.storybook/main.js`

```js
const storybookConfig = {
  ...
  staticDirs: [..., '../.msw-public'],
};
```

Enable MSW in the Development mode by making `.msw-public` to be a static path

```js
module.exports = {
  ...
  devServer: {
    static: {
      directory: path.resolve(__dirname, '.msw-public'),
    },
  },
  ...
}
```

and adding the following in `App.tsx`

```js
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start();
}
```
