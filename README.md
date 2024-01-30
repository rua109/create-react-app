## Introduction

This is a collection of utility packages to manage creation of new React projects. The following packages are defined:

- `create-react-app`

## Building

The project uses `lerna` to manage the various utility packages in a mono repo.

To build all packages, do:

```
npx lerna run build
```

To build a specific package, do:

```
npx lerna build --scope=package_name
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

and then go to the corresponding package folder and run

```
npm pack
```

This will create a bundle archive. Copy it to another location
and run following command to install the package

```
npx package.tgz
```

## Creating a new package

To create a new package, do

```
npx lerna create package-name
```
