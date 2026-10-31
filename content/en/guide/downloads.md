---
title: "Downloads"
description: "Fetch content from GitHub or the Workshop, then install it once you have checked it"
order: 70
group: "usage"
updated: "2026-11-01"
---

::callout{color="info" icon="i-lucide-book-open"}
**The source decides what can be fetched.** The requirements a GitHub repository has to meet are in the [GitHub source standard](/reference/github-source); once the files are here, manifest parsing and installation targets follow the [SCNexus package standard](/reference/scnexus-package). Older CCM packages are covered by the [CCM package standard](/reference/ccm-package).
::

## Two kinds of source

Downloads is the single entry point for content coming onto your machine, with two kinds of source:

| Source | Requirement | What is fetched |
| --- | --- | --- |
| GitHub repository | A public repository whose root holds a standard `package.json` | An archive of the latest commit on that branch |
| SCNexus Workshop | Signed in, with the Workshop enabled | The work's current reviewed release |

GitHub needs no account and no official services; the Workshop needs both. What the repository has to look like — where the manifest goes, how the directories are arranged, how to write the address and branch — is in the [GitHub source standard](/reference/github-source).

The page states the flow at the top: once the download finishes, select Install to continue; before installing you can review the files and choose whether to overwrite existing content. Downloading and installing are deliberately separate so nothing is written into the game directory the moment a transfer ends.

## Creating a task

Select New task to open the dialog and pick a source first.

**GitHub repository**: enter the repository URL (`https://github.com/owner/repository`) and a branch (defaults to `main`). An invalid address or branch is reported straight away.

**SCNexus Workshop**: enter the work number (`SCNID`, an integer from 1 to 2147483647). If you are signed out it takes you to the personal center to sign in and reopens the dialog when you come back.

Select Fetch information and the app probes the source before showing a preview:

- Workshop: title, summary, `SCNID` and version.
- GitHub: the name, summary, author, version, type (campaign / custom content / dependency), campaign, `SCNID`, licence and homepage from the manifest, plus the repository and commit.

When it looks right, select Confirm download and the download task is created. If the information cannot be fetched you get a concrete reason, such as the work having no reviewed release, or the repository being private, the branch missing, or the manifest not meeting the standard.

## Task list

Tasks are split into In progress and History: completed, cancelled and failed tasks go to history, everything else stays in progress.

Each task shows the name, a status badge, a progress bar, `transferred / total · rate`, the source line, and the creation and completion times. The source line shows the work number for Workshop tasks, the repository and commit for GitHub tasks.

Status values: paused, transferring, completed, failed, unknown result, cancelled.

The available actions change with the status:

| Action | When it appears | What it does |
| --- | --- | --- |
| Pause | Transferring | Stops writing but keeps the parts already received |
| Resume | Paused / failed | Continues from the breakpoint instead of starting over |
| Cancel | Not finished, not cancelled | Aborts and deletes the temporary files |
| Remove task | Anything but transferring | Asks what to remove |
| Install | Completed | Verifies the file and enters the installation flow |

Transfers run in 16 MiB chunks and support resuming: pausing keeps the temporary file, only cancelling deletes it, so pick pause when you want to continue later.

Remove task first checks whether the cached file is still there: if it is, you can remove the record only or the record and the file; if it is gone, only the record can be removed.

Open download location in the top-right corner opens the current download directory. **The download directory is bound when the task is created**, so changing it in the settings later does not affect existing tasks.

## Installing

Select Install and the following happens in order:

1. the cached file is verified against its SHA-256 and size;
2. the package is analysed to tell a campaign from custom content or a dependency;
3. the installation dialog opens for the installation mode, the launcher map (custom content) and file conflicts (overwrite or keep, with a bulk option);
4. select Confirm and it writes into the game.

On success it reports that installation has completed; on failure it suggests checking the game settings or analysing the file again. Campaigns still need [activating](/guide/campaign) before they replace the game's campaigns.

Installed dependencies are listed separately below the list with their name and version, and can be opened or uninstalled. Uninstalling a dependency asks you file by file to keep local files or delete shared ones when the resources are shared or modified — it never silently deletes another work's files.

## When something goes wrong

Transport errors report that the transfer cannot be completed at the moment and ask you to check the network and try again, and warn that an upload with an unknown result should not be submitted twice — that last part is about uploads. A failed download just needs Resume; creating the task again only leaves duplicate files behind.
