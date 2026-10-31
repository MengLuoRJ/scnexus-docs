---
title: "Replays"
description: "Index replays by StarCraft profile and replay type, with duplicate detection, bulk export and match data"
order: 40
group: "usage"
updated: "2026-11-01"
---

## Before you start

Replays are organised by StarCraft profile, so first set the StarCraft II documents directory in Settings → Game environment and read the profiles with Identify StarCraft profiles. When no profile is available at the top of the page, it reports that no StarCraft profiles were identified, asks you to configure the documents directory in the settings, and offers Open settings.

## Page layout

The top row holds the profile and type selectors:

| Control | Description |
| --- | --- |
| StarCraft profile | Picks the profile to browse |
| Replay type | Multiplayer / Campaign / Challenge |
| Refresh | Re-reads the directory for the current profile and type |
| Scan directory | Imports the replays in that directory into the index |
| Import | Import replay for a single file, or Import archive for a batch |
| Multi-select export | Switches to a pick-and-pack mode that produces a ZIP |

Switching profile or type refreshes the index automatically, but **folders are not watched**: after adding or removing replays outside the game, select Refresh or Scan directory yourself.

Imported replays are **copied** into the directory for that profile and type, not merely recorded.

## The replay list

You can search by filename, map, player or path. Each row shows the filename, map, players and races, game length, when it was played (local time), file size and metadata status.

There are four metadata states:

- **Supported**: parsed in full.
- **Partially supported**: only some fields were parsed, and the interface notes that only parsed metadata is shown and match analysis is unavailable.
- **Unsupported**: this version cannot parse it.
- **Corrupted**: the file itself has a problem.

Select Details to see the file information (path, size, modified time), when it was played, the map, version, base build, player races and teams, the result and the duration.

## Duplicate replays

Indexing groups replays by the SHA-256 of their contents, so several copies of the same replay land in one group. Turn on Show duplicates to see only those groups; switch back to show everything for the full list.

Deduplication only **marks and groups** files — it never merges or deletes them. After you change files by hand, re-index before the groups reflect it.

## Match data

Select a replay and choose Analyse (Re-analyse once it has been analysed) to build a match analysis containing:

- resource curves (minerals and vespene gas);
- income per minute;
- worker and supply snapshots;
- the production timeline: entities appearing, production starting and finishing, upgrades completing.

The horizontal axis is game time (16 game loops per second), not wall-clock time; curves connect actual samples only, leave gaps empty, and are never smoothed or extrapolated. To stay responsive, long replays show at most 1000 samples.

Worth being clear about: "completing" here only means the protocol events were decoded successfully — **this is not APM, build order or economic analysis** — and when a replay lacks samples or its events cannot be recognised, the interface says the data may be incomplete.

## Bulk export

Select Multi-select export to enter picking mode. Tick entries one by one, or use Select visible to add everything currently filtered; the top shows how many are selected, and Clear empties the selection at any time.

Confirm and choose a new ZIP path; existing files are never overwritten. One export is capped at **2000 replays / 1 GiB**, and it reports the count and where the file was saved. Changing the filters does not clear what you have already picked.

## Deleting

Delete is **permanent**: the replay file on disk and its index record are removed together, with no undo. The dialog says so explicitly and asks you to confirm with a second permanent delete.
