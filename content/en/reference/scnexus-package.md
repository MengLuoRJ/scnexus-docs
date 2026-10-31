---
title: "SCNexus package standard"
description: "Directory layout, package.json manifest fields, map and mod resource declarations, and how launchers and bundled documents are written for SCNexus work packages."
order: 10
group: "reference"
updated: "2026-11-01"
---

SCNexus treats an archive as the installer itself: the player imports it, the app extracts it, reads the manifest, plans the installation, and places maps and mods into the game directory as declared. Get the directories right and fill the manifest in fully, and installation is entirely automatic.

This page defines the fields of that manifest. The manifest file is `package.json` — it is the **SCNexus work manifest** and has nothing to do with the dependency file of a Node.js project; scripts or URLs inside it are never executed as code.

## The basic shape of a package

```text
My Project/
├─ package.json
├─ Maps/
│  └─ MyProject/
│     ├─ Launcher.SC2Map
│     └─ Chapter01.SC2Map
└─ Mods/
   └─ MyProject.SC2Mod
```

- The manifest sits in the archive root and there is exactly one. When uploading to the Workshop the root must be the manifest itself, with no extra "My Project" folder around it; local imports can still find it one level down for compatibility, but new works should not rely on that.
- `Maps/` and `Mods/` are **logical path prefixes**, not absolute paths on disk. `source_path` in the manifest is relative to the package root and `target_path` is relative to the game directory; neither should contain a path from your own machine.
- The manifest is standard UTF-8 JSON: no comments, no trailing commas, no duplicate field names.

## Work types

| `type` | Meaning | What happens after installation |
| --- | --- | --- |
| `campaign` | A work that replaces the matching official campaign | After activating it in Campaigns, the campaign is entered from the game |
| `customize` | A standalone custom map or work | Installed where declared, launchable from the client through a launcher map |
| `dependency` | A mod package shared by several works | Installed and uninstalled on its own; supplies mod resources only |

A `campaign` must also give the `campaign` field, with these values and the map regions they correspond to:

| Value | Campaign | Map region the client recognises |
| --- | --- | --- |
| `WOL` | Wings of Liberty | `/Maps/Campaign/`, excluding the other campaign subdirectories |
| `HOTS` | Heart of the Swarm | `/Maps/Campaign/swarm/`, including `evolution/` |
| `LOTV` | Legacy of the Void | `/Maps/Campaign/void/` and `/Maps/Campaign/voidprologue/` |
| `NCO` | Nova Covert Ops | `/Maps/Campaign/nova/` |

A dependency package may not declare `maps`, `campaign`, `manager`, `launcher`, `dependencies`, `localization` or any of the save-related fields.

## Common fields

These fields apply to all three types.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | string | yes | One of `campaign`, `customize`, `dependency` |
| `name` | string | yes | Work name; may not be blank |
| `description` | string | yes | Short description |
| `version` | string | yes | Work version; a semantic version is recommended |
| `author` | string | yes | Author or team |
| `scnid` | number | no | Workshop project number, a non-negative safe integer; never a string |
| `tags` | string array | no | Work tags |
| `website` | string | no | Work website |
| `social` | object | no | Social links, see below |
| `sponsor` | object | no | Sponsorship links, see below |
| `$schema` | string | no | JSON Schema URL for editors; not a format version |
| `readme` | string | no | Path to the readme inside the package |
| `changelog` | string | no | Path to the changelog inside the package |
| `docs` | string array | no | Additional documents inside the package |
| `assets` | string array | no | Allowlist of other display attachments, supporting `*` and `**` |

Write the version as `major.minor.patch`, for example `1.2.3`; pre-releases and build metadata may look like `1.2.3-beta.1` and `1.2.3+build.5`. Do not use `v1.2.3`, `latest` or `1.2` as a release version. Manifest validation only requires `version` to be valid text; Workshop uploads and GitHub sources run their own full semantic-version checks.

`social` accepts `twitter`, `discord`, `youtube`, `weibo`, `bilibili` and `qq_group`; `sponsor` accepts `paypal`, `patreon`, `buymeacoffee` and `afdian`. All values are strings:

```json
{
  "website": "https://example.com/project",
  "social": {
    "bilibili": "https://space.bilibili.com/123456",
    "qq_group": "123456789"
  },
  "sponsor": {
    "afdian": "https://example.com/support"
  }
}
```

Never invent a Workshop project number; when linking a project, use the `scnid` actually assigned to it. Social and sponsorship details are not guaranteed to appear on every client screen.

## Resource declarations

Maps and mods go into the `maps` and `mods` arrays. Map files end in `.SC2Map` and mods in `.SC2Mod`; the check is case-insensitive.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes | Resource name including its extension; the launcher references maps by this |
| `source_path` | string | yes | Path inside the package, starting with `/Maps/` for maps and `/Mods/` for mods |
| `target_path` | string | no | Logical target path in the game directory; defaults to `source_path` |
| `description` | string | no | Resource description |
| `version` | string | no | The resource's own version; does not replace the work version |
| `components` | boolean | no | The resource is stored as a component directory; the actual file layout decides |

```json
{
  "name": "Launcher.SC2Map",
  "source_path": "/Maps/MyProject/Launcher.SC2Map",
  "target_path": "/Maps/MyProject/Start.SC2Map"
}
```

The example reads `Maps/MyProject/Launcher.SC2Map` from the package and installs it as `Maps/MyProject/Start.SC2Map` in the game directory. `target_path` must match the resource paths referenced inside the map — never change it just because it looks nicer.

Path rules:

- Always use `/`, and match the case of the `/Maps/` and `/Mods/` prefixes exactly.
- Drive letters, network shares, `.` and `..` are not allowed, and nothing may escape the installation directory.
- Declared resources must exist; one target may not be claimed by two resources, and files and directories may not collide.
- Do not pull files from outside the package in through symbolic links.
- For a component-form map or mod, declare the resource root directory rather than listing every file inside it.

## Launcher

Custom content may declare `launcher`:

```json
"launcher": {
  "name": "Launcher.SC2Map",
  "description": "Work main menu"
}
```

`launcher.name` must exactly match the `name` of **one** entry in `maps` — it is not a file path and not the installed `target_path`.

When it is not declared, the client tries to recognise common names such as `Launcher.SC2Map` or `启动器.SC2Map` and lets the player pick during installation confirmation; the launcher map can also be changed later in the work's details. The player's local choice never rewrites the author's manifest.

## Bundled images and documents

Campaigns may declare `banner` and custom content may declare `cover`; the two cannot be swapped or used together, and dependencies may use neither. All three types may declare `readme`, `changelog`, `docs` and `assets`.

```json
{
  "cover": "images/cover.webp",
  "readme": "docs/README.md",
  "changelog": "docs/CHANGELOG.txt",
  "docs": ["docs/guide.md", "docs/credits.txt"],
  "assets": ["images/**", "docs/*.md"]
}
```

These paths are relative to **the archive root**; writing them without a leading `/` is recommended. The manifest only declares paths and does not check that the files exist; reading them, validating them and displaying them is the client's job.

When a field is omitted, the client probes for default names next to the manifest in a fixed order (exact match, case-sensitive):

| Field | Probe order |
| --- | --- |
| `banner` (campaigns only) | `banner.jpg` → `banner.png` → `banner.webp` |
| `cover` (custom content only) | `cover.jpg` → `cover.png` → `cover.webp` |
| `readme` | `README.txt` → `README.md` → `readme.txt` → `readme.md` |
| `changelog` | `CHANGELOG.txt` → `CHANGELOG.md` → `changelog.txt` → `changelog.md` |

If an image path is written explicitly but the file is missing or cannot be loaded, the client falls back to its default image without probing; if a document path is written explicitly but missing, that document is skipped, again without probing. `docs` reads the listed files only and never scans a directory.

`assets` is the allowlist for **other attachments**. Explicitly declared images, `readme`, `changelog`, `docs` and the default candidates are included automatically and need not be listed again; any other attachment — including images linked from a document and a second document — must match `assets`. Leaving it out or writing `[]` keeps no unlisted attachments at all.

The allowlist supports `*` within a single segment and `**` as a standalone segment: `images/*.png` does not match `images/sub/a.png`, `images/**/*.png` matches at both levels, and `**/*.md` also matches `guide.md` in the root. `?`, brackets, braces, negation and `**` inside a segment are not supported.

What the current client will read:

| Item | Limit |
| --- | --- |
| Image formats and size | JPEG / PNG / WebP, ≤ 8 MiB per file; everything is decoded and shown as PNG |
| Document formats and size | UTF-8 `.md` / `.txt`, ≤ 1 MiB per file |
| Total attachments | At most 256 files, ≤ 64 MiB combined |
| Links inside documents | Only to `.md` / `.txt` inside the same work package, optionally with a heading fragment; remote resources are never loaded |

Attachments are kept as private copies managed by the client, so they can still be read after the original archive or source folder is gone, and later scans do not drop them.

## Other optional fields

These are available to campaigns and custom content only.

| Field | Structure | Current meaning |
| --- | --- | --- |
| `localization` | array of objects | Each entry has a required `locale` plus optional `name`, `description`, `author`, `version` and `translators`; declaring it does not mean the interface switches language |
| `dependencies` | array of objects | Each entry may hold `scnid` and `version`; it describes a dependency and never downloads or installs it |
| `bank_enable` | `"official"` or `"custom"` | Declares a save mode; it does not mean save migration is implemented |
| `banks` | array of objects | Each entry has `name` and an optional `description` |
| `manager` | `"SCNexus"` or `"CCM"` | Declares the work's manager; it cannot turn an arbitrary directory layout into a CCM package |

Omit optional fields a new work does not need rather than filling them with empty strings or invented values.

## Validation happens in three layers

| Layer | What it checks |
| --- | --- |
| JSON Schema | Field names, types, enums and undeclared fields — useful for editor hints |
| Manifest validation | Basic structure, whether the type is one of the three, whether the campaign value is valid, whether the launcher maps to exactly one map, resource path prefixes |
| Client installation | Whether resources exist, path boundaries, archive safety, target conflicts; before installing it also shows the file plan for the player to confirm |

A valid structure does not mean it installs, and it does not mean the work has passed a security review. The archive itself has further constraints: entry count, total extracted size, path depth and case collisions are all checked.

## Checking before you publish

1. The manifest is valid UTF-8 JSON, the basic fields are complete, and `name` is not blank.
2. `type` matches what the work is; a replacement campaign carries the right `campaign` value.
3. The declared resources exist, and `source_path` matches the references inside the maps and mods.
4. The launcher is declared in `launcher` and points at exactly one map.
5. The Workshop archive has a single `package.json` directly in its root.
6. Check the target files in the client's import analysis, then actually launch the work once.

For how to lay out the authoring side and pack editor output, see [Packaging a work](/editor/packaging); for importing and installing as a player, see [Campaign management](/guide/campaign) and [Custom content](/guide/customize).
