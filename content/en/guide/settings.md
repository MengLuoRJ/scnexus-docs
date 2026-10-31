---
title: "Settings"
description: "Language, game directories, feature switches and logging privacy, tab by tab"
order: 110
group: "usage"
updated: "2026-11-01"
---

## General

| Item | Description |
| --- | --- |
| Display language | System default / Simplified Chinese / English / Traditional Chinese. It takes effect as soon as it is saved, with no restart; System default falls back to Simplified Chinese when the language cannot be identified |
| Download directory | Where download tasks are stored, defaulting to the system Downloads folder. Change directory picks a new path, Open directory opens it. **Existing tasks keep writing to the directory they were created with**; changing the setting only affects tasks created afterwards |
| Version & updates | Shows the current version and update state, with the buttons in order Check for updates → Download update → Quit and install. Only the packaged Windows build supports it; in development mode or outside Windows it reports that self-updating is unavailable in this environment |
| Help & services | Five external links — the website guide, the terms, the privacy policy, the community and sponsorship support — all opened in the system browser |

Updates are neither checked nor installed at start-up; you have to select Check for updates once. When a new version is found, download it first — only after the download finishes does the button become Quit and install.

## Game environment

This tab decides whether the app can read and write game data; the badge in the card's top-right corner reads Ready or Not configured or unavailable.

| Item | Description |
| --- | --- |
| Game directory | Choose directory sets it by hand, Detect again rescans the installed locations. While it is not ready, installing and activating campaigns and custom content is refused |
| Content management directory | Derived from the game configuration; view and open only |
| CCM management directory | The same |
| StarCraft II documents directory | The directory holding `Accounts` and replays. Left empty it uses the system Documents / StarCraft II; a custom path is validated to be a directory, and the tab marks whether the custom or the system directory is in use |
| Identify StarCraft profiles | Reads the profiles in that directory and shows their short names and account IDs. If none are found it suggests checking the directory and creating a profile in the game |
| Use default directory | Clears the custom path and returns to the system default |

The StarCraft profile options in replay management, custom content and campaigns all depend on this; a wrong directory shows up as no StarCraft profiles identified.

## Feature management

Four switches decide which entries the sidebar shows:

| Switch | Default | What turning it on does |
| --- | --- | --- |
| Smart Assistant | Off | Adds Smart Assistant to the sidebar and allows starting the local MCP service; turning it off stops the service immediately |
| SCNexus official services | On | Enables accounts, online calibration for weekly mutations and the Workshop |
| Workshop | On | Enables the Workshop, the creator center and Workshop transfers; it cannot be changed while the parent switch is off |
| Weekly mutation online calibration | On | Calibrates weekly mutation results through the official services; with it off the results still come from local data and rules |

Turning SCNexus official services off **clears the local sign-in state**, hides the account entry in the sidebar and sends Workshop pages back to the settings tab; local features and GitHub downloads are unaffected. You have to sign in again after turning them back on.

Turning the Workshop off only pauses Workshop tasks in progress and keeps the tasks and files; **they do not resume automatically** when you turn it on again — resume them by hand in Downloads.

## Logging & privacy

| Item | Description |
| --- | --- |
| Log directory | Where the run-time logs live; Open directory jumps straight there. Attach these logs when reporting a problem |
| Log level | `error` / `warn` / `info` / `verbose` / `debug` / `silly`, `error` by default. Higher levels record more detail and take more space |
| Online analytics | Silently reports visits and online status; it pauses while offline and resumes when the network returns. Independent of error telemetry |
| Error telemetry | With consent, sends redacted errors and stacks linked to an installation ID; no screenshots, memory dumps or account identity. Off by default |

Once error telemetry is on, its runtime state is shown below: an initialisation failure usually means the environment does not support it or no reporting endpoint is configured, and restarting the app may help. Reports already sent cannot be recalled; turning it off only affects what comes afterwards.

Online analytics needs no consent, while error telemetry does — the two are independent, so you can turn on just one of them.
