# Source-bound preview behavior

The host owns editor tabs, file type matching and panel lifetime. Plugins render the selected source; they do not open or activate editor tabs to keep a preview alive.

Open Markdown Preview or HTML Preview manually. One dock per plugin/window follows the active matching tab and preserves each tab's browser state and scroll independently. On a different file type it hides. Closing one matching tab follows the editor's next active tab; closing the last matching tab closes the dock and stops its Node process. Manually closing a dock leaves it closed until another Open command.

HTML Preview serves the unsaved source as the full page. There is no inserted source editor, demo counter or process label. Its Node service serves relative CSS, JavaScript and images from the source file's directory; escaping paths/symlinks, files over 16 MiB and external resources remain unavailable. Each render is checked against the host-selected source/version, so an asynchronous read cannot publish a previous tab's content.

Hot updates restore live docks and per-tab state. They never reopen a panel or document the user closed. See the [SDK ownership contract](https://github.com/KMerdan/notepadnext-plugin-sdk/blob/main/docs/PluginLifecycle.zh-CN.md).
