---
title: "Contributing"
description: "How to contribute to SCNexus: where the repositories live, how to set up a development environment, what to run before submitting, the code and documentation conventions, the code of conduct, and how to report security issues."
order: 200
group: "contribute"
updated: "2026-11-01"
---

The code, documentation and translations of SCNexus all come from the community. This page covers where to start and which checks a contribution has to pass. Before you begin, please read the [Code of Conduct](https://github.com/MengLuoRJ/scnexus/blob/main/CODE_OF_CONDUCT.english.md); it applies to every space where this project is discussed.

## What you can contribute

- **Report a bug**: file it in [Issues](https://github.com/MengLuoRJ/scnexus/issues) with the app version, your OS version and reproduction steps; add a screenshot for UI problems.
- **Feature requests**: also in [Issues](https://github.com/MengLuoRJ/scnexus/issues); describing the situation you are in and what you do today is more useful than a list of features.
- **Code**: send a Pull Request against `main`; the environment and the checks are described under "Development environment" and "Before you submit" below.
- **UI translations**: the text lives in `packages/app-renderer-v2/src/locales` and all three languages are kept in sync; see [Translating the interface](/guide/localization) for the details.
- **Documentation**: submit it to [scnexus-docs](https://github.com/MengLuoRJ/scnexus-docs); Chinese and English live in the `content/zh-CN` and `content/en` directories.
- **Answering questions**: QQ group and Discord — links are at the end of [Getting started](/guide).

## Repositories

- **[scnexus](https://github.com/MengLuoRJ/scnexus)**: the desktop app — Electron main process, preload, interface and the package standard.
- **[scnexus-docs](https://github.com/MengLuoRJ/scnexus-docs)**: this site, its documentation and pages.

The server and the website are not open source. Issues with those parts can still be filed in the issue tracker, or sent to [support@scnexus.net](mailto:support@scnexus.net).

## Development environment

The desktop app is a pnpm monorepo and requires Node.js 26 and pnpm 11 or later:

```bash
pnpm install
pnpm run dev
```

Package responsibilities and coding conventions are described in [AGENTS.md](https://github.com/MengLuoRJ/scnexus/blob/main/AGENTS.md) (in Chinese); build, Electron smoke test and packaging commands are documented in [docs/building.md](https://github.com/MengLuoRJ/scnexus/blob/main/docs/building.md). The stack is Electron 45 + Vite 8 + Vue 3 (Composition API) + Nuxt UI 4 + Tailwind CSS 4, with Vitest for tests.

The documentation site is a separate Nuxt project: run `pnpm install` and then `pnpm dev` to preview it locally.

## Before you submit

Run the following from the repository root before submitting a code change:

```bash
pnpm run typecheck
pnpm run lint
pnpm run test
```

- Tests may be limited to the affected part (for example `pnpm run test:main`), but type checking and static analysis must pass in full.
- If you only changed documentation or configuration, run `pnpm run format:check` at minimum.
- Verify interface changes at the **1000×700** main window size, which is the design baseline.

For documentation changes, run `pnpm typecheck` and check the rendered page and its links locally.

## Code conventions

The full specification is in [AGENTS.md](https://github.com/MengLuoRJ/scnexus/blob/main/AGENTS.md); these are the points most easily missed:

- **Keep the boundaries.** The main process owns windows, files, the game process and persistence; the renderer only draws the interface. Cross-process work goes through IPC, and packages never import each other's sources.
- **Types are not a security boundary.** The main process validates arguments and callers at runtime; shared TypeScript types are a development aid only.
- **One way to write components.** Single-file components use `<script lang="ts" setup>` with the Composition API, and state lives in Composition API Pinia stores.
- **Layer the feedback.** Operation results use a toast, decisions use a dialog, and persistent context uses an inline notice.
- **Three languages stay in sync.** When adding or changing text, the `zh`, `en` and `zh-Hant` keys must match.
- **No unnecessary abstraction.** Follow the style of the surrounding code, do not design structures for one-off logic, and do not refactor code that already works.

## Pull requests

- All pull requests target the `main` branch.
- One pull request does one thing: keep feature work separate from translation and formatting changes so each can be reviewed on its own.
- Describe what changed, why, and how you verified it. Paste the commands you ran.
- For interface changes, attach a screenshot or recording and mention how it looks at 1000×700.

## Contributing documentation

Content is organised per language, and two files at the same path are the Chinese and English versions of one page:

```
content/
├── zh-CN/
│   ├── guide/       # SCNexus documentation
│   ├── editor/      # Editor documentation
│   └── reference/   # Reference
└── en/              # same structure as zh-CN
```

Frontmatter decides where a page appears in the sidebar:

| Field | Purpose |
| --- | --- |
| `title` | Page title and sidebar entry |
| `description` | Page description used for search results and SEO |
| `group` | Sidebar group: `start`, `usage`, `contribute`, `reference` |
| `order` | Sort order within the group; lower numbers come first |
| `updated` | Last updated date, shown under the title |

Link to other pages with a site-absolute path such as `/guide/campaign` — no language prefix and no `.md` suffix. Remember to set `order` on new pages, otherwise they land at the end of their group.

## Code of conduct

By taking part you agree to follow the [Code of Conduct](https://github.com/MengLuoRJ/scnexus/blob/main/CODE_OF_CONDUCT.english.md), adapted from Contributor Covenant 2.1:

- Respect different positions, viewpoints and experiences, and criticise ideas rather than people; offer and accept constructive feedback.
- Unacceptable behaviour includes sexualised language or imagery, insults and personal attacks, public or private harassment, and publishing someone's private information without permission.
- Content that violates these rules may be removed, edited or rejected. Responses escalate through correction, warning, temporary ban and permanent ban, depending on severity.

Report abuse, harassment or other unacceptable behaviour to [support@scnexus.net](mailto:support@scnexus.net). Every complaint is reviewed promptly and fairly, and the privacy and safety of the reporter is respected.

## Reporting security issues

Please do **not** report security vulnerabilities through public issues, discussions or chat groups.

- Prefer **GitHub Private Vulnerability Reporting** on the repository (`Security` → `Report a vulnerability`).
- If that channel is unavailable, email [support@scnexus.net](mailto:support@scnexus.net) with the subject prefix `[SCNexus Security]`.

A useful report includes the affected version or commit, your operating system and build type, the impact and the conditions required to trigger it, and reproduction steps or a proof of concept. Do not include real credentials, personal data or third-party content.

These classes of issue are in scope:

- **IPC and process isolation**: bypassing the preload bridge, escaping `contextIsolation` or `sandbox`, reaching Node.js APIs from the renderer.
- **Local service exposure**: unauthenticated or cross-origin access to the loopback service, token leakage, listening on non-loopback interfaces.
- **Archive and file handling**: path traversal, symlink abuse during extraction, archive bombs, writes outside managed directories.
- **Credentials and sessions**: weak credential storage, reading another account's data on the same machine, session confusion between accounts, tokens in logs.
- **Renderer content security**: CSP bypasses, unsafe handling of remote content, navigation to untrusted origins.
- **Update integrity**: tampering with update metadata or packages.
- **Dependencies and supply chain**: a vulnerable dependency reachable from application code.

Issues that require physical access to an unlocked device, that depend on a modified bundle or a disabled signature check, or that come from automated scanners without a demonstrated impact are out of scope. Problems inside third-party components should go upstream.

We normally acknowledge a report within five business days, then work with the reporter to confirm affected versions, assess severity, prepare a fix and agree on a disclosure date. Reporters are credited in the advisory unless they ask to remain anonymous. The project does not run a paid bug bounty.

## Licence

The desktop app is released under the **BSD 3-Clause** licence; the full text is in the repository's `LICENSE`. You may use, modify and redistribute the code, including commercially, provided the copyright notice, licence terms and disclaimer are retained. Code you contribute is released under the same licence.
