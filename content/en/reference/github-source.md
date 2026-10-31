---
title: "GitHub source standard"
description: "The manifest and structural requirements a public GitHub repository has to meet to serve as an install source, and how addresses and branches are written."
order: 30
group: "reference"
updated: "2026-11-01"
---

Besides the Workshop, Downloads can fetch a work straight from a public GitHub repository. The repository is the package: the client reads `package.json` in the repository root, validates it against that manifest, then downloads the source archive of that commit. Authors need neither a release nor a zip asset.

This page covers what such a repository has to satisfy. The player-side steps are in [Downloads](/guide/downloads), and the manifest fields are in the [SCNexus package standard](/reference/scnexus-package).

## What the client does

Selecting Check and download makes the app fetch the content in four steps:

1. It resolves the **commit** for that reference from GitHub using the repository URL and branch, then pins it.
2. It reads the `package.json` in that commit's root (capped at 128 KiB), validates it against the SCNexus standard, and requires `version` to be a full semantic version.
3. Once validation passes it shows a preview (name, description, author, version, type, campaign, `SCNID` and whichever other fields the manifest carries); downloading only starts after you confirm.
4. It downloads the source archive of that commit into the download directory and marks it completed; the player then selects Install to enter the usual installation flow.

The key point is the **pinned commit**: the branch is resolved to a concrete commit at preview time and recorded, and the download uses that same commit, so new commits pushed to the branch after the check do not change what this download returns. To pick up a new version, create the task again.

## What the repository has to satisfy

| Requirement | Description |
| --- | --- |
| Public repository | Private repositories are never read and no sign-in is used; the endpoints are fixed to `github.com`, `api.github.com`, `raw.githubusercontent.com` and `codeload.github.com` |
| `package.json` in the root | Only the repository root counts, never a subfolder; one repository holds one work |
| Manifest meets the standard | Fields, types and resource paths are validated against the [SCNexus package standard](/reference/scnexus-package) |
| Full version number | A complete semantic version such as `1.2.3`; `1.2`, `v1.2.3` and "latest" are all rejected |
| Resources really exist | Every `source_path` declared in `maps[]` and `mods[]` must exist in the repository as a file or a component directory |
| Simple archive structure | The archive GitHub produces has a single `<repository>-<commit>/` level, and the work files sit inside it — no nested wrappers |

In plain terms: **the repository root is the package root**. Put `Maps/`, `Mods/` and `package.json` directly under it; adding a `src/` or `pack/` folder for tidiness is read as the manifest not being in the root.

The repository may hold drafts, build scripts and a `README.md` that have nothing to do with installation: they come down with the archive, but only the resources and attachments declared in the manifest are installed.

## How to write the address and branch

The repository URL must look like this:

```text
https://github.com/owner/repository
```

- Only `https://` is accepted — not `http://`, and not a branch path (`/tree/main`) or file path copied from the web interface.
- A trailing `/` is optional, and a trailing `.git` is removed automatically.
- The owner may contain letters, digits and `-` and must start with a letter or digit; the repository name may contain letters, digits and `_ . -` but cannot be `.`, `..` or `.git` alone.
- GitHub Enterprise and other hosts are not supported — the prefix is fixed to `github.com`.

The branch may be a branch name, a tag or a commit, defaulting to `main`:

| Accepted | Rejected |
| --- | --- |
| `main`, `release/1.x`, `v1.2.0`, a full 40-character commit hash | Starting or ending with `/`, containing `..` or `@{`, whitespace, `~ ^ : ? * [ \`, or control characters |

No path segment may start with `.` or end with `.` or `.lock`. A mistake is reported in the dialog straight away, asking for an address in the `https://github.com/owner/repository` form or for a branch name.

## Size and structure

A GitHub source **sets no size threshold of its own**: there is no maximum archive size, and the Workshop's creator quota does not apply. As long as the repository can be pushed and the archive produced, the client will fetch it; the real limits are GitHub's own rules on file and repository size, which are not ours and are not checked here.

Only structural problems are rejected. Before extracting, the client walks the archive's entries; these checks have nothing to do with how large the work is and exist to block archives that cannot be extracted safely:

- Absolute paths, drive letters or `..` in a path, or Windows reserved names (`con`, `aux`, `com1` and the like).
- Two files differing only in case, which would overwrite each other on Windows.
- Paths nested unreasonably deep, or an enormous number of entries — usually a packaging tool that went wrong.
- A total extracted size far beyond any reasonable range (a hard line against archive bombs); ordinary campaigns and mods never come close.

When one of these hits, the dialog reports that the archive structure is unsafe; repack it with a normal directory depth. Reading the manifest has its own separate cap: the root `package.json` may not exceed 128 KiB, and a normal manifest is only a few KB.

When you do want to keep the download small, the reason is usually the player's experience rather than the checks: split the mod into a separate dependency package, declare it in `dependencies`, and let the installer place the upstream first.

## Common failures and their causes

| Symptom | Likely cause |
| --- | --- |
| Unable to create download task, asking you to check that the repository is public, the branch exists and the root `package.json` meets the standard | The repository is private or deleted; the branch, tag or commit is wrong; there is no manifest in the root; a manifest field is invalid; the version is not a full semantic version |
| Fields missing from the preview | The manifest reads fine but `name`, `description`, `author`, `version` and the like are simply absent |
| The task fails and reports a missing resource | A declared `.SC2Map` / `.SC2Mod` is not in the repository, or its case or relative path is wrong |
| The manifest is reported as not being in the root | The work sits in a subfolder, or the repository holds more than one `package.json` |
| The manifest is reported as having changed after the check | Rarely, GitHub returns content that does not match the pinned commit; create the task again |

## How it divides work with the Workshop

A GitHub source is a **distribution channel**, not a publishing channel: nothing is reviewed, there is no version history and no work number is produced. To appear in the Workshop and be downloadable by `SCNID`, a work still has to be created and uploaded in the creator center.

The two can coexist: keep developing in the repository and upload stable versions to the Workshop. Fill the `scnid` field with the number actually assigned to that project; the client will not treat the repository as a Workshop work just because the field is there.
