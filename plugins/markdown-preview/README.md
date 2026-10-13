# Markdown Preview

TypeScript plugin `kmerdan.markdown-preview`, developed with the independent Notepad Next ++ SDK 0.3.1. It reads unsaved Markdown, renders a dock beside the editor and registers a generic panel restorer. App 0.15.2 or later is required. Open it manually on a Markdown tab; one shared dock follows matching active tabs and preserves per-tab browser state/scroll. It hides on nonmatching tabs and stops when the dock or last matching tab closes. Native hot updates retain only still-open panels. See [preview lifecycle](../../docs/PreviewLifecycle.md).

From this directory, using Node 24:

```sh
npm ci --ignore-scripts --install-links
npm run build
npm test
npm run debug
```

Open `.debug/preview.html`. `npm run watch` plus `npm run dev` provides simulated document updates. Open this directory in VS Code to use `.vscode/launch.json`, or run `npm run debug:break` and attach on `127.0.0.1:9229`. Native Qt integration still needs a plugin-enabled editor.

Build a local package outside this source directory:

```sh
npm run package -- ../../artifacts/markdown-local
```

Register this directory's `notepadnext-plugin.json`, then Discover → Install Local Package… → select the generated directory. Enable it and open Markdown Preview. For GitHub installation and updates use the [marketplace entry](../../README.md), which publishes separate versions for each plugin.

Raw Markdown HTML is escaped; relative images are resolved by the native host. No editor/preview scroll synchronization is implemented.

GPL-3.0-or-later. `markdown-it` and its production dependencies are bundled with their licenses.
