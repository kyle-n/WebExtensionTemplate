# WebExtensionTemplate

Create a browser extension for Chrome, Firefox and Safari in no time.

WebExtensionTemplate lets you skip the boilerplate and write a [Web Extension](https://developer.mozilla.org/en-US/docs/Glossary/WebExtensions) with [TypeScript](https://www.typescriptlang.org) and [Svelte](https://www.typescriptlang.org).

## Features

- Popup window written in Svelte when you click the extension toolbar icon 
- Extension settings page written in Svelte
- Lightning-fast build process to compile TypeScript and Svelte source with [esbuild](https://esbuild.github.io)
- Build scripts to compile for Chrome, Firefox and Safari
- Sourcemaps for local builds
- Minifies production builds
- iOS and macOS container apps written in SwiftUI for the Safari extension (no Swift / SwiftUI knowledge required to use)
- [Prettier](https://prettier.io) formatting
- [webextension-polyfill](https://www.npmjs.com/package/webextension-polyfill) to add a couple missing Promise-based APIs to Chrome

### Future roadmap

- Separate branch with the popup and settings page written in React
- Tests

## Setup

First, fork this repository. Then, follow the steps below. By the end of this, you should be able to search across the project for `REPLACEME` and get no results.

### All browsers

- Update `Extension/_locales/en/messages.json` with an extension name and description
- Update `Extension/README.md` with your app's name
- Open `Extension/package.json` and update...
	- `name` with your app's name
	- `author` with your name
	- `license` with the app's license
- Open `Extension/public/settings.html` and update the `<title>` with your app's name
- Delete the `<link>` in `Extension/settings.html` if you don't like the provided CSS
- Create a toolbar icon for your app
	- Should be a small, simple glyph that makes sense when monochromatic in Safari
	- Make versions in 16, 19, 32, 38, 48 and 72-pixel sizes saved to `Extension/images`
	- Should be named `toolbar_Qpx.png` where `Q` is 16, 19, etc
- Make an app icon that is 1024 x 1024
	- Copy versions of it to `Extension/images` in 48, 96, 128, 256 and 512-pixel sizes 
	- Should be named `app_icon_Qpx.png` , where `Q` is 48, 96, etc

### Firefox

- Update `manifest.json` with a Firefox extension id (under `gecko` > `id`) in the format `appname@domain.com` 

### Safari

Do the following steps in Xcode.

Note: “Open the project config” means double-click the app name at the top of the file view in Xcode.

- [Change the Safari app name to your app’s name](https://stackoverflow.com/a/20418989)
- Open `Shared (App)/Models.swift` and update `APP_NAME` with your app's name
- Create a new bundle identifier in the format `com.domain.App-Name` 
	- Open the project config and go to `AppName (iOS)` > Signing & Capabilities and update the bundle id
	- Repeat for the macOS app
- Create a new bundle identifier. It should be your app bundle identifier with `.Extension` added onto the end. So if your app bundle ID is `com.domain.App-Name`, this should be `com.domain.App-Name.Extension`
	- Open the project config and go to `AppName Extension (iOS)` > Signing & Capabilities and update the bundle id with the extension bundle id
	- Repeat for the macOS extension
	- Update `MAC_EXTENSION_BUNDLE_ID` in `Shared (App)/Models.swift` with the extension bundle ID as well
- Update `macOS (App)/AppDelegate.swift` with a help documentation link
- Under project config > Signing & Capabilities, set the team for both apps and both extensions
- Under project config > General, update the display name for iOS and macOS
- Rename both files named `REPLACEME.entitlements` to be `Your App Name.entitlements` 
	- Open the project config and to go to App Name (macOS) > Build Settings and find the setting for “Code Signing Entitlements.” Replace `REPLACEME.entitlements` with the name of your new entitlements file
	- Repeat for App Name Extension (macOS) > Build Settings > Code Signing Entitlements
- Open the project config and go to App Name Extension (macOS) > Build Settings and find the setting for “Bundle Display Name.” Update its value with your app’s name
	- Repeat for App Name Extension (iOS)
- Go to Product > Schemes > Manage Schemes… and update the iOS and macOS schemes with your app’s name
- iOS app icon:
	- Add the app icon to  `iOS (App)/iOS Assets` as `AppIcon` with all the required sizes
	- Add a copy of the app icon named `Icon.png` in `Shared (App)/Resources` 
- macOS app icon
	- Reduce the size of the app icon by 20% while keeping the canvas the same size
	- Add the app icon to `macOS (App)/macOS Assets` as `AppIcon` with all the required sizes

## Building your extension

All `npm` commands should be run in `Extension`. Safari extensions should be built in Xcode. 

| browser | local | production |
| - | - | - |
| Chrome | `npm run build` | `npm run build:chrome` |
| Firefox | `npm run build` | `npm run build:firefox` |
| Safari | Product > Build | Product > Archive |

- `console.log` calls are stripped out of prod builds
- The Chrome build script generates a zip that can be uploaded to the Chrome Web Store
- The Firefox build script generates a zip for the Mozilla Add-On Store as well as a zip of the source code for the store review

## Other notes 

- Firefox [does not support service workers in the background](https://github.com/mozilla/web-ext/issues/2532#issuecomment-1285039773), so I would maintain a separate branch `firefox` that runs `dist/background.js` as a background script