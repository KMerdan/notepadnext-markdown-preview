# HTML Preview

Plugin `kmerdan.html-preview` serves HTML, JavaScript, CSS and a document API from a local Node.js HTTP service inside a native preview dock. It uses SDK `startLocalService`, `webviews.createService` and `registerRestorer`; the service lifetime belongs to plugin activation.

Use Node 24 from this directory:

```sh
npm ci --ignore-scripts --install-links
npm run build
npm test
npm run package -- ../../artifacts/html-local
```

The build copies the SDK service helper and public assets into `dist`. The installed package needs no extra npm installation or separately managed server. Register this directory's metadata, select Install Local Package in Discover, then enable and choose **Open HTML Preview**. Select HTML as the editor language to load unsaved HTML; use **Load active HTML buffer**, edit the preview source and press **Run preview** to execute its inline JavaScript. Remote origins are not available in this first version; same-service assets and `fetch` work, WebSocket transport is not implemented.

For native debugging, rebuild/repackage into a fresh output directory and use Installed → More → Update Local Package / Reload. Plugin Manager → Logs shows host/service activation errors. The simulated Markdown debug host does not implement native service WebEngine panels.

Hot update registers a replacement activation and service endpoint while keeping the existing dock. Its draft source, rendered preview and counter restore from `acquireVsCodeApi().setState`; position and scroll come from the host. Disabling or uninstalling closes the panel and disposes the HTTP server. Backend process memory is not migrated.

[SDK HTML service contract](../../tools/plugin-sdk/docs/HtmlService.zh-CN.md) · [restoration lifecycle](../../tools/plugin-sdk/docs/HotUpdate.zh-CN.md) · [repository registration and updates](../../README.md)

GPL-3.0-or-later; derived from the SDK HTML service example, with original license notices retained.
