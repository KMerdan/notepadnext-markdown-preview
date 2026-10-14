# Independent plugin releases

The root `notepadnext-plugin.json` is a marketplace: `list` contains the full metadata of all four plugins. Each package keeps `list: false`. Catalog generation never runs plugin code, and its check prevents versions, permissions or commands from drifting between the catalog and package.

1. Change source and the selected plugin's version in `package.json` and `notepadnext-plugin.json`.
2. From its directory, run `npm install --package-lock-only --ignore-scripts --install-links`.
3. From the repo root, run `npm run catalog` and bump the root catalog version when publishing a catalog change. Run `npm run ci`.
4. Commit, then create the exact tag **`<plugin-id>/v<version>`**, e.g. `kmerdan.html-preview/v0.1.2`. Push the commit and tag.
5. `plugin-release.yml` selects only that plugin, performs a locked build/test, and publishes a draft with `notepadnext-plugin.zip` and `notepadnext-plugin-checksums.json`. Verify ID, version, size, SHA-256 and licenses before publishing the draft. Never overwrite an existing release.

Local release check:

```sh
node tools/marketplace.cjs release kmerdan.html-preview/v0.1.2 ../html-release-assets
```

Output must be new and outside the source directory. Generic asset filenames are safe because each plugin owns a separate namespaced GitHub Release. The host only selects the chosen plugin's namespace and catalog version, then validates package metadata and integrity. Old Markdown `v0.1.2`–`v0.1.4` releases remain available for backward compatibility.

For current native API 0.3 installation, register the default repository URL with an empty Git ref and install either production preview. Refresh Catalog and Update query that plugin's namespaced immutable releases independently. An unchanged version reports up-to-date; a newer compatible version goes through package validation and the shared hot-update restoration flow. SDK 0.3.2 is the formal Release tarball dependency.

Registration, installation and enablement are separate choices. Updating HTML must not replace Markdown. Plugin Manager retains per-plugin data and restores supported open panels; a failed replacement rolls back its package.

SDK upgrades: change the exact SDK Release or commit archive URL in the selected development dependencies, regenerate lockfiles with install hooks disabled, verify their resolved URL/integrity, and run `npm run ci`. The application submodule and SDK implementation are maintained outside this repository. Do not copy SDK source back into tools.
