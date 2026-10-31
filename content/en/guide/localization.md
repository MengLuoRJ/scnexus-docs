---
title: "Translating the interface"
description: "Where the interface translation files live, how keys are named, how to submit changes, how to verify them locally, and what adding a language touches."
order: 210
group: "contribute"
updated: "2026-11-01"
---

::callout{color="primary" icon="i-lucide-languages"}
**Want to start translating right away?** The interface strings can also be translated directly on Crowdin — open [crowdin.scnexus.net](https://crowdin.scnexus.net/) and claim the strings; you do not have to read this page first. The platform is still in trial, and how it works is described under Crowdin translation platform at the end. If you want to change files in the repository or add a language, carry on with the sections below.
::

## What the translations cover

The interface strings of SCNexus live with the code in the [scnexus-client](https://github.com/MengLuoRJ/scnexus) repository and are loaded with [vue-i18n (Next)](https://github.com/intlify/vue-i18n): one directory per language, one JSON file per part of the interface. The body text of this documentation site is a separate body of content, covered under Documentation translation below.

There are three interface languages today:

| Language | Code | Directory | Name in the settings |
| --- | --- | --- | --- |
| Simplified Chinese | `zh` | `packages/app-renderer-v2/src/locales/zh` | 简体中文 |
| English | `en` | `packages/app-renderer-v2/src/locales/en` | English |
| Traditional Chinese | `zh-Hant` | `packages/app-renderer-v2/src/locales/zh-Hant` | 繁體中文 |

Simplified Chinese is the **source language**: new strings land there first, and the other languages follow its keys.

## Where the translation files live

```
packages/app-renderer-v2/src/locales/
├── index.ts        # registers zh / en / zh-Hant
├── zh/
│   ├── index.ts    # merges and exports every module in this directory
│   ├── ui.json
│   ├── account.json
│   └── … 14 modules in total
├── en/             # the same files, with the same names
└── zh-Hant/
```

| Module | What it covers |
| --- | --- |
| `ui.json` | Sidebar and shared buttons, the four settings tabs, updates and logging privacy |
| `account.json` | Sign-in and sign-up, nickname and email, levels, check-in, two-step verification |
| `campaign.json` | Campaign lists, details, installation analysis and activation |
| `customize.json` | The custom content list and launcher maps |
| `replay.json` | Replays: scanning, duplicate grouping, match analysis, export |
| `workshop.json` | Workshop list, details, download |
| `downloads.json` | Download task list, source forms, verification and installation |
| `weekly.json` | Weekly mutations and the mutator reference |
| `toolbox.json` | Creation tools (the encoding converter and friends) |
| `aiAssistant.json` | Smart Assistant and the MCP connection notes |
| `contentCenter.json` | The Workshop switch and its explanation in Feature management |
| `creatorActivation.json` | Redeeming and reporting creator status |
| `content.json` | Content identification and the package.json / metadata.txt conflict prompt |
| `contentMedia.json` | Package documents, changelogs and media on the work details page |

## Key conventions

- **Flat keys with a module prefix.** The configuration enables `flatJson: true`, so keys look like `ui.home` or `campaign.title` rather than nested objects, and the prefix has to match the filename — `ui.json` may only contain keys starting with `ui.`. A test enforces this.
- **Values are plain strings** — no HTML tags and no line breaks.
- **Variables use named placeholders** such as `"{amount} total XP"`. Placeholders like `{amount}` and `{count}` must be kept verbatim in a translation; their names cannot change.
- **No plural segments.** The existing strings have no `|` plural forms, so phrase counts in a way that works for any number, for example "Total: {count}".
- **The three languages must have exactly the same key set.** Adding or removing a string means touching all three files; a missing key fails `locales.test.ts` immediately.
- Group the keys of one feature together in the order the interface presents them; alphabetical order is not required.

## Changing or adding a translation

1. Fork [scnexus-client](https://github.com/MengLuoRJ/scnexus) and branch off `locales`. Translation changes and feature changes go into separate pull requests so each can be reviewed on its own; if that branch does not exist yet, follow the repository's current `CONTRIBUTING.md`.
2. Change only the target language's JSON. Unless you genuinely need a new string, leave `zh/` alone — changing the source language means keeping three files in step and deserves its own code pull request.
3. Run `pnpm install`, then `pnpm dev`, switch the interface language under Settings → General → Display language and check screen by screen. The switch takes effect immediately, with no restart.
4. Run the language resource tests (next section). They check for duplicate keys, matching prefixes and identical key sets across the three languages.
5. Open the pull request, naming the modules and screens you touched; screenshots help.

## Verifying locally

```bash
# only the language resource tests
pnpm --filter @scnexus/app-renderer-v2 test:unit --run src/locales/__tests__/locales.test.ts

# format only the file you changed, so reformatting does not drag the whole directory into the diff
pnpm exec oxfmt --write packages/app-renderer-v2/src/locales/zh/ui.json
```

The tests check four things: no duplicate keys within a file, key prefixes matching the filename, `messages[locale]` matching what the directory merges to, and the `en` / `zh-Hant` key sets matching `zh` exactly.

## Checklist before submitting

- Keys line up one-to-one with `zh` — nothing dropped, nothing invented, no home-made prefixes
- Placeholders `{…}` match the original in both count and name
- No Chinese left in the `en` files; `zh-Hant` uses Taiwanese vocabulary
- Punctuation follows each language (half-width with spaces in English, full-width in Chinese)
- Proper nouns follow the glossary below
- The language resource tests pass; indentation and key order still match the original file, with no wholesale reformatting

## Glossary

One concept has one translation across modules; when editing, keep the existing wording:

| Chinese | English | Traditional Chinese |
| --- | --- | --- |
| 星际枢纽 | SCNexus | 星際樞紐 |
| 战役管理 | Campaigns | 戰役管理 |
| 自制作品 | Custom content | 自製作品 |
| 创意工坊 | Workshop (SCNexus Workshop for the setting) | 創意工坊 |
| 下载管理 / 上传管理 | Downloads / Uploads | 下載管理 / 上傳管理 |
| 创作者中心 | Creator center | 創作者中心 |
| 每周突变 | Weekly mutations | 每週突變 |
| 录像管理 | Replay management | 錄像管理 |
| 智能助手 | Smart Assistant | 智能助手 |
| 创作工具 | Creation Tools | 創作工具 |
| 个人中心 | Personal center | 個人中心 |

Work numbers (`SCNID`), format names (`Maps` / `Mods`) and filenames (`package.json` / `metadata.txt`) stay as they are.

## How the interface language is chosen

With Display language set to System default, the app walks the system's language list and stops at the first match:

- starting with `en` → English;
- starting with `zh`: `hant` anywhere, or a region of `tw` / `hk` / `mo` → Traditional Chinese, otherwise Simplified Chinese;
- anything else → Simplified Chinese.

A key missing from the target language falls back to Simplified Chinese rather than leaving a blank label, but that is only a safety net — shipped language packs should stay complete.

## Adding an interface language

A new language is more than a set of translations: it has to be registered in code. Work through these in order:

| File | What to do |
| --- | --- |
| `packages/app-renderer-v2/src/locales/<code>/` | Create the directory: the same 14 JSON files as `zh`, plus an `index.ts` that merges and exports them |
| `packages/app-renderer-v2/src/locales/index.ts` | `import` the new language and add it to `messages` and `createI18n({ messages })` |
| `packages/app-shared/src/types/desktop.type.ts` | The `DisplayLanguage` union |
| `packages/app-shared/src/stores/setting.store.ts` | `DisplayLanguage` is declared here as well; both places need the change |
| `packages/app-main/src/stores/setting.ts` | The JSON Schema `enum` for `displayLanguage` |
| `packages/app-main/src/modules/setting/setting-validation.ts` | The allowed-values array used when writing, and the system-language matching in `resolveDisplayLanguage()` |
| `packages/app-renderer-v2/src/views/SettingsView.vue` | The `languages` dropdown options (each name written in its own language) |
| `packages/app-renderer-v2/src/views/weekly-mutations/WeeklyMutationsView.vue` | The `Intl` locale mapping for mutation dates and ratings |
| `packages/app-renderer-v2/src/locales/__tests__/locales.test.ts` | The `locales` array, otherwise the tests ignore the new language |

Finish with `pnpm typecheck` and `pnpm test:renderer`. Some interface tests assert on actual strings (the Traditional Chinese replay cases, for instance), so they need adjusting when the default language changes or a test starts referencing new keys.

## Crowdin translation platform :badge[experimental]{color="warning"}

To make collaboration easier we are trialling Crowdin as the home of translation work; if you would like to help with languages, you can claim strings on the platform:

- [SCNexus Crowdin](https://crowdin.scnexus.net/)

Translations made there still end up merged back into the repository, so the conventions above about keys, placeholders and key sets apply just the same. The workflow is still being adjusted, so the specifics may change.

## Documentation translation

The body text of this site ([scnexus-docs](https://github.com/MengLuoRJ/scnexus-docs)) is maintained separately from the interface strings: Chinese lives in `content/zh-CN/`, English in `content/en/`, and two files at the same path are the two language versions of one page. The app documentation and the reference section are fully translated; the editor documentation is still the Chinese text with a notice. Documentation translation goes through the docs repository's pull request flow and is outside the scope of this page.

## Thanks

Special thanks to [Crowdin](https://crowdin.com/) for providing a translation platform to open-source projects.
