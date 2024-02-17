# Contributing

## Prerequisites

### Watchman

You will need watchman installed on your system to run this application

For windows

```
PS C:\ choco install watchman
```

For mac

```
watchman --version  <-- check if watchman is installed
brew update
brew install watchman
```

### Expo Go

If testing on an actual device, make sure `Expo Go` app is installed on it.

## Getting started

This project contains the following packages:

- The library package in the root directory.
- An example app in the `example/` directory.
- A react17 compat app in `example-react17/` directory.

The example app is an expo app, and launches storybook.

```
cd react-native-design-system
npm i
cd example
npm i
npm run start  <--- launches storybook
cd ..
nd example-react17
npm i
npm run start  <--- launches storybook (react17)
```

To view the storybook on an actual device; make sure the `Expo Go` app is installed on the device.

## Adding a new dependency

When adding a library `dependency` use the following command to install the version that is compatible with expo:

```
npx expo install <package_name>
```

> If this package requries a react native link step (i.e. `pod install`); rather than installing it as a `dependency`, add it as a `peerDependency` and `devDependency`. Otherwise it will not work when integrating with react native apps.

## Integrating with an app

See `docs/Integration.md`
