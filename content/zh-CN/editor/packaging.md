---
title: "打包安装包"
description: "把编辑器产出的地图、模组与 package.json 组织成一个能被星际枢纽自动识别并安装的压缩包。"
order: 10
group: "usage"
updated: "2026-11-01"
---

星际枢纽把压缩包当作安装包处理：解压、校验清单、按清单把 `Maps/`、`Mods/` 落到游戏目录。作者只需要把目录摆对、把清单写全，剩下的由应用自动完成。

本页讲怎么摆目录、怎么少踩坑。字段的完整定义在[星际枢纽压缩包标准](/reference/scnexus-package)，这里不重复列表。

## 目录结构

```text
MyProject.zip
├─ package.json
├─ Maps/
│  └─ MyProject/
│     ├─ Launcher.SC2Map      # 启动器地图
│     ├─ Mission01.SC2Map
│     └─ Mission02.SC2Map
├─ Mods/
│  └─ MyProject.SC2Mod
├─ images/
│  └─ cover.webp
└─ docs/
   └─ README.md
```

- 清单固定叫 `package.json`，放在压缩包根目录，且只能有一份。客户端只认 `package.json`（星际枢纽标准）和 `metadata.txt`（CCM 格式）两个名字，早年文档里的 `metadata.json` **不会被读取**。
- `Maps/`、`Mods/` 是一组作品根目录，两者落在同一层。压缩包外面再套一层文件夹是可以的，应用会向下找到唯一那组；出现两套同级根目录时无法判断该装哪一套，直接判为不支持。
- 上传创意工坊时不要再套外层文件夹，根目录必须直接是清单。

## 清单最小写法

一个自制作品的最小完整清单如下，可以直接改字段名使用：

```json
{
  "name": "我的自制战役",
  "description": "包含启动器和第一章的独立作品。",
  "version": "1.0.0",
  "author": "示例制作组",
  "type": "customize",
  "maps": [
    {
      "name": "Launcher.SC2Map",
      "source_path": "/Maps/MyProject/Launcher.SC2Map"
    },
    {
      "name": "Mission01.SC2Map",
      "source_path": "/Maps/MyProject/Mission01.SC2Map"
    }
  ],
  "mods": [
    {
      "name": "MyProject.SC2Mod",
      "source_path": "/Mods/MyProject.SC2Mod"
    }
  ],
  "launcher": {
    "name": "Launcher.SC2Map",
    "description": "作品主菜单"
  }
}
```

- `source_path` 是包内路径，以 `/Maps/` 或 `/Mods/` 开头，对应压缩包里的 `Maps/`、`Mods/` 目录。
- `name` 是带扩展名的资源名，启动器靠它引用地图，要和实际文件名大小写完全一致。
- 不写 `target_path` 时按 `source_path` 落在游戏目录的同一位置；需要改名落地时才写。

## 用子目录隔开每个作品

把地图、模组都放进以作品命名的子目录（上例的 `Maps/MyProject/`、`Mods/MyProject.SC2Mod`），而不是直接摊在 `Maps/`、`Mods/` 根下。两个作品用了同名文件时，摊在根目录会互相覆盖，覆盖之后很难还原。

替换型战役反过来要放在官方识别的位置：`WOL` 用 `Maps/Campaign/`，`HOTS` 用 `Maps/Campaign/swarm/`，`LOTV` 用 `Maps/Campaign/void/` 与 `voidprologue/`，`NCO` 用 `Maps/Campaign/nova/`。放错区域的地图不会被当成战役内容。

## 三种作品的差别

| 类型 | 额外要求 | 典型内容 |
| --- | --- | --- |
| `campaign` | 必须填 `campaign`（`WOL` / `HOTS` / `LOTV` / `NCO`），地图落在对应战役区域 | 覆盖官方战役的地图与模组 |
| `customize` | 建议声明 `launcher`，指向 `maps` 里唯一一项 | 独立作品、单图、自定义战役 |
| `dependency` | 只写模组，不能写 `maps`、`campaign`、`launcher`、`manager` | 多个作品共用的资源包 |

依赖包用于「先装一次、多个作品共用」的场景。它不会因为别的作品在 `dependencies` 里提到它就自动安装，玩家仍需单独导入安装。

## 图片与说明文档

封面、说明这类展示资料和安装无关，放在包根目录旁边即可：

- 战役用 `banner`，自制作品用 `cover`；省略字段时客户端会按 `cover.jpg` → `cover.png` → `cover.webp` 的顺序在清单同级找。
- `readme`、`changelog` 省略时依次找 `README.txt`、`README.md`、`readme.txt`、`readme.md` 与对应的 `CHANGELOG` 名称。
- 文档里链接到的图片、另一个文档，必须写进 `assets` 白名单才会被保留，例如 `"assets": ["images/**", "docs/*.md"]`。

图片接受 JPEG / PNG / WebP，单张不超过 8 MiB；文档只接受 UTF-8 的 `.md` / `.txt`，单个不超过 1 MiB；附件合计不超过 256 个文件、64 MiB。

## 体积与路径

三条分发渠道的门槛不一样，先看清你要走哪条：

| 渠道 | 体积 |
| --- | --- |
| 创意工坊 | 受**创作者额度**限制：默认每个版本包 ≤ 300 MB（300,000,000 字节），默认最多 5 个作品 |
| GitHub 安装源 | 不设体积上限，只要能推进仓库，客户端就照单取回 |
| 本地导入 | 没有整体体积门槛，只看安装规划能不能算出来 |

额度是按创作者单独分配的，不是全站统一数值：需要更大空间可以向管理员申请，管理员会结合作品体积与存储压力酌情调整，实际数值以创作者中心显示为准。

结构调整检查对三条渠道一视同仁，都在解压前执行，且与作品大小无关：

| 项目 | 上限 |
| --- | --- |
| 归档条目 | ≤ 50 000 |
| 解压后总量 | ≤ 4 GiB |
| 单个路径层级 | ≤ 32 段 |
| 清单文件 | ≤ 128 KiB |

下面这些一律会被拒绝：

- 绝对路径、盘符、`..`，以及越出安装目录的路径。
- 两个只差大小写的同名文件。
- 靠符号链接把包外文件带进安装范围。

## 常见问题

| 现象 | 原因 |
| --- | --- |
| 提示清单不存在或不支持 | 清单不在根目录、文件名不是 `package.json`，或误用了 `metadata.json` |
| 提示资源缺失 | `maps` / `mods` 里声明的文件在包里找不到，或大小写、相对路径写错 |
| 提示目标冲突 | 两个资源落到同一个目标，或文件与目录互相覆盖 |
| 安装后启动不了 | `launcher.name` 没有精确匹配 `maps` 中唯一一项，或地图引用的模组没跟着装 |
| 图片或说明不显示 | 显式路径写错时不会回退探测；文档链接到的附件没进 `assets` |

## 自检清单

1. 压缩包里只有一组 `Maps/`、`Mods/`，且 `package.json` 在根部。
2. `maps[].name` 与实际文件名大小写完全一致，扩展名是 `.SC2Map`。
3. 战役包的地图放在对应战役区域，没有混入别的战役目录。
4. 依赖的模组要么在 `Mods/` 里，要么单独做成依赖包并在作品说明里告知玩家。
5. 在「战役管理」或「自制作品」里导入自己打的包，核对分析结果、目标路径，再实际启动走一遍，然后对外发布。
