## Introduction

This is a collection of utility packages to manage creation of new React projects. The following packages are defined:

- `create-react-app`

## Building

The project uses `lerna` to manage the various utility packages in a mono repo.

To build all packages, do:

```
npx lerna run build
```

## Publishing package

To publish packages to npm, do

```
npm run publish
```

This will automatically run `prepublishOnly` script in the respective packages

## Testing

To test a package locally, it is sometimes easier to create a `tar.gz` and use it locally

```
npm run build
npm pack
```

and then using the generated archive. For e.g.

```
npx package.tgz
```
