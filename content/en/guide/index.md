---
title: "Getting started"
description: "SCNexus is a hub app built for the StarCraft community"
order: 1
group: "start"
updated: "2026-11-01"
---
SCNexus is a hub app built for the StarCraft community. The current version offers the following:

- **[Campaign management](/guide/campaign)**: keeps your local campaign library in one place. Importing an archive or a folder identifies the content type and file layout automatically, so you never pick an installation mode by hand; installation and activation are separate, the game is only overwritten once you activate, and you can deactivate or uninstall at any time.
- **[Custom content](/guide/customize)**: uses the same automatic analysis, then installs maps and mods straight into the game's Maps / Mods directories with no activation step. You can pick a launcher map and start the game in one click, and keep local edits when uninstalling.
- **[Weekly mutations](/guide/weekly-mutations)**: this week's mission map, mutators and community ratings for the CN, US, EU and Asia servers, with server-verified results distinguished from rotation projections.
- **[Replays](/guide/replays)**: indexes local replays by matchup and replay type, flags duplicates, exports in bulk, and shows resource curves and production timelines.
- **[Workshop](/guide/workshop)**: browse and search community works, open their details, and download reviewed releases.
- **[Creator center](/guide/creator)**: once you hold creator status, create works, maintain the description and changelog, upload new versions, and follow transfers under uploads.
- **[Downloads](/guide/downloads)**: fetch reviewed releases from the SCNexus Workshop by work number (SCNID), or pull content from a public GitHub repository; in-progress and finished tasks share one list, and installation is a separate confirmation.
- **[Creation tools](/guide/tools)**: local helpers such as the encoding converter. Everything runs on your machine; input is never uploaded or stored.
- **[Smart Assistant](/guide/ai-assistant)**: an optional, locally controlled MCP service that only listens on loopback, letting AI clients on the same machine query data and work with campaign files.
- **[Account and personal center](/guide/account)**: sign-in, nickname and email, experience levels and daily check-in, and two-step verification.
- **[Settings](/guide/settings)**: display language, download directory, game directory, feature switches, log level and telemetry all live here.

## Offline features and official online services

SCNexus works on two layers: the core features all run locally, while the official online services are strictly an extension that you decide whether to enable.

| Category | What it covers | Needs official online services |
| --- | --- | --- |
| Offline features | Campaign management, custom content, replays, creation tools, downloads, Smart Assistant | No. No sign-in and no dependency on the official services; download tasks still need a network connection. |
| Official online services (optional) | Workshop and creator center, online calibration for weekly mutations, account and progression | Yes. Sign-in is required, and you can enable or disable them at any time in Settings → Feature management. |

The official services are optional: leaving them off does not affect the offline features. While they are off, the app stops calling the official content APIs, clears the local sign-in state and hides the Workshop entry; existing Workshop tasks and downloaded files are kept, and can be resumed by hand after you turn the services back on.

Importing, installing, activating and uninstalling campaigns, installing and launching custom content, and the Smart Assistant all keep working; weekly mutations fall back to local data and rules, and GitHub downloads are unaffected. Online analytics is controlled by its own switch and is not tied to any of the above.

## Getting the app

<div class="not-prose my-6 grid gap-4 sm:grid-cols-2">
  <a href="https://release.scnexus.net/stable/latest" style="text-decoration:none" class="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700">
    <span class="flex items-center justify-between gap-3">
      <span class="text-[11px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300">Direct download</span>
      <span class="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">Windows x64</span>
    </span>
    <span class="mt-3 text-base font-semibold text-slate-900 dark:text-white">Installer (direct link)</span>
    <span class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">Downloads the NSIS installer; run it and follow the prompts. This is the right choice for most people.</span>
  </a>
  <div class="flex flex-col rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-5 dark:border-slate-700 dark:bg-slate-900/40">
    <span class="flex items-center justify-between gap-3">
      <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">App store</span>
      <span class="rounded-full bg-slate-200/70 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">Not available</span>
    </span>
    <span class="mt-3 text-base font-semibold text-slate-900 dark:text-white">Microsoft Store</span>
    <span class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">The Store build has runtime problems and is not offered at the moment; use the installer above.</span>
  </div>
</div>

<!-- 商店版本恢复后可直接启用此入口
<a href="https://apps.microsoft.com/store/detail/9PL7DCMCN13X?launch=true&mode=full">
	<img src="https://get.microsoft.com/images/zh-CN%20dark.svg" />
</a>
-->

## Updates and uninstalling

**Updating**: open Settings → General → Version & updates inside the app and select Check for updates; if one is available you can download and install it from there. You can also download the [latest installer from this page](#getting-the-app) and install it over the existing version.

**Uninstalling**: use Windows Settings → Apps → Installed apps, or Control Panel → Programs and Features, find SCNexus and uninstall it.

## Community

<div class="not-prose my-6 grid gap-4 sm:grid-cols-2">
  <a href="https://qm.qq.com/cgi-bin/qm/qr?k=IgP5DkVYkL-VlgMPESNmRaPiYFCQLrNI&jump_from=webapi&authKey=IH1aC/1uFvcRC43U2h3R4Ms2YhbMg082p4RTMSV4GHZSRmfIyLjJodIwwf8wAdL4" style="text-decoration:none" class="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700">
    <span class="text-[11px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300">QQ</span>
    <span class="mt-3 text-base font-semibold text-slate-900 dark:text-white">SCNexus Chinese user group</span>
    <span class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">Group 857601125 · For questions, feedback and general chat.</span>
  </a>
  <a href="https://discord.gg/U6EbQKdkH2" style="text-decoration:none" class="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700">
    <span class="text-[11px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300">Discord</span>
    <span class="mt-3 text-base font-semibold text-slate-900 dark:text-white">SCNexus server</span>
    <span class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">discord.gg/U6EbQKdkH2 · For English-speaking users and cross-timezone chat.</span>
  </a>
</div>

## Notice

The SCNexus application is made by an independent developer. Neither the application nor its developer team is affiliated with, endorsed by or sponsored by Blizzard Entertainment, Inc.

StarCraft and the StarCraft logo are trademarks of Blizzard Entertainment, Inc. All rights reserved by Blizzard Entertainment, Inc.
