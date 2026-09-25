# AAG - Design Tweaker

Adjust Obsidian's appearance from one settings panel, including the file explorer, tabs, note text and scrollbars.

## Features and settings

| Settings group | Controls |
|---|---|
| General | Enable/disable the redesign and reset defaults. |
| File explorer | Spacing, type size, folder/file colors, borders, collapse icons, badges, indentation guides and selection. |
| Active file | Highlight colors for light/dark themes, text weight and borders. |
| Tabs | Tab title sizing, pane titles, width, alignment, light/dark colors and highlight mode. |
| Dataview tables | Direction, alignment, width, layout and wrapping of Dataview tables. |
| Notes | Font sizing for editor/reading views, headings and inline titles, with view-scope controls. |
| Status bar | Hover, dim or hidden behavior. |
| Scrollbars | Markdown content scrollbar thickness, colors and visibility. |
| Sidebar icon | Hide a sidebar tab by its accessible label. |

## Usage and commands

Open **Settings → AAG - Design Tweaker** and expand the group you want to adjust. Changes are saved through Obsidian's plugin settings. Use the General switch to disable the redesign; use Reset everything to restore defaults. The command palette includes **Open Design Tweaker settings**, which opens this plugin’s settings tab.

The plugin ships its stylesheet and applies settings through CSS variables, classes and related UI behavior. No separate snippet folder or bundling step is needed. Dataview styling affects tables when Dataview is installed; it does not install Dataview or provide its queries.

## Compatibility and troubleshooting

The public package targets Obsidian 1.13.7+. Styling depends on Obsidian's UI selectors and may interact with themes/snippets. It does not alter note contents. The manifest permits mobile, but mobile layout and every theme combination have not been independently GUI-tested. The compatibility baseline is supported by host API inspection and settings/unit checks, not a claim of exhaustive visual testing.

For unwanted appearance, turn off General first, then isolate the relevant settings group. Disable overlapping snippets or test with the default theme. Reset defaults if saved preferences are malformed. Existing plugin IDs and settings keys are preserved, including migration of supported legacy settings.

## Installation

Requires Obsidian **1.13.7 or newer**. This first public package uses a conservative minimum host version; older versions are not claimed as supported. The plugin has no account or subscription requirement.

### Manual installation

1. Open this repository's **Releases** page and choose a published release.
2. Download the individual `main.js`, `manifest.json` and `styles.css` assets, not the automatic source archive.
3. Create `<vault>/.obsidian/plugins/aag-design-tweaker/` and copy those three files into it.
4. Enable community plugins in Obsidian, then enable **AAG - Design Tweaker**.

Until a release is published, build the source as described below to obtain the same files.

### BRAT

Install and enable [BRAT](https://github.com/TfTHacker/obsidian42-brat). Run its **Add a beta plugin for testing** command, paste this repository's GitHub URL, and add the plugin. Enable it in Community plugins. BRAT requires a published GitHub release with the plugin assets; local preparation alone is not an end-to-end BRAT installation test.

## Updating

Use BRAT's update command, or replace only the three runtime files from a newer release. Preserve your existing settings and vault notes. Disable/re-enable the plugin or restart Obsidian after a manual update. The plugin ID is stable, so the installation directory stays the same. Older Obsidian users should keep their current installation until they can upgrade the host. The compatibility map contains only published-version candidates from this repository, not unavailable historical releases.

## Development

Use Node.js **22.22.1** (CI baseline) or a compatible newer Node 22+ installation, and npm.

```sh
npm ci --ignore-scripts
npm run verify
```

`verify` runs manifest/package/versions checks, JavaScript syntax checks, the build, tests, exact release-asset validation and a redacted privacy/secret-pattern scan. This project uses JavaScript; syntax validation is not a TypeScript typecheck. `dist/release/` contains exactly `main.js`, `manifest.json` and `styles.css`; its checksums are printed by the staging command. Do not add local settings or install dependencies inside a release package.

```sh
npm run check
npm test
npm run build
npm run release:stage
npm run release:check
npm run scan
```

See [validation and compatibility](docs/validation.md) for the limits of automated tests and [release maintenance](docs/releases.md) for the release process.

## Troubleshooting and issues

Confirm the plugin files are in the directory matching the manifest ID and that the host meets the minimum version. Reload the plugin after updating. For a reproducible problem, open an issue using this repository's **Issues** tab with the plugin/Obsidian versions, operating system, view mode and a minimal synthetic example. Do not include private vault notes, settings exports, usernames, access tokens or diagnostic captures containing personal data.

## License

AAG-owned code is licensed under [MIT](LICENSE). Obsidian is a separately supplied host application, not distributed by this repository.

Root `main.js` is readable authored source. There are no npm runtime/build dependencies or bundler. The build validates and copies the three runtime files deterministically. Tests exercise settings defaults, normalization, legacy migration and packaging failure cases. Project CSS is AAG-owned; no third-party implementation, font or icon bundle is distributed by this plugin.

## Privacy and network use

This plugin does not use telemetry, analytics, accounts, or remote network services. It only changes interface styling and stores its settings through the Obsidian plugin data API.

## 1.1.12 hardening

Version 1.1.12 scopes explorer CSS more narrowly, improves keyboard/focus accessibility for the custom scrollbar and status bar, hardens drag cleanup, and reduces high-frequency settings writes and fallback polling.
