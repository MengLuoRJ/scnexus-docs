---
title: "Campaign management"
description: "Import your own campaigns into the library, activate them in the game, and restore the official campaigns at any time"
order: 10
group: "usage"
updated: "2026-11-01"
---

::callout{color="info" icon="i-lucide-book-open"}
**The package decides what gets read.** Names, versions and target directories all come from the manifest; the field definitions are in the [SCNexus package standard](/reference/scnexus-package). Campaigns packaged for CCM are parsed under the [CCM package standard](/reference/ccm-package). If recognition fails or some fields come up empty, check the package against those two pages first.
::

## How campaigns are managed

SCNexus splits campaigns into two steps: **installation** only imports the content into your local campaign library, while **activation** is what writes into the game maps. Keeping them apart means you can always fall back to the official campaigns without reinstalling the game.

This differs from [custom content](/guide/customize), which is written straight into the game's `Maps` / `Mods` directories and has no activation step.

## Page layout

The Campaigns entry in the sidebar opens three views; the switch sits in the top-right corner:

| View | Purpose |
| --- | --- |
| Overview | Shows the active work per campaign category and manages the current experience |
| Detailed management | Shows the details, file counts and launch action for a single category |
| Library management | Totals and every installed campaign package, each of which can be deactivated or uninstalled |

Two more actions sit in the top-right corner: Refresh and Scan & rebuild. Refresh only re-reads the records; Scan & rebuild re-checks the installation traces in the game directory, which is what you want when the records and the disk disagree.

## Importing a campaign package

Drag the archive or folder into the import area on the page, or select Archive or Folder inside it. Only one source per import.

Analysis starts on its own afterwards, and you never pick an installation mode:

- When the source has a package description file (`package.json`), the name, author, version and target directories are read from the manifest.
- Without one, the content is identified from the directory structure and the interface says it was identified by directory structure, so the name and version may come from the folder name.
- If no single `Maps` / `Mods` root can be identified, it stops with an error that says whether there are multiple package roots or the layout does not match the standard.

## Installation analysis

When the analysis finishes, an installation dialog opens with:

- **Installation mode**: the available modes are listed (SCNexus / CCM / auto-detect). The auto-detect result is preselected, and the author's recommended mode is marked.
- **Basic information**: name, type, author, version and source.
- **Installed file information**: standard file count, recognised file count, content size and source file statistics.
- **File conflicts**: for every target file that already exists, choose Overwrite or Keep, or use Apply to all to set them all at once. Confirm installation stays disabled while anything is undecided.

Once confirmed, the files are written and the interface shows extraction and installation progress. It then asks "The campaign has been added to your library. Activate it now?" — you can select Activate now, or finish and come back to it later.

> **Note**: in CCM mode the installation also writes into Mods. **Deactivation and uninstalling do not remove those Mods**, so clean them up yourself.

## Activating, switching and restoring

- **Activate**: select Activate in the overview or the details and confirm; the campaign files are written into the game maps and related mods, and each category holds one active campaign at a time.
- **Restore**: select Restore to deactivate and bring the official campaign back. The prompt reads "Restore the official campaign? The current custom campaign will be deactivated."
- **Switch**: going from one campaign to another restores the current one first, then activates the target with its own conflict settings, so you see two confirmations in a row.

The active state is shown as a badge on the campaign package. The four categories (Wings of Liberty, Heart of the Swarm, Legacy of the Void and Nova Covert Ops) are independent, so you can keep one active campaign in each of them.

## Uninstalling

Restore first, otherwise the game still holds that campaign's files. Confirming the removal deletes the installed content and its records from the library; your own original archive is left alone.

## Launching the game

Start game at the bottom of the overview launches the game with the current setup. When it goes through Battle.net, the app tells you that Battle.net has been started and asks you to select Play there — that is a limitation of Battle.net itself, not a failure.

## Library management

This view gives you the overall picture:

- Four totals at the top: campaign packages, total standard files, total recognised files and total content size.
- Statistics by campaign groups the numbers by campaign category and management format.
- The installed campaigns list filters by All or a single category; each entry can be opened, revealed in its folder, deactivated or uninstalled.

The totals only cover installation records in the current game directory. Active copies, backups and unregistered files are not included, so they are not the same as disk usage.

## Prerequisites

Campaign features need a game root directory set in Settings → Game environment. Without it the page shows a prompt with a Get started button, and activation or uninstalling is refused while the directory is invalid.
