---
title: "CCM package standard"
description: "How CCM describes a campaign in metadata.txt, the key-value format, the directory layout and install targets, and how SCNexus reads these packages."
order: 20
group: "reference"
updated: "2026-11-01"
---

::callout{color="success" icon="i-lucide-lightbulb"}
**New works should be packaged to the SCNexus standard.** CCM is documented here for compatibility with older works: SCNexus can recognise and install them, but the format cannot express a type, launcher map, cover or documents, and the install location can only be inferred from `title`. Packaging to the [SCNexus package standard](/reference/scnexus-package) instead gives you an explicit JSON manifest with fields that map one-to-one onto install targets. Works already published in CCM do not need to be redone.
::

[CCM](https://github.com/7thAce/SC2CCM) (SC2 Campaign Manager) is another tool for managing StarCraft II campaign packages. It describes a work in a `metadata.txt` file and puts campaigns under the game's `Maps/CustomCampaigns` directory. Both importing and scanning in SCNexus can read these packages and install them following CCM's conventions, so the same work can serve both tools.

This page covers the CCM side of the agreement and the decisions SCNexus adds when reading it.

## The metadata.txt format

The file is one `key=value` pair per line, with the key always in lower case:

```text
title=Retribution
desc=A three-chapter single-player campaign with a custom mod
author=Example Author
version=1.2.0
campaign=WOL
```

| Key | Required | Description |
| --- | --- | --- |
| `title` | yes | Work name; also decides the installation directory name |
| `desc` | no | Short description, empty by default |
| `author` | no | Author, empty by default |
| `version` | no | Version, empty by default |
| `campaign` | yes | One of `WOL`, `HOTS`, `LOTV`, `NCO` |

Parsing rules:

- Lines are read one at a time and split at the **first** `=`, with whitespace on both sides trimmed, so a value may contain `=` (`desc=x=y` reads as the description `x=y`).
- Keys are case-sensitive and must be lower case; unknown keys are ignored without an error.
- The file is decoded as UTF-8 and may carry a BOM; when it is not valid UTF-8 it is decoded again as GB18030, so packages saved with GBK in the early days still read. If neither decoding works the manifest is treated as corrupt.
- The filename is `metadata.txt` (case-insensitive), a single file may not exceed 1 MiB, and it may not sit inside a `.SC2Map` / `.SC2Mod` component directory.
- A missing `campaign`, or one outside the four values, makes the whole package invalid: the CCM format describes campaigns and nothing else.

## Directory layout

```text
Retribution.zip
├─ metadata.txt
├─ Campaign.SC2Map            # entry map
├─ Mission01.SC2Map
├─ Mission02.SC2Map
├─ evolution/                 # Heart of the Swarm only
│  └─ Evolution01.SC2Map
└─ Mods/
   └─ Retribution.SC2Mod
```

- `metadata.txt` sits next to the map files, in the archive root.
- Maps sit directly in the root — no extra `Maps/` level — and mods go in `Mods/`.
- As with the SCNexus standard, an extra wrapper folder around the archive is fine: the app looks down and finds the single set of files. Two parallel sets cannot be told apart and are reported as unsupported.

## How install targets are derived

When packaging you write no `maps` or `mods` manifest; targets come from the filenames and from `campaign`:

| Location in the package | Target |
| --- | --- |
| `X.SC2Map` in the root | The map region of that campaign: `WOL` → `Maps/Campaign/`, `HOTS` → `Maps/Campaign/swarm/`, `LOTV` → `Maps/Campaign/void/`, `NCO` → `Maps/Campaign/nova/` |
| `evolution/X.SC2Map` in a `HOTS` package | `Maps/Campaign/swarm/evolution/` |
| `voidprologue/X.SC2Map` in a `LOTV` package | `Maps/Campaign/voidprologue/` |
| `X.SC2Mod` in the root | `Mods/`, keeping the in-package path |
| `.SC2Mod` under `Mods/` | The matching location under `Mods/` |

- A component-form map or mod (a directory ending in `.SC2Map` or `.SC2Mod`) is handled as a whole directory; its contents are not examined one by one.
- Maps in other subdirectories are never planned anywhere, `Campaign/Level1.SC2Map` for instance; for a map to take effect, put it in the root or in one of the campaign subdirectories above.
- Targets are recognised by extension and filename, so renaming a file moves its target — check the references inside the campaign before renaming a map.

## Where it ends up after installation

SCNexus does not write these maps into `Maps/Campaign` as the previous section describes; it installs them by CCM's own conventions:

- The whole package is extracted into a subdirectory under the **CCM management directory** named after `title`, keeping the relative paths inside the package. The default location is `<game directory>/Maps/CustomCampaigns`, which can be changed in Settings.
- Mods inside it are **additionally copied** into the game's `Mods/`, because the game loads mods by path and leaving them in the management directory does nothing.
- A CCM package therefore never overwrites the maps of the official campaigns; uninstalling or deactivating only cleans the management directory, and mods already copied into `Mods/` are neither deleted nor restored if they replaced a mod of the same name. The import dialog says so explicitly: CCM installs mods during import, and deactivating or uninstalling later neither deletes nor restores them.
- Works already sitting in the CCM management directory are recognised again when scanning and show up in campaign management; a single `metadata.txt` in the directory is enough.

## The directory name comes from title

The subdirectory under the management directory is not a verbatim copy of `title`: it is cleaned up first so it works across platforms:

| Step | Description |
| --- | --- |
| Strip `<>:"/\|?*` and control characters | These are unsafe in filenames |
| Trim whitespace and replace inner whitespace with `_` | `Retribution 2` → `Retribution_2` |
| Strip trailing dots | Windows does not allow a directory name ending in a dot |
| Reject reserved names | `con`, `prn`, `aux`, `nul`, `com1`–`com9`, `lpt1`–`lpt9` cannot be directory names |
| Length limit | At most 255 bytes (UTF-8) |

When the cleaned name is empty, hits a reserved name or exceeds the length limit, the import fails and says the title cannot form a usable directory name — try another `title`. If a subdirectory of that name already exists, it is treated as already installed; uninstall or rename it first.

## How SCNexus recognises these packages

When importing or scanning, the client looks for descriptor files in this order:

1. Find the outermost `package.json` and `metadata.txt`. Several descriptors at the same level cannot be told apart and are reported as unsupported.
2. When both exist and declare different work types, you are asked which one to install by; when the types match, `package.json` wins.
3. With only `metadata.txt`, the package is treated as a CCM package, always as a campaign.
4. With neither, the package is a campaign if it contains a `Maps/Campaign` directory and custom content otherwise.

## How it differs from the SCNexus standard

| Item | SCNexus package standard | CCM package standard |
| --- | --- | --- |
| Manifest | `package.json` (JSON) | `metadata.txt` (key-value pairs) |
| Work types it can describe | Campaigns, custom content, shared mod packages | Campaigns only |
| Install location | Declared item by item in the manifest | Derived by convention, under the CCM management directory |
| Version checking | Structural validation plus a semantic-version check at publish time | Treated as text, never compared |
| Languages, images, documents | Supported | Not supported |
| Editor hints and schema | Yes | No |

Reach for the SCNexus standard when you need localised entries, a cover image, documents or dependency packages; when all you want is to hand an existing CCM work to players, leave it as it is.

## Self-check list

1. `metadata.txt` sits next to the maps, its keys are all lower case, and `campaign` is one of the four values.
2. The file is saved as UTF-8; GBK files from older tools still read, but new works should not depend on that.
3. Maps are in the root (or `evolution/`, `voidprologue/`) and mods are in `Mods/`.
4. `title` contains no path separators or similar characters and does not hit a reserved name.
5. After importing, check the planned target files, then confirm in the game that the chapters load.
