# Notepad Next ++ Official Plugin Marketplace

Our first-party plugin catalog for [Notepad Next ++](https://github.com/KMerdan/notepad-next-plus-plus), maintained by KMerdan. **Markdown Preview and HTML Preview share this repository URL**, while their packages, versions and update lifecycles remain independent.

The repository is now `notepadnext-plugin-marketplace`. This catalog is official for our fork; it is not an upstream NotepadNext marketplace.

## Register, install and update

Use Notepad Next ++ 0.15.2 or later with WebEngine and the bundled Node 24 runtime. Releases are independent, namespaced by plugin ID (`<plugin-id>/v<version>`).

1. **Plugins → Plugin Manager → Add Source…**: enter `https://github.com/KMerdan/notepadnext-plugin-marketplace` and leave Git ref empty.
2. Review **Notepad Next ++ Official Plugins** and its entries. Registration only adds a source; it never installs or runs code.
3. In **Discover**, select either preview, choose **Install…**, review its package and permissions, and confirm.
4. In **Installed**, enable that plugin, then use the plugin’s command from the Plugins menu.

**Updates:** refresh this source (or Refresh Catalog), then update each plugin from Installed. The installed plugin can also check its repository independently. An enabled, open panel restores automatically after a successful hot update, including its dock/floating position, scroll and saved preview state. A failing activation rolls back to the previous package. More → Reload restarts the same version; Roll Back uses its retained predecessor.

**Uninstall:** removes that plugin's package and panel; data is retained unless you choose to delete it. The catalog entry remains available in Discover. Removing the source leaves installed plugins intact.

Installations registered from the old `notepadnext-markdown-preview` repository need a one-time uninstall and reinstall from the new URL. Package origins and data storage are source-specific; the rename does not silently migrate them. Keep data when uninstalling if you want to retain the old source’s files. Local examples with IDs `notepadnext.markdown-preview` or `notepadnext.html-preview` are separate plugins; disable them if you install their marketplace counterparts.

| Plugin | ID | What it does |
| --- | --- | --- |
| [Markdown Preview](plugins/markdown-preview) | `kmerdan.markdown-preview` | TypeScript preview of the current unsaved Markdown buffer, with preserved scroll on update. |
| [HTML Preview](plugins/html-preview) | `kmerdan.html-preview` | A tab-owned local Node.js service renders the unsaved HTML/JS document directly, with per-tab browser state and hot-update restoration. |
| [SDK Example: Text Inspector](examples/text-inspector) | `kmerdan.text-inspector` | Bounded native selection inspection, metadata and reveal; API 0.3. |
| [SDK Example: TODO Navigator](examples/todo-navigator) | `kmerdan.todo-navigator` | Native search, owned highlights and a query/scroll-restoring HTML panel; API 0.3. |

Text Inspector and TODO Navigator are developer examples, not part of the default product catalog. Register their individual metadata to inspect the APIs they demonstrate. Preview behavior is documented in [Preview lifecycle](docs/PreviewLifecycle.md).

## Develop

Node 24; no Qt compiler or editor source checkout is needed. All four plugins consume the exact SDK **0.3.1** [Release tarball](https://github.com/KMerdan/notepadnext-plugin-sdk/releases/tag/v0.3.1), with URL and integrity fixed by their lockfiles. Each declares native API **0.3** and uses captured command invocations. There is no vendored SDK or old API profile.

```sh
npm run ci
```

This installs dependencies with scripts disabled, builds and tests all four plugins, and checks that the default catalog contains only the two production previews. Work on one plugin with `npm --prefix plugins/markdown-preview run build` or `npm --prefix plugins/html-preview run build`.

- [Markdown development and local debugging](plugins/markdown-preview/README.md)
- [Native enhancements development and verification](docs/NativeEnhancements.zh-CN.md)
- [HTML service development and native debugging](plugins/html-preview/README.md)
- [SDK guide](https://github.com/KMerdan/notepadnext-plugin-sdk/blob/v0.3.1/docs/GettingStarted.zh-CN.md), [API](https://github.com/KMerdan/notepadnext-plugin-sdk/blob/v0.3.1/docs/API.zh-CN.md), [panel restoration](https://github.com/KMerdan/notepadnext-plugin-sdk/blob/v0.3.1/docs/HotUpdate.zh-CN.md)
- [Independent release maintenance](docs/Releases.md)

GPL-3.0-or-later. The SDK and examples derive from NotepadNext / Notepad Next ++; upstream copyright notices and licenses are retained. Runtime third-party dependencies and their licenses are included in release packages.

## Repository ownership

[Application](https://github.com/KMerdan/notepad-next-plus-plus): editor/native services, runtime and UI. [SDK](https://github.com/KMerdan/notepadnext-plugin-sdk): API/contracts/templates/tooling. This Marketplace: first-party plugin source, metadata list and independent packages. SDK version, catalog version and plugin versions do not need to advance together. The canonical repository name is `notepadnext-plugin-marketplace`. The metadata filename and plugin IDs stay stable.

## Preview lifetime

Open a preview manually on a matching editor tab. One dock follows matching tabs, keeps per-tab browser state, hides on other file types, and closes when the last matching source tab closes. Closing the dock keeps it closed until another explicit Open command. Full HTML renders the source document itself; no demo toolbar or source editor is inserted. Relative CSS/JS/images resolve within the source file directory.

Text Inspector and TODO Navigator are SDK development examples, not polished production tools. They live under `examples/` and are excluded from the default Discover catalog. Their purpose is to demonstrate native selection, search and owned highlights; their tests belong to this repository and the SDK.

Existing installations from the old repository origin must be uninstalled and installed from the new canonical source once. Retain plugin data when uninstalling if desired; source-isolated data is not silently moved between origins. New installations and subsequent updates use the new URL.
