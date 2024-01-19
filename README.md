## Introduction

This is a collection of utility packages to manage creation of new React projects. The following packages are defined:

- `create-react-app`

## Commands

The project uses `lerna` to manage the various utility packages in a mono repo.

To transpile all packages, do:

```
npx lerna run prepare
```

To view package dependency graph do:

```
npx nx graph
```

## Publishing package

```
npm run publish
```
