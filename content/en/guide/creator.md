---
title: "Creator center and uploads"
description: "Create works, maintain their details, upload new versions and track upload tasks"
order: 60
group: "usage"
updated: "2026-11-01"
---

## Gaining creator status

The creator center has three prerequisites: the official services and the Workshop switches are both on, you are signed in, and your account holds creator status. Without that status neither Creator center nor Uploads appears in the sidebar; entering the pages by hand drops you back on the personal center without any message.

Creator status lives on the Creator status card in the personal center, with the states not activated, active, revoked, blocked and not loaded. While it is inactive you can redeem an invitation code: select Redeem creator invitation and enter a one-time code of 8–64 letters, digits, underscores or hyphens.

Only once the status is active do Creator center and Uploads appear in the sidebar.

## Creator center

The top of the page is a work switcher for the work you are editing. How many works you can have is set by your **creator quota**: five by default, allocated per creator by an administrator on request when you need more. Create work is disabled once you reach the limit. Selecting a work opens the editor.

### Maintaining the work's details

Form fields and their limits:

| Field | Limit |
| --- | --- |
| Work name | Required, ≤ 120 characters |
| Work website | ≤ 2048 characters |
| Short description | ≤ 1000 characters |
| Social and sponsorship | Fixed keys (Twitter, Discord, YouTube, Weibo, Bilibili, QQ group, PayPal, Patreon, Buy Me a Coffee, Afdian), each ≤ 2048 characters |

The detailed description is a rich-text editor that accepts images: select Upload image to pick a `png`, `jpg` or `webp` file. One work can reference up to 50 images, and an image referenced in the body cannot have its reference removed directly.

Save draft writes to the server. Note the hint on the page: **saving only changes the draft, public content still requires review**. When several people edit the same work and the server copy has moved on, a conflict warns that the project information has changed; copy the text you want to keep first, then select Discard changes and reload to fetch the latest version.

A work that already exists shows a summary line: `SCNID · profile version · status`.

### Submitting a new version

The version area sits below the work:

1. Select Select and validate archive and pick a `zip`, `7z` or `rar` file. The app checks the size against your account quota (300 MB per version package by default), then validates path safety and the manifest; on success it shows the filename, byte count, the version from the manifest and the `SHA-256`, with an expandable package manifest for checking fields.
2. If you want, select Fill from package to prefill the form from the manifest's name, description, website, social and sponsorship fields; it reports that the information was prefilled and should be reviewed before saving.
3. Write the changelog. Any image it references must already exist in the work's image list, otherwise it asks you to save the images first.
4. Select Create version and upload.

The version must be a strict semantic version (such as `1.2.3`). If the manifest declares a work number, it has to match the current work's `SCNID`; otherwise the interface asks for a version such as 1.2.3 and for the archive's project ID to match this project.

**Only one pending version per work at a time.** While a version is being processed the page says a version is already being processed and to finish or cancel it before submitting another. A pending version in draft or awaiting review can be withdrawn with Cancel pending version; if it is still uploading, cancel the upload task in Uploads first.

## Uploads

Uploads lists every upload task, including work image uploads. Each entry shows the name, status, progress, transferred bytes and the `File ID`, and a failure shows the original error text.

The available actions depend on the status:

| Status | Available actions |
| --- | --- |
| Transferring | Pause, cancel |
| Paused / failed | Resume, cancel |
| Completed / cancelled | None |

When the status is unknown, the page says the upload result could not be confirmed and to cancel this task before uploading again — in that case **cancel first, then upload again**; submitting again directly can create a duplicate upload.

Once an upload finishes, the version still has to pass review before it becomes public; the review progress is shown in the version records in the creator center.
