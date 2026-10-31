---
title: "贡献翻译"
description: "界面翻译文件的位置与键名规则、提交流程、本地验证方法，以及新增一门界面语言需要改动的代码位置。"
order: 210
group: "contribute"
updated: "2026-11-01"
---

::callout{color="primary" icon="i-lucide-languages"}
**想直接开始翻译？** 界面词条也可以直接在 Crowdin 上翻译，打开 [crowdin.scnexus.net](https://crowdin.scnexus.net/) 认领即可，不必先读完本页。平台目前仍在试运行，机制与限制见文末「Crowdin 翻译平台」；要改仓库里的文件或新增一门语言，再看下面的章节。
::

## 翻译的范围

「星际枢纽」的界面文案随代码放在 [scnexus-client](https://github.com/MengLuoRJ/scnexus) 仓库里，用 [vue-i18n (Next)](https://github.com/intlify/vue-i18n) 加载：一种语言一个目录，一个界面板块一个 JSON 文件。本项目文档站的正文是另一套内容，见文末「文档翻译」。

目前有三种界面语言：

| 语言 | 语言代码 | 目录 | 设置里的名称 |
| --- | --- | --- | --- |
| 简体中文 | `zh` | `packages/app-renderer-v2/src/locales/zh` | 简体中文 |
| English | `en` | `packages/app-renderer-v2/src/locales/en` | English |
| 繁體中文 | `zh-Hant` | `packages/app-renderer-v2/src/locales/zh-Hant` | 繁體中文 |

简体中文是**基准语言**：新增文案先在这里落地，其余语言跟随它的键。

## 翻译文件在哪里

```
packages/app-renderer-v2/src/locales/
├── index.ts        # 注册 zh / en / zh-Hant 三种语言
├── zh/
│   ├── index.ts    # 把本目录所有模块合并后导出
│   ├── ui.json
│   ├── account.json
│   └── … 共 14 个模块
├── en/             # 与 zh 同名同数量的文件
└── zh-Hant/
```

| 模块 | 覆盖的界面 |
| --- | --- |
| `ui.json` | 侧栏与通用按钮、设置页四个标签页、更新与日志隐私 |
| `account.json` | 登录注册、昵称与邮箱、经验等级、签到、两步验证 |
| `campaign.json` | 战役管理的列表、详情、安装分析与激活 |
| `customize.json` | 自制作品列表与启动器地图 |
| `replay.json` | 录像管理：扫描、重复分组、对局分析、导出 |
| `workshop.json` | 创意工坊列表、详情、下载 |
| `downloads.json` | 下载任务列表、来源表单、校验与安装 |
| `weekly.json` | 每周突变与因子库 |
| `toolbox.json` | 创作工具（编码转换等） |
| `aiAssistant.json` | 智能助手与 MCP 连接说明 |
| `contentCenter.json` | 「功能管理」里创意工坊的开关与说明 |
| `creatorActivation.json` | 创作者资格的激活与状态 |
| `content.json` | 内容识别过程与 package.json / metadata.txt 冲突提示 |
| `contentMedia.json` | 作品详情里的说明文档、更新日志与媒体 |

## 键的约定

- **扁平键，带模块前缀**。配置文件开了 `flatJson: true`，键形如 `ui.home`、`campaign.title`，不写成嵌套对象；而且键的前缀必须等于所在文件名，`ui.json` 里只能出现 `ui.` 开头的键。这条由语言资源测试强制检查。
- **值是纯字符串**，不放 HTML 标签，也不写换行。
- **变量用具名占位符**，如 `"累计 {amount} 经验"`。译文里 `{amount}`、`{count}` 这样的占位符要原样保留，名字不能改。
- **不使用复数分段**。现有文案没有 `|` 复数写法，遇到数量请改成「共 {count} 项」这类不依赖单复数的句式。
- **三种语言的键集合必须完全一致**。新增或删除一条文案时三份文件一起改；少一条，`locales.test.ts` 会直接失败。
- 同一功能的键放在一起、按键涉及的界面顺序排列即可，不要求字母序。

## 修改或补充译文

1. Fork [scnexus-client](https://github.com/MengLuoRJ/scnexus)，从 `locales` 分支拉一个新分支。翻译类改动与功能改动分开提交，方便单独审阅；若仓库尚未建立该分支，按仓库 `CONTRIBUTING.md` 的现行说明提交。
2. 只改目标语言的 JSON。除非确实要新增文案，否则不要动 `zh/`——基准语言的改动会带来三份文件同步的问题，应当单独走一次代码 PR。
3. `pnpm install` 后 `pnpm dev` 启动应用，在「设置 → 基本设置 → 界面语言」切到目标语言逐屏检查。语言切换立即生效，不需要重启。
4. 跑一遍语言资源测试（见下节）。它同时校验键是否重复、前缀是否匹配、三种语言的键集合是否一致。
5. 提交 PR，写清改动的模块与对应界面，附上截图更好。

## 本地验证

```bash
# 只跑语言资源相关的测试
pnpm --filter @scnexus/app-renderer-v2 test:unit --run src/locales/__tests__/locales.test.ts

# 只格式化自己改过的那份文件，避免顺带重排整目录带出无关 diff
pnpm exec oxfmt --write packages/app-renderer-v2/src/locales/zh/ui.json
```

测试会检查四件事：每个文件里键不重复、键前缀与文件名一致、`messages[locale]` 与目录内文件合并结果相同、以及 `en` / `zh-Hant` 的键集合与 `zh` 完全一致。

## 提交前的检查清单

- 键名与 `zh` 一一对应，没有删漏，没有自己造前缀
- 占位符 `{…}` 的数量、名称与原文一致
- `en` 文件里没有残留中文；`zh-Hant` 的用词符合台湾用语习惯
- 标点跟随语言习惯（英文用半角加空格，中文用全角）
- 专有名词按下面的术语表处理
- 语言资源测试通过；文件缩进与键顺序跟原文件一致，没有整篇重排

## 术语对照

同一概念在不同模块里必须译法统一，改文案时优先沿用现译：

| 中文 | English | 繁體中文 |
| --- | --- | --- |
| 星际枢纽 | SCNexus | 星際樞紐 |
| 战役管理 | Campaigns | 戰役管理 |
| 自制作品 | Custom content | 自製作品 |
| 创意工坊 | Workshop（设置项中为 SCNexus Workshop） | 創意工坊 |
| 下载管理 / 上传管理 | Downloads / Uploads | 下載管理 / 上傳管理 |
| 创作者中心 | Creator center | 創作者中心 |
| 每周突变 | Weekly mutations | 每週突變 |
| 录像管理 | Replay management | 錄像管理 |
| 智能助手 | Smart Assistant | 智能助手 |
| 创作工具 | Creation Tools | 創作工具 |
| 个人中心 | Personal center | 個人中心 |

作品编号 `SCNID`、格式名 `Maps` / `Mods`、文件名 `package.json` / `metadata.txt` 等保持原文不译。

## 界面语言怎么判定

「界面语言」选了「跟随系统」时，应用按系统语言列表逐条匹配，命中即停：

- 以 `en` 开头 → English；
- 以 `zh` 开头：含 `hant`，或地区为 `tw` / `hk` / `mo` → 繁體中文，其余 → 简体中文；
- 其他语言 → 简体中文。

某条键在目标语言里缺失时会回退显示简体中文，不会出现空白标题；但这只是兜底，正式语言包仍应保持键完整。

## 新增一门界面语言

新增语言不只是放一份翻译，还要在代码里登记。按下面的顺序改：

| 文件 | 需要做的事 |
| --- | --- |
| `packages/app-renderer-v2/src/locales/<code>/` | 新建目录：与 `zh` 同名的 14 个 JSON，加一个合并导出用的 `index.ts` |
| `packages/app-renderer-v2/src/locales/index.ts` | `import` 新语言，加入 `messages` 与 `createI18n({ messages })` |
| `packages/app-shared/src/types/desktop.type.ts` | `DisplayLanguage` 联合类型 |
| `packages/app-shared/src/stores/setting.store.ts` | `DisplayLanguage` 也在这里定义了一份，两处都要改 |
| `packages/app-main/src/stores/setting.ts` | `displayLanguage` 的 JSON Schema `enum` |
| `packages/app-main/src/modules/setting/setting-validation.ts` | 写入校验的允许值数组，以及 `resolveDisplayLanguage()` 的系统语言判定 |
| `packages/app-renderer-v2/src/views/SettingsView.vue` | `languages` 下拉选项（名称用该语言自己的写法） |
| `packages/app-renderer-v2/src/views/weekly-mutations/WeeklyMutationsView.vue` | 突变日期与评分的 `Intl` locale 映射 |
| `packages/app-renderer-v2/src/locales/__tests__/locales.test.ts` | `locales` 数组，否则测试不会覆盖新语言 |

改完跑 `pnpm typecheck` 与 `pnpm test:renderer`。注意有些界面测试断言了具体译文（例如录像页的繁体用例），换了默认语言或在测试里新引用键时需要一并调整。

## Crowdin 翻译平台 :badge[实验中]{color="warning"}

为便于多人协作，我们正在测试用 Crowdin 承载翻译工作；如果希望参与多语言翻译，可以到平台上认领词条：

- [SCNexus Crowdin](https://crowdin.scnexus.net/)

平台上的译文最终仍要合并回仓库，因此上面关于键名、占位符与键集合的约定同样适用。翻译机制仍在调整，具体用法可能变化。

## 文档翻译

文档站（[scnexus-docs](https://github.com/MengLuoRJ/scnexus-docs)）的正文与界面文案分开维护：中文内容在 `content/zh-CN/`，英文在 `content/en/`，同一路径的两个文件即同一篇的中英文版本。「星际枢纽文档」与「参考资料」已全部有英文版，编辑器文档目前仍是中文原文加提示。文档翻译按文档仓库的 PR 流程单独提交，不在本文的界面翻译范围内。

## 特别鸣谢

特别鸣谢 [Crowdin](https://crowdin.com/) 为开源项目提供翻译平台。
