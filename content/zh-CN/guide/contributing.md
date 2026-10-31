---
title: "参与开发"
description: "参与「星际枢纽」开发的方式：仓库分工、开发环境、提交前检查、代码与文档约定、行为准则，以及安全问题的报告渠道。"
order: 200
group: "contribute"
updated: "2026-11-01"
---

「星际枢纽」的代码、文档与界面翻译都来自社区。本页说明可以从哪里入手，以及提交之前需要过的检查。开始之前，请先阅读[贡献者公约](https://github.com/MengLuoRJ/scnexus/blob/main/CODE_OF_CONDUCT.md)，它适用于本项目的所有协作场合。

## 可以贡献什么

- **报告缺陷**：在[问题区](https://github.com/MengLuoRJ/scnexus/issues)提交，附上版本号、系统版本与复现步骤；界面问题请附截图。
- **功能建议**：同样在[问题区](https://github.com/MengLuoRJ/scnexus/issues)提交，说清使用场景与现在的做法，比罗列功能更有用。
- **提交代码**：向 `main` 分支提交 Pull Request，开发环境与检查项见下文「开发环境」与「提交前的检查」两节。
- **界面翻译**：文案在 `packages/app-renderer-v2/src/locales`，三种语言同步维护，细则见[贡献翻译](/guide/localization)。
- **修订文档**：在 [scnexus-docs](https://github.com/MengLuoRJ/scnexus-docs) 提交；中文与英文分别放在 `content/zh-CN` 与 `content/en` 两个目录。
- **回答问题**：交流群与 Discord，入口见[快速开始](/guide)页末。

## 仓库分工

- **[scnexus](https://github.com/MengLuoRJ/scnexus)**：桌面应用本体，包含 Electron 主进程、preload、界面与作品包标准。
- **[scnexus-docs](https://github.com/MengLuoRJ/scnexus-docs)**：本站的文档与页面。

服务端与官网的代码不在开源范围内，相关问题仍可在问题区反馈，或发送邮件至 [support@scnexus.net](mailto:support@scnexus.net)。

## 开发环境

桌面应用是 pnpm monorepo，需要 Node.js 26 与 pnpm 11 及以上版本：

```bash
pnpm install
pnpm run dev
```

各包的职责与代码约定见仓库根目录的 [AGENTS.md](https://github.com/MengLuoRJ/scnexus/blob/main/AGENTS.md)；构建、Electron 冒烟与打包验证的命令见 [docs/building.md](https://github.com/MengLuoRJ/scnexus/blob/main/docs/building.md)。技术栈为 Electron 45 + Vite 8 + Vue 3（组合式 API）+ Nuxt UI 4 + Tailwind CSS 4，测试使用 Vitest。

文档站是独立的 Nuxt 项目，`pnpm install` 后 `pnpm dev` 即可预览。

## 提交前的检查

代码改动提交前在仓库根目录执行：

```bash
pnpm run typecheck
pnpm run lint
pnpm run test
```

- 测试可以只跑改动涉及的部分（例如 `pnpm run test:main`），但类型检查与静态检查必须完整通过。
- 只改文档或配置时，至少执行 `pnpm run format:check`。
- 界面改动请在 **1000×700** 的主窗口尺寸下确认布局，这是设计基准。

文档站改动先跑 `pnpm typecheck`，再在本地页面确认链接与渲染结果。

## 代码约定

完整规范见 [AGENTS.md](https://github.com/MengLuoRJ/scnexus/blob/main/AGENTS.md)，以下是容易被忽略的几条：

- **边界清晰**：主进程负责窗口、文件、游戏进程与持久化，渲染进程只做界面；跨进程一律走 IPC，不互相导入源码。
- **类型不是安全边界**：主进程在运行时校验参数与调用来源，共享的 TypeScript 类型只用于开发期。
- **界面写法统一**：单文件组件使用 `<script lang="ts" setup>` 与组合式 API，状态走 Pinia 的组合式 store。
- **提示分层**：操作结果用 toast，需要用户决策用对话框，持续性说明用内联提示。
- **三套语言同步**：新增或修改文案时 `zh`、`en`、`zh-Hant` 的键必须一致。
- **不做多余抽象**：优先沿用相邻代码的写法，不为一次性逻辑设计结构，也不顺手重构能正常运行的代码。

## 提交 Pull Request

- 所有 Pull Request 提交至 `main` 分支。
- 一次 PR 只做一件事：功能改动与翻译、格式化分开提交，方便单独审阅。
- 描述里写清改动内容、原因与验证方式；本地跑过的命令直接贴出来。
- 界面改动附上截图或录屏，说明在 1000×700 下的表现。

## 文档贡献

本站正文按语言分目录，同一路径的两个文件即同一篇的中英文版本：

```
content/
├── zh-CN/
│   ├── guide/       # 星际枢纽文档
│   ├── editor/      # 编辑器文档
│   └── reference/   # 参考资料
└── en/              # 与 zh-CN 相同的目录结构
```

每篇文档的 frontmatter 决定它在侧栏中的位置：

| 字段 | 作用 |
| --- | --- |
| `title` | 页面标题与侧栏条目 |
| `description` | 页面描述，用于搜索结果与 SEO |
| `group` | 侧栏分组：`start`、`usage`、`contribute`、`reference` |
| `order` | 同一分组内的排序，数字小的在前 |
| `updated` | 最后更新日期，显示在标题下方 |

正文里的站内链接写站内绝对路径（如 `/guide/campaign`），不要带语言前缀，也无需写 `.md` 后缀。新增页面时记得同时给出 `order`，否则会落到分组末尾。

## 社区行为准则

参与本项目即表示同意遵守[贡献者公约](https://github.com/MengLuoRJ/scnexus/blob/main/CODE_OF_CONDUCT.md)（改编自 Contributor Covenant 2.1）：

- 尊重不同的主张、观点与感受，对事不对人；提出并接受建设性意见。
- 不欢迎的行为包括色情化的语言或图像、侮辱与人身攻击、公开或私下骚扰、未经许可公布他人私人信息。
- 违规内容可能被删除、编辑或拒绝，处理方式按情节分为纠正、警告、临时封禁与永久封禁。

辱骂、骚扰或其他不可接受的行为可发送邮件至 [support@scnexus.net](mailto:support@scnexus.net) 报告，所有投诉都会被及时、公平地处理，报告者的隐私与安全会被尊重。

## 报告安全问题

安全漏洞**不要**通过公开的 issue、讨论区或群聊报告。

- 优先使用仓库的 **GitHub Private Vulnerability Reporting**（`Security` → `Report a vulnerability`）；
- 该渠道不可用时，发送邮件至 [support@scnexus.net](mailto:support@scnexus.net)，标题加上 `[SCNexus Security]` 前缀。

报告中请写明受影响的版本或提交、操作系统与构建方式、影响与触发条件、复现步骤或验证代码；请勿附带真实的账号凭据、个人信息或第三方内容。

以下问题属于受理范围：

- **IPC 与进程隔离**：绕过 preload 桥接、突破 `contextIsolation` 或 `sandbox`、从渲染进程触达 Node.js 接口。
- **本地服务暴露**：未授权或跨源访问本机回环服务、令牌泄漏、监听非回环地址。
- **压缩包与文件处理**：路径穿越、解压时的符号链接滥用、压缩炸弹、越界写入。
- **凭据与会话**：凭据存储缺陷、同机读取他人账号数据、账号间会话混淆、令牌写入日志。
- **渲染内容安全**：CSP 绕过、远程内容处理不当、跳转到不可信来源。
- **更新完整性**：篡改更新元数据或更新包。
- **依赖与供应链**：应用代码可达的脆弱依赖。

需要物理接触已解锁设备、依赖被篡改的安装包或关闭签名校验的问题，以及仅由自动化扫描器给出、没有影响证明的报告，不在受理范围内。第三方组件本身的问题请报告给上游。

收到报告后，我们通常在五个工作日内确认，随后与报告者一起确认受影响版本、评估严重程度、准备修复并商定披露时间；修复发布时会（在报告者同意的前提下）致谢。本项目不设漏洞赏金。

## 许可

桌面应用以 **BSD 3-Clause** 发布，完整文本见仓库的 `LICENSE`。在该许可下，你可以自由使用、修改与再分发代码，也可以用于商业目的；分发时须保留版权声明、许可条款与免责声明。你提交的代码将按同一许可发布。
