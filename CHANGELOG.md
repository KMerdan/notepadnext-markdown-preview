# 2026-10-12 — independent SDK dependency

- Both plugins now build with the fixed SDK 0.2.0 Release URL and lockfile integrity. The vendored SDK source is removed.
- Markdown 0.1.6 retains API 0.1 behavior and is rebuilt through the independent SDK.
- HTML 0.1.2 uses the native browser bridge name with an older-host alias fallback.
- Catalog 0.1.2 keeps both IDs, origins and independent update lifecycles.

# Marketplace changes

## 0.1.1

- Release HTML Preview 0.1.1 independently; Markdown stays at 0.1.5.
- Show the current backend/plugin version after panel restoration without overwriting preview drafts.
- Test actual Node HTTP endpoints, method/path isolation, lazy service start and service disposal.

## 0.1.0

- Upgrade the existing Markdown repository to the first-party Notepad Next ++ plugin marketplace.
- Keep the repository URL, Markdown plugin ID and historical releases for existing installations.
- Add independently packaged HTML Preview, with an activation-owned Node HTTP service and panel restoration.
- Share SDK 0.1.2, generate a synchronized catalog, and publish independent namespaced plugin releases.

Markdown history is retained in [its changelog](plugins/markdown-preview/CHANGELOG.md).
