# Release maintenance

The default branch metadata declares the latest installable plugin version. Keep `package.json` and `notepadnext-plugin.json` version fields identical; use stable SemVer. After changing them, run `npm install --package-lock-only --ignore-scripts`, then build and test.

For version 0.1.1:

```sh
npm ci --ignore-scripts
npm run build
npm test
npm run bundle -- ../artifacts/markdown-preview-0.1.1-assets v0.1.1
```

Commit source and lockfile, create the matching `v0.1.1` tag and push it. `plugin-release.yml` builds with the pinned Node 24 runtime and creates a draft containing the ZIP and checksums. Review it and publish it for Plugin Manager discovery. Drafts and prereleases are excluded by the installer. Do not overwrite an existing version or its assets.

Users refresh Sources first to register the new metadata, then explicitly Update from Installed. Registration, installation and activation remain separate steps. For inactive plugins validation may be deferred until first activation; a failing candidate restores its retained predecessor.

To repeat the initial installation at an old version, register the base repository URL with its optional Git ref set to `v0.1.2`; install it, then register the same base URL without a ref to discover the new version. Both origins resolve to this same release repository.
