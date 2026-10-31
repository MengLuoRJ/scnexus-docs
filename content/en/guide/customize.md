---
title: "Custom content"
description: "Install maps and mods straight into the game, then pick a launcher map and start in one click"
order: 20
group: "usage"
updated: "2026-11-01"
---

::callout{color="info" icon="i-lucide-book-open"}
**The package decides what gets read.** The `Maps` / `Mods` resource declarations and the launcher map field are defined in the [SCNexus package standard](/reference/scnexus-package). If you want players to download this work straight from GitHub, the repository also has to meet the [GitHub source standard](/reference/github-source).
::

## How it differs from campaigns

Custom content (map packs and mods) is **installed directly into the game's `Maps` / `Mods` directories** and shows up in the game right away — there is no activation step. The management directory stores only the description and a manifest, not a second full copy of the resources, so uninstalling relies on the manifest to decide which files this work wrote.

If you need content that only replaces the game's campaigns after activation, use [campaign management](/guide/campaign).

## Installing content

Open Custom content in the sidebar and drag the archive or folder into the import area, or select Archive or Folder. The analysis works the same way as for campaigns:

- With a `package.json`, the name, author, version and launcher map are read from the manifest.
- Without one, the `Maps` / `Mods` layout is identified automatically; author and version are left empty rather than guessed, and `metadata.txt` is not treated as content metadata.

Once you confirm, the files go straight into the game directory and the interface says the content was installed directly and needs no activation. The source must be a standard `Maps` / `Mods` layout — one extra wrapper folder is fine, two roots are rejected.

## Content cards

Each entry shows the cover, name, source badge (`SCNexus` or auto-detected), author, version, standard file count, recognised file count and content size; a description is shown up to three lines, and a launcher map adds its path.

Three actions on each card:

| Action | What it does |
| --- | --- |
| Launch | Disabled until a launcher map is set |
| Details | Opens the record, where the launcher map can be changed |
| Uninstall | Removes the game files and the manifest this work wrote |

## Launcher map

The launcher map is what makes one-click play possible: once set, Launch takes the game straight into that map instead of making you find it in the lobby.

Set it under Details on a work:

- The list contains the maps installed by this work, plus No launcher.
- When the manifest names a launcher, it is used as-is; when it was matched by filename only, the interface says the launcher was detected by filename and can be changed.
- Select Save launcher and it confirms the launcher was saved.

## Uninstalling

Uninstalling removes the game files this work wrote and its management manifest. If some files are shared with other works or have been edited locally, the dialog asks you to decide for each one:

- **Keep local files**: leave the files on disk and only drop the manifest record.
- **Delete shared files**: delete them too; this cannot be undone automatically.

When in doubt, keep them — deleting a shared file can affect other works as well.

## Scanning and refreshing

Refresh and Scan & rebuild are in the top-right corner here too. After you have copied files into the game directory by hand or brought content over from elsewhere, use Scan & rebuild to line the records up with the disk again; when the list is empty the page suggests installing an archive or scanning the game directory.

## Prerequisites

As with campaigns, the game root directory and the content management directory have to be set in Settings → Game environment first, otherwise installing and launching are refused.
