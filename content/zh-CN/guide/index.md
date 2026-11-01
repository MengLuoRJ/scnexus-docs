---
title: "快速开始"
description: "「星际枢纽」是一款专为星际社区服务的枢纽应用"
order: 1
group: "start"
updated: "2026-11-01"
---
「星际枢纽」是一款专为星际社区服务的枢纽应用，当前版本提供以下能力：

- **[战役管理](/guide/campaign)**：集中管理本地战役库，导入压缩包或文件夹时自动识别并分析内容类型与文件结构，无需手动选择安装模式；安装与激活分离，激活后才覆盖游戏战役，可随时取消激活或卸载。
- **[自制作品](/guide/customize)**：同样通过自动识别分析导入来源，将地图与模组直接安装到游戏的 Maps / Mods 目录，无需激活；可指定启动器地图并一键启动，卸载时按需保留本地改动。
- **[每周突变](/guide/weekly-mutations)**：查看本周突变的任务地图、突变因子与社区评分，支持国服、美服、欧服、亚服，并区分服务端核验与轮换推算结果。
- **[录像管理](/guide/replays)**：按星际资料与录像类型索引本地录像，标记重复文件、批量导出，并查看资源曲线与生产时间线。
- **[创意工坊](/guide/workshop)**：浏览、搜索社区作品并查看详情，下载已审核的发布版本。
- **[创作者中心](/guide/creator)**：具备创作者资格后可创建作品、维护介绍与更新日志、上传新版本，并在上传管理中跟踪传输。
- **[下载管理](/guide/downloads)**：从星际枢纽创意工坊按作品编号（SCNID）下载已审核发布版本，或从 GitHub 公开仓库获取内容；统一查看进行中与历史记录，下载完成后手动确认安装。
- **[创作工具](/guide/tools)**：提供编码转换等本地辅助工具，全部在本地完成，不上传也不保存输入内容。
- **[智能助手](/guide/ai-assistant)**：可选的本地受控 MCP 服务，仅监听本机回环地址，供本机 AI 客户端查询数据与处理战役文件。
- **[账号与个人中心](/guide/account)**：账号登录、昵称与邮箱、经验等级与每日签到、两步验证。
- **[设置](/guide/settings)**：语言、下载目录、游戏目录、功能开关、日志等级与遥测等均在设置中管理。

## 离线功能与官方在线服务

「星际枢纽」的能力分为两层：核心功能全部在本地完成，「星际枢纽」官方在线服务只作为扩展能力存在，是否开启由玩家自行决定。

| 类别 | 包含能力 | 是否需要官方在线服务 |
| --- | --- | --- |
| 离线功能 | 战役管理、自制作品、录像管理、创作工具、下载管理、智能助手 | 否。不需要登录，也不依赖官方服务；下载任务本身仍需要网络连接。 |
| 官方在线服务（扩展） | 创意工坊与创作者中心、每周突变在线校准、账号与成长 | 是。需要登录，可在「设置 → 功能管理」中随时开启或关闭。 |

官方在线服务是可选扩展，不开启也不影响离线功能。关闭后应用不再请求官方内容接口、清除本地登录状态并隐藏创意工坊入口，已存在的工坊任务与已下载的文件保留，重新开启后可手动恢复。

战役的导入、安装、激活与卸载，自制作品的安装与启动，以及智能助手均可照常使用；每周突变改用本地数据与规则显示，GitHub 下载不受影响。在线统计由独立开关控制，与上述切换无关。

## 获取应用程序

<div class="not-prose my-6 grid gap-4 sm:grid-cols-2">
  <a href="https://release.scnexus.net/stable/latest" style="text-decoration:none" class="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700">
    <span class="flex items-center justify-between gap-3">
      <span class="text-[11px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300">直接下载</span>
      <span class="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">Windows x64</span>
    </span>
    <span class="mt-3 text-base font-semibold text-slate-900 dark:text-white">安装程序（直链）</span>
    <span class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">下载 NSIS 安装包，运行后按提示完成安装，适合大多数用户。</span>
  </a>
  <div class="flex flex-col rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-5 dark:border-slate-700 dark:bg-slate-900/40">
    <span class="flex items-center justify-between gap-3">
      <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">应用商店</span>
      <span class="rounded-full bg-slate-200/70 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">暂不可用</span>
    </span>
    <span class="mt-3 text-base font-semibold text-slate-900 dark:text-white">微软商店</span>
    <span class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">商店版本存在运行问题，目前不提供下载，请使用上方的安装程序。</span>
  </div>
</div>

<!-- 商店版本恢复后可直接启用此入口
<a href="https://apps.microsoft.com/store/detail/9PL7DCMCN13X?launch=true&mode=full">
	<img src="https://get.microsoft.com/images/zh-CN%20dark.svg" />
</a>
-->

## 更新与卸载

**更新**：打开应用内的「设置 → 基本设置 → 版本与更新」，点击「检查更新」；发现可用更新时可直接下载安装。也可以直接下载[本页提供的最新安装程序](#获取应用程序)，覆盖安装即可完成升级。

**卸载**：通过 Windows 的「设置 → 应用 → 已安装的应用」，或「控制面板 → 程序和功能」，找到「星际枢纽」并卸载。

## 交流社区

<div class="not-prose my-6 grid gap-4 sm:grid-cols-2">
  <a href="https://qm.qq.com/cgi-bin/qm/qr?k=IgP5DkVYkL-VlgMPESNmRaPiYFCQLrNI&jump_from=webapi&authKey=IH1aC/1uFvcRC43U2h3R4Ms2YhbMg082p4RTMSV4GHZSRmfIyLjJodIwwf8wAdL4" style="text-decoration:none" class="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700">
    <span class="text-[11px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300">QQ</span>
    <span class="mt-3 text-base font-semibold text-slate-900 dark:text-white">星际枢纽中文用户交流群</span>
    <span class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">群号 857601125 · 适合提问、反馈与闲聊。</span>
  </a>
  <a href="https://discord.gg/U6EbQKdkH2" style="text-decoration:none" class="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700">
    <span class="text-[11px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300">Discord</span>
    <span class="mt-3 text-base font-semibold text-slate-900 dark:text-white">SCNexus 服务器</span>
    <span class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">discord.gg/U6EbQKdkH2 · 面向英文与跨时区用户。</span>
  </a>
</div>

## 声明

星际枢纽（SCNexus）应用程序由独立开发者制作，星际枢纽应用程序和开发者团队与暴雪娱乐有限公司没有任何关联，也未获得暴雪娱乐有限公司的支持或赞助。

星际争霸、“星际争霸”商标是暴雪娱乐有限公司的注册商标。暴雪娱乐有限公司保留所有权利。
