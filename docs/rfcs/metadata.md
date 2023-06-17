## 压缩安装包元数据标准

“星际枢纽”应用程序支持将打包作品（地图/模组）的压缩包文件作为安装包，进行自动解压安装流程；为保证该过程正确执行，内容作者需要在压缩包文件夹内添加元数据文件，以定义作品相关信息并用于告知“星际枢纽”应用程序自解压安装方式。

## 元数据文件

元数据文件应该以 `metadata.json` 命名，并采用 [JSON](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON) 标准语法进行编写。该元数据文件应该放置在压缩安装包内，与其他作品（地图/模组，Maps/Mods）文件一同处于压缩包同级目录。

### 文件名称

元数据文件应严格使用  `metadata.json` 命名，`metadata` 为文件名称，`json` 为文件扩展名。

### 文件内容格式

文件内容类型定义：

``` ts
type Metadata = {
  name: string;
  description: string;
  website?: string;
  author: string;
  version: string;
  type: "WOL" | "HOTS" | "LOTV" | "NCO" | "CUSTOM";
  maps?: {
    name: string;
    description: string;
  }[];
  dependencies?: {
    name: string;
    description: string;
  }[];
};
```

## 额外支持

“星际枢纽”应用程序同时也将支持 [CCM](https://github.com/7thAce/SC2CCM) 的元数据文件标准，将对其所采用的 `metadata.txt` 元数据文件进行基本支持。

