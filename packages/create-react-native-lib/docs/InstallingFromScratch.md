## Configuring `npm` and creating a `package.json`

Ensure that `node` in installed on your local machine. Run the following command to verify

```
node --version
```

Run the following command.

```
npm init
```

Fill in the following props -

```
package name: (create-react-native-lib) @rua109/create-react-native-lib
version: (1.0.0) 0.0.1
description: Create a blank template for react native libraries
entry point: (index.js) src/index.tsx
test command:
git repository: (https://github.com/rua109/create-react-native-lib.git)
author: Rohan Abraham
license: (ISC) MIT
```

## Install `react-native-bob`

We are using `bob` to transpile the code. You will find that, unlike typical projects, we are not using a bundler here. We will let the bundler from the client project do the bundling. This is because we will be using `metro` to bundle `react-native` and `webpack` for `web`

```
npm i -D react-native-builder-bob
```

In `package.json` make sure the target to build for is specified -

```
"react-native-builder-bob": {
  "source": "src",
  "output": "lib",
  "targets": [
    "commonjs",
    "module",
    "typescript",
  ]
}
```

Make sure `prepare` is properly set -

```
"scripts": {
  "prepare": "bob build"
}
```

Make sure the entry points are properly configured -

```
"main": "lib/commonjs/index.js",
"module": "lib/module/index.js",
"react-native": "src/index.tsx",
"types": "lib/typescript/src/index.d.ts",
"source": "src/index.tsx",
"files": [
  "lib",
  "src",
  "!**/__tests__",
  "!**/__fixtures__",
  "!**/__mocks__"
]
```

Here is what each of these fields mean:

- main: The entry point for the commonjs build. This is used by Node - such as tests, SSR etc.
- module: The entry point for the ES module build. This is used by bundlers such as webpack.
- react-native: The entry point for the React Native apps. This is used by Metro. It's common to point to the source code here as it can make debugging easier.
- types: The entry point for the TypeScript definitions. This is used by TypeScript to type check the code using your library.
- source: The path to the source code. It is used by react-native-builder-bob to detect the correct output files and provide better error messages.
- files: The files to include in the package when publishing with npm.

Add the output directory to .gitignore and .eslintignore

```
# generated files by bob
lib/
```

## `Typescript`

`bob` does not come with a compiler. Install typescript compiler.

```sh
npm install --save-dev typescript @types/node @types/react @types/jest
```

Put all `bob` specific settings in `@tsconfig/react-native-bob/tsconfig.json`

```
{
  "compilerOptions": {
    "allowUnreachableCode": false,
    "allowUnusedLabels": false,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "jsx": "react",
    "lib": ["esnext"],
    "module": "esnext",
    "moduleResolution": "node",
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noImplicitUseStrict": false,
    "noStrictGenericChecks": false,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "esnext",
    "verbatimModuleSyntax": true
  }
}
```

Create `tsconfig.json`

```
{
  "extends": "./@tsconfig/react-native-bob/tsconfig.json",
  "compilerOptions": {
    "rootDir": "."
  }
}
```

## Install `react-native`

Install `react-native` as a peerDependency

```
npm i -D react react-native
```

Then inside `package.json`, add

```
  "peerDependencies": {
    "react": ">18.0.0",
    "react-native": ">0.68.0"
  },
```

## Create sample src file

Create a file called `src/SampleNativeComponent/index.tsx` add add following to it -

```
import React from "react";
import { Button } from "react-native";

export default function SampleNativeComponent({ children, ...rest }: any) {
  return <Button {...rest}>{children}</Button>;
}

```

Create a file called `src/index.tsx` add following to it -

```
import SampleNativeComponent from "./SampleNativeComponent";

export { SampleNativeComponent };
```

Test that the source file is compiling -

```
npm run prepare
```

## Storybook

Run the following command in `example`

```
npx storybook@latest init
```
