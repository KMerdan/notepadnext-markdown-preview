# HTML Preview

`kmerdan.html-preview` renders the active unsaved HTML document directly inside a native preview dock, including inline JavaScript and relative CSS, JS and images. It uses SDK 0.3.2, `previews.getSource`, `startLocalService`, `webviews.createService`, `reloadSource` and a panel restorer. App 0.15.2 or later is required.

Use Node 24 from this directory:

```sh
npm ci --ignore-scripts --install-links
npm run build
npm test
npm run package -- ../../artifacts/html-local
```

The build copies the SDK service helper into `dist`. Installed packages need no npm installation or separately managed server. Register this directory’s metadata, select Install Local Package in Discover, enable it, then choose **Open HTML Preview** on an HTML tab. Opening a file alone never opens the preview. Edits update the page after a short debounce. There is no second source editor or demo toolbar.

One shared dock follows matching active tabs, keeping independent browser state and scroll. It hides on nonmatching tabs. Closing the dock or the last matching tab stops the preview and its HTTP service; another explicit Open starts a new session. Hot updates restore only live panels, their position and their source mappings. JavaScript heap/backend memory is not migrated; pages can persist JSON state with `acquireNotepadNextApi().setState`.

Relative assets are limited to the canonical source directory, an allowlist of types and 16 MiB per file. Escaping paths/symlinks and external origins are blocked. Same-service `fetch` works; WebSocket transport is not implemented.

For native debugging, rebuild/repackage into a fresh output directory, uninstall the old development package while retaining data, then install the new local package. Reload uses the installed package, not edits in your source checkout. Plugin Manager → Logs shows activation errors. The simulated debug host does not implement native service WebEngine panels.

[SDK HTML service contract](https://github.com/KMerdan/notepadnext-plugin-sdk/blob/v0.3.2/docs/HtmlService.zh-CN.md) · [lifecycle](../../docs/PreviewLifecycle.md) · [repository registration and updates](../../README.md)

GPL-3.0-or-later; derived from the SDK HTML service example, with original license notices retained.
