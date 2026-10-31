---
title: "星际枢纽压缩包标准"
description: "星际枢纽作品包的目录结构、package.json 清单字段、地图与模组资源声明、启动器与包内资料的写法。"
order: 10
group: "reference"
updated: "2026-11-01"
---

「星际枢纽」把压缩包直接当作安装包：玩家导入后，应用解压、读取清单、生成安装规划，再把地图与模组按声明落到游戏目录。作者只要把目录摆对、把清单写全，安装过程全自动。

本页是这份清单的字段定义。清单文件名为 `package.json`——它是**星际枢纽作品清单**，与 Node.js 项目的依赖配置无关；清单里出现脚本或网址不会被当作代码执行。

## 包的基本形状

```text
我的作品/
├─ package.json
├─ Maps/
│  └─ MyProject/
│     ├─ Launcher.SC2Map
│     └─ Chapter01.SC2Map
└─ Mods/
   └─ MyProject.SC2Mod
```

- 清单放在压缩包根目录，且只能有一份。上传创意工坊时根目录必须直接是清单，不要再套一层「我的作品」文件夹；本地导入具备向下查找的兼容能力，但新作品不要依赖它。
- `Maps/`、`Mods/` 是**逻辑路径前缀**，不是磁盘绝对路径。清单里的 `source_path` 相对包根目录计，`target_path` 相对游戏目录计，都不要填作者电脑上的路径。
- 清单是 UTF-8 编码的标准 JSON：不写注释、不写尾随逗号、不重复字段名。

## 作品类型

| `type` | 含义 | 安装后的行为 |
| --- | --- | --- |
| `campaign` | 替换对应官方战役的作品 | 在「战役管理」里激活后，从游戏进入该战役 |
| `customize` | 独立的自制地图或作品 | 安装到声明位置，可用启动器地图从客户端启动 |
| `dependency` | 多个作品共用的模组包 | 可独立安装与卸载，只提供模组资源 |

`campaign` 还必须给出 `campaign` 字段，取值与对应的地图区域如下：

| 值 | 战役 | 客户端识别的地图区域 |
| --- | --- | --- |
| `WOL` | 自由之翼 | `/Maps/Campaign/`，不含其他战役子目录 |
| `HOTS` | 虫群之心 | `/Maps/Campaign/swarm/`，含 `evolution/` |
| `LOTV` | 虚空之遗 | `/Maps/Campaign/void/` 与 `/Maps/Campaign/voidprologue/` |
| `NCO` | 诺娃隐秘行动 | `/Maps/Campaign/nova/` |

依赖包（`dependency`）不允许声明 `maps`、`campaign`、`manager`、`launcher`、`dependencies`、`localization` 以及存档相关字段。

## 基础字段

以下字段三种类型通用。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `type` | 字符串 | 是 | `campaign`、`customize`、`dependency` 之一 |
| `name` | 字符串 | 是 | 作品名称，不能是空白 |
| `description` | 字符串 | 是 | 作品简介 |
| `version` | 字符串 | 是 | 作品版本，建议直接使用语义化版本 |
| `author` | 字符串 | 是 | 作者或制作团队 |
| `scnid` | 数字 | 否 | 创意工坊项目编号，非负安全整数，不能写成字符串 |
| `tags` | 字符串数组 | 否 | 作品标签 |
| `website` | 字符串 | 否 | 作品网站 |
| `social` | 对象 | 否 | 社交信息，见下 |
| `sponsor` | 对象 | 否 | 赞助渠道，见下 |
| `$schema` | 字符串 | 否 | 编辑器用的 JSON Schema 地址，不是格式版本号 |
| `readme` | 字符串 | 否 | 包内说明文档路径 |
| `changelog` | 字符串 | 否 | 包内更新日志路径 |
| `docs` | 字符串数组 | 否 | 额外包内文档路径列表 |
| `assets` | 字符串数组 | 否 | 其他展示附件的白名单，支持 `*` 与 `**` |

版本号推荐写成 `主版本.次版本.修订版本`，例如 `1.2.3`；预发布与构建元数据可写成 `1.2.3-beta.1`、`1.2.3+build.5`。不要用 `v1.2.3`、`最新版` 或 `1.2` 作为发布版本。清单校验只要求 `version` 是合法文本，工坊上传与 GitHub 安装源另有完整的语义化版本检查。

`social` 支持 `twitter`、`discord`、`youtube`、`weibo`、`bilibili`、`qq_group`；`sponsor` 支持 `paypal`、`patreon`、`buymeacoffee`、`afdian`。值都是字符串：

```json
{
  "website": "https://example.com/project",
  "social": {
    "bilibili": "https://space.bilibili.com/123456",
    "qq_group": "123456789"
  },
  "sponsor": {
    "afdian": "https://example.com/support"
  }
}
```

不要编造创意工坊项目编号；关联工坊时填该项目实际分配的 `scnid`。社交与赞助信息不保证在客户端每个页面都展示。

## 资源声明

地图与模组分别写在 `maps`、`mods` 两个数组里。地图文件扩展名是 `.SC2Map`，模组是 `.SC2Mod`，检查时不区分大小写。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `name` | 字符串 | 是 | 带扩展名的资源名，启动器通过它引用地图 |
| `source_path` | 字符串 | 是 | 包内路径，地图以 `/Maps/` 开头，模组以 `/Mods/` 开头 |
| `target_path` | 字符串 | 否 | 游戏目录中的目标逻辑路径，省略时沿用 `source_path` |
| `description` | 字符串 | 否 | 资源说明 |
| `version` | 字符串 | 否 | 资源自身版本，不代替作品版本 |
| `components` | 布尔值 | 否 | 资源以组件目录形式保存；实际以文件结构为准 |

```json
{
  "name": "Launcher.SC2Map",
  "source_path": "/Maps/MyProject/Launcher.SC2Map",
  "target_path": "/Maps/MyProject/Start.SC2Map"
}
```

上例读取包内 `Maps/MyProject/Launcher.SC2Map`，安装为游戏目录下的 `Maps/MyProject/Start.SC2Map`。`target_path` 要和地图里实际引用的资源路径一致，不能为了好看随便改。

路径规则：

- 统一用 `/`，`/Maps/`、`/Mods/` 前缀大小写要准确。
- 不允许盘符、网络共享路径、`.`、`..`，也不允许越出安装目录。
- 声明的资源必须真实存在；同一个目标不能被两个资源覆盖，文件与目录也不能相互冲突。
- 不通过符号链接把包外文件带进安装范围。
- 组件形式的地图或模组声明整个资源根目录即可，不要逐个列出内部文件。

## 启动器

自制作品可以声明 `launcher`：

```json
"launcher": {
  "name": "Launcher.SC2Map",
  "description": "作品主菜单"
}
```

`launcher.name` 必须精确匹配 `maps` 中**唯一**一项的 `name`，不是文件路径，也不是安装后的 `target_path`。

未声明时，客户端会尝试识别 `Launcher.SC2Map`、`启动器.SC2Map` 这类常见名称，并在安装确认界面让玩家选择；安装后也能在作品详情里重新选择。玩家的本地选择不会改写作者原清单。

## 附带的图片与文档

战役可声明 `banner`，自制作品可声明 `cover`，两者不能互换或同时出现；依赖包两者都不允许。三种类型都可以声明 `readme`、`changelog`、`docs`、`assets`。

```json
{
  "cover": "images/cover.webp",
  "readme": "docs/README.md",
  "changelog": "docs/CHANGELOG.txt",
  "docs": ["docs/guide.md", "docs/credits.txt"],
  "assets": ["images/**", "docs/*.md"]
}
```

这些路径都相对**压缩包根目录**，推荐写成不带起始 `/` 的形式。清单只声明路径，不检查文件是否存在；真实读取、安全校验与展示由客户端负责。

字段省略时，客户端按固定顺序在清单同级探测默认名称（精确匹配，区分大小写）：

| 字段 | 探测顺序 |
| --- | --- |
| `banner`（仅战役） | `banner.jpg` → `banner.png` → `banner.webp` |
| `cover`（仅自制） | `cover.jpg` → `cover.png` → `cover.webp` |
| `readme` | `README.txt` → `README.md` → `readme.txt` → `readme.md` |
| `changelog` | `CHANGELOG.txt` → `CHANGELOG.md` → `changelog.txt` → `changelog.md` |

显式写了图片路径但文件不存在或无法加载时，直接使用客户端默认图片，不再探测同级文件；显式写了文档路径但缺失时，忽略该文档，同样不回退探测。`docs` 只读列表里的文件，不扫描目录。

`assets` 是**其他附件**的白名单。显式声明的图片、`readme`、`changelog`、`docs` 以及省略字段时的默认候选会自动纳入，无需重复列举；除此之外的附件，包括文档里链接到的图片和另一个文档，都必须匹配 `assets`。不写或写 `[]` 表示不保留任何未列出的附件。

白名单只支持单段内的 `*` 与独立路径段的 `**`：`images/*.png` 不匹配 `images/sub/a.png`，`images/**/*.png` 两级都匹配，`**/*.md` 也能匹配根目录的 `guide.md`。不支持 `?`、方括号、花括号、否定规则与段内 `**`。

当前客户端的读取上限：

| 项目 | 限制 |
| --- | --- |
| 图片格式与大小 | JPEG / PNG / WebP，单文件 ≤ 8 MiB，解码后统一转为 PNG 展示 |
| 文档格式与大小 | UTF-8 的 `.md` / `.txt`，单文件 ≤ 1 MiB |
| 附件总量 | 最多 256 个文件，合计 ≤ 64 MiB |
| 文档内链接 | 只能指向同一作品包内的 `.md` / `.txt`，可带标题片段；不加载远程资源 |

附件以客户端管理的私有副本形式保存，删掉原始压缩包或来源目录后仍能读取，后续扫描也不会丢弃。

## 其他可选字段

以下字段仅战役与自制作品可用。

| 字段 | 结构 | 当前含义 |
| --- | --- | --- |
| `localization` | 对象数组 | 每项含必填 `locale`，以及可选的 `name`、`description`、`author`、`version`、`translators`；声明不保证界面已按语言切换 |
| `dependencies` | 对象数组 | 每项可含 `scnid` 与 `version`；只描述依赖，不会自动下载或安装 |
| `bank_enable` | `"official"` 或 `"custom"` | 存档模式声明，不代表已实现存档迁移 |
| `banks` | 对象数组 | 每项含 `name` 与可选 `description` |
| `manager` | `"SCNexus"` 或 `"CCM"` | 声明作品的管理器；不能让任意目录布局变成 CCM 包 |

新作品用不到的可选字段直接省略，不要用空字符串或编造值把字段填满。

## 校验分三层

| 层次 | 检查内容 |
| --- | --- |
| JSON Schema | 字段名、类型、枚举与未声明字段，适合编辑器里做提示 |
| 清单校验 | 基本结构、类型是否为三种之一、战役值是否合法、启动器是否对应唯一地图、资源路径前缀 |
| 客户端安装 | 资源是否真实存在、路径边界、压缩包安全性、目标冲突；安装前还会给出文件规划让玩家确认 |

结构合法不等于能装，也不等于作品经过安全检测。压缩包本身另有约束：条目数、解压后总大小、路径层级、大小写冲突等都会被检查。

## 发布前检查

1. 清单是有效 UTF-8 JSON，基本信息完整，`name` 不是空白。
2. `type` 与作品用途一致；替换型战役填了正确的 `campaign`。
3. 包内资源真实存在，`source_path` 与地图、模组里的引用对得上。
4. 启动器写在 `launcher` 里，且精确对应唯一一张地图。
5. 工坊压缩包的根目录直接是唯一的 `package.json`。
6. 在客户端的导入分析里核对目标文件，再实际启动作品走一遍。

创作侧怎么摆目录、怎么把编辑器产出打成包，见[打包安装包](/editor/packaging)；玩家侧怎么导入与安装，见[战役管理](/guide/campaign)与[自制作品](/guide/customize)。
