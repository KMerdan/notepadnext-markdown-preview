# Markdown Preview for NotepadNext

A standalone TypeScript plugin developed with the NotepadNext SDK 0.1.1. Preview the editor buffer, including unsaved Markdown, in a dock beside the editor. Closing/reopening disposes and recreates the watch; deactivation releases timers and the panel.

## Install from this repository

Use a plugin-enabled NotepadNext 0.15.x development build with WebEngine support:

1. **Plugins → Plugin Manager… → Register Resources…**: enter `https://github.com/KMerdan/notepadnext-markdown-preview`.
2. Review and register the resource. It appears in **Uninstalled**; registration does not install or run it.
3. Select **Markdown Preview → Install…**, choose the matching stable Release package and confirm.
4. In **Installed**, enable the plugin and choose **Open Markdown Preview**. Open an `.md` file or set a new buffer's language to Markdown.

Plugin ID: `kmerdan.markdown-preview`. It is separate from the original local `notepadnext.markdown-preview` example. If both are installed, disable the old example to use this one.

**Update:** Sources → select this repository → Refresh; then Installed → Markdown Preview → Update… → choose the newer Release. Settings and enablement are preserved. More → Reload restarts the installed version, while Roll Back restores its retained predecessor.

## Develop locally

Use Node 24. The repository vendors SDK 0.1.1 under `tools/plugin-sdk/`; no NotepadNext source checkout or Qt compiler is needed to build the plugin.

```sh
npm ci --ignore-scripts
npm run build
npm test
npm run debug
```

Open `.debug/preview.html`. For live compilation and simulated document events, run `npm run watch` and `npm run dev` in separate terminals. For TypeScript breakpoints, use `.vscode/launch.json` or `npm run debug:break` and attach on `127.0.0.1:9229`. The simulated host does not replace native editor testing.

- [SDK development guide](tools/plugin-sdk/docs/GettingStarted.zh-CN.md)
- [Markdown development, debug and local installation](tools/plugin-sdk/docs/MarkdownWalkthrough.zh-CN.md)
- [Debugging and API](tools/plugin-sdk/docs/Debugging.zh-CN.md)
- [Release maintenance](docs/Releases.md)

## Build local installation and distribution packages

```sh
npm run build
npm test
npm run package -- ../artifacts/markdown-preview-0.1.4
npm run bundle -- ../artifacts/markdown-preview-0.1.4-assets v0.1.4
```

Output paths must be new and outside the source. Local Install Local Package… accepts the generated directory. GitHub installation downloads `notepadnext-plugin.zip` and validates it against GitHub's asset digest or `notepadnext-plugin-checksums.json` from the same Release. Source archives are not installation packages.

Native `setHtml` uses well-formed XHTML with the host's theme/font/CSP. Raw HTML is escaped. Local relative images can be mapped by the real host; the SDK simulated host shows placeholders. There is no scroll synchronization in this version.

GPL-3.0-or-later. Third-party production dependencies and their licenses are included by the SDK packer.

Hot updates use the generic `webviews.restore@1` lifecycle. The host preserves the existing dock, floating position and scroll while the new activation renders the current unsaved buffer. No menu command is replayed. See [restoration contract](tools/plugin-sdk/docs/HotUpdate.zh-CN.md). Requires a host with the restoration capability.
