# Notepad Next ++ Official Plugin Marketplace

Our first-party plugin catalog for [Notepad Next ++](https://github.com/KMerdan/notepad-next-plus-plus), maintained by KMerdan. **Markdown Preview and HTML Preview share this repository URL**, while their packages, versions and update lifecycles remain independent.

The original `notepadnext-markdown-preview` URL is retained so existing Markdown installations keep their trusted update source. This catalog is official for our fork; it is not an upstream NotepadNext marketplace.

## Register, install and update

Use the latest plugin-enabled Notepad Next ++ development build with WebEngine and Node 24 support. The host must support namespaced marketplace releases (`<plugin-id>/v<version>`).

1. **Plugins → Plugin Manager → Add Source…**: enter `https://github.com/KMerdan/notepadnext-markdown-preview` and leave Git ref empty.
2. Review **Notepad Next ++ Official Plugins** and its two entries. Registration only adds a source; it never installs or runs code.
3. In **Discover**, select **Markdown Preview** or **HTML Preview**, choose **Install…**, review its package and permissions, and confirm.
4. In **Installed**, enable that plugin, then use **Open Markdown Preview** or **Open HTML Preview** from the Plugins menu.

**Updates:** refresh this source (or Refresh Catalog), then update each plugin from Installed. The installed plugin can also check its repository independently. An enabled, open panel restores automatically after a successful hot update, including its dock/floating position, scroll and saved preview state. A failing activation rolls back to the previous package. More → Reload restarts the same version; Roll Back uses its retained predecessor.

**Uninstall:** removes that plugin's package and panel; data is retained unless you choose to delete it. The catalog entry remains available in Discover. Removing the source leaves installed plugins intact.

Existing `kmerdan.markdown-preview` installations retain their ID, origin and stored data. Refresh the same source to turn the old single-plugin listing into this marketplace. The local examples `notepadnext.markdown-preview` and `notepadnext.html-preview` are separate IDs; disable those examples if you install their marketplace counterparts.

| Plugin | ID | What it does |
| --- | --- | --- |
| [Markdown Preview](plugins/markdown-preview) | `kmerdan.markdown-preview` | TypeScript preview of the current unsaved Markdown buffer, with preserved scroll on update. |
| [HTML Preview](plugins/html-preview) | `kmerdan.html-preview` | An activation-owned local Node.js HTTP service renders HTML/JS inside a dock and retains draft source and counter state on update. |

## Develop

Node 24; no Qt compiler or editor source checkout is needed to build plugins. SDK **0.2.0** is an exact [Release tarball](https://github.com/KMerdan/notepadnext-plugin-sdk/releases/tag/v0.2.0) development dependency, fixed by URL and each plugin's npm lockfile integrity. SDK source is maintained in its own repository; no vendored SDK remains here. Both preview plugins retain host API **0.1** so the package split does not change existing callback behavior. Native selection/core tools use the SDK's separate API 0.2 entry.

```sh
npm run ci
```

This installs dependencies with scripts disabled, builds and tests both plugins, and checks that the root catalog exactly matches their metadata. Work on one plugin with `npm --prefix plugins/markdown-preview run build` or `npm --prefix plugins/html-preview run build`.

- [Markdown development and local debugging](plugins/markdown-preview/README.md)
- [HTML service development and native debugging](plugins/html-preview/README.md)
- [SDK guide](https://github.com/KMerdan/notepadnext-plugin-sdk/blob/v0.2.0/docs/GettingStarted.zh-CN.md), [API](https://github.com/KMerdan/notepadnext-plugin-sdk/blob/v0.2.0/docs/API.zh-CN.md), [panel restoration](https://github.com/KMerdan/notepadnext-plugin-sdk/blob/v0.2.0/docs/HotUpdate.zh-CN.md)
- [Independent release maintenance](docs/Releases.md)

GPL-3.0-or-later. The SDK and examples derive from NotepadNext / Notepad Next ++; upstream copyright notices and licenses are retained. Runtime third-party dependencies and their licenses are included in release packages.

## Repository ownership

[Application](https://github.com/KMerdan/notepad-next-plus-plus): editor/native services, runtime and UI. [SDK](https://github.com/KMerdan/notepadnext-plugin-sdk): API/contracts/templates/tooling. This Marketplace: first-party plugin source, metadata list and independent packages. SDK version, catalog version and plugin versions do not need to advance together. The shared manifest filename and original repository URL are retained intentionally.
