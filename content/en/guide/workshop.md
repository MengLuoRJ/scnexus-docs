---
title: "Workshop"
description: "Browse community works, open their details and download reviewed releases"
order: 50
group: "usage"
updated: "2026-11-01"
---

## What it needs to be enabled

The Workshop is part of the official online services, so it has to be turned on in Settings → Feature management first:

1. the SCNexus official services switch is on;
2. the Workshop sub-switch is on.

Both levels gate the Workshop entry: while either is off, the Workshop entry disappears from the sidebar, and opening it by hand sends you back to the settings page.

**Browsing and searching need no account**; only Download requires signing in. Turning the Workshop off does not delete files you have already downloaded, but it pauses Workshop tasks in progress, which you then resume by hand after turning it back on.

## The work list

The Workshop opens as a two-column card list with a fixed 12 entries per page:

- The search box placeholder is Search works; it takes up to 120 characters, and pressing Enter or selecting the search action restarts from page one.
- Each card shows the work's name, its `SCNID`, up to three lines of description, and View details.
- Paging at the bottom is previous page / current page / next page; Next is disabled on the last page when it holds fewer than 12 entries.
- There is no sorting or filtering yet — the list comes back in the official service's default order.

Downloads in the top-right corner jumps to the local download tasks; once you hold creator status, Creator center appears next to it.

With no works at all the page says there are no published works; when loading fails, select Refresh to try again.

## Work details

The details page runs from the title and `SCNID`, through the description, the download button, a safety notice, the rich-text introduction, the work's website and its social and sponsorship links.

- **Download button**: when signed out it reads Sign in to download; selecting it goes to the personal center and returns here once you are signed in, opening the download dialog. It is disabled when the work has no reviewed release.
- **Safety notice**, verbatim: "Only install works you trust. The integrity check performed during download is not a virus scan."
- **Website and social links** accept HTTPS only and open in the system browser; an invalid address reports that the link cannot be opened and to use a valid HTTPS address.

## How downloading works

Selecting Download does not start a transfer: it opens the New task dialog with the source preset to the Workshop and the work number filled in. Once you confirm, the task appears under [Downloads](/guide/downloads), where you pause, resume, and install it when it finishes.

The point of the split is that fetching files and writing into the game are separate steps: the Workshop only brings the reviewed release down to your machine, and installation still asks you to confirm the files and how conflicts are handled in Downloads.

## About SCNID

`SCNID` is the work number: a positive integer from 1 to 2147483647 that appears on cards, on the details page and in download tasks. It doubles as the sharing and lookup key — in Downloads you can enter the number directly to create a task without opening the Workshop first.
