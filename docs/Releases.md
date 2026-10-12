# Independent plugin releases

The root `notepadnext-plugin.json` is a marketplace: `list` contains the full metadata of both plugins. Each package keeps `list: false`. Catalog generation never runs plugin code, and its check prevents versions, permissions or commands from drifting between the catalog and package.

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

For a complete native install/update demonstration, register the repository with optional Git ref `marketplace/v0.1.0`, install HTML 0.1.0 and Markdown 0.1.5, then register/refresh the default branch and update to its current catalog versions. The two updates remain independent. Ordinary users leave the ref empty and get the latest catalog.

Registration, installation and enablement are separate choices. Updating HTML must not replace Markdown. Plugin Manager retains per-plugin data and restores supported open panels; a failed replacement rolls back its package.

SDK upgrades: change the exact SDK Release URL in both development dependencies, regenerate lockfiles with install hooks disabled, verify their resolved URL/integrity, and run `npm run ci`. The application submodule and SDK implementation are maintained outside this repository. Do not copy SDK source back into tools.
