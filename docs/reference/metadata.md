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
  snid?: string;
  name: string;
  description: string;
  version: string;
  author: string;
  /**
   * Type of the metadata.
   * @value `Campaign` | `Customize`
   */
  type: MetadataType;
  /**
   * The campaign type of the Customize if the type is `Campaign`.
   * @value `WOL` | `HOTS` | `LOTV` | `NCO`
   * @default undefined
   */
  campaign?: CampaignType;
  /**
   * The luancher map file which will be run when player play this customize.
   */
  luancher?: {
    map_name: string;
  };
  /**
   * Relative path to the Maps folder from the map file.
   * Not used as default when the map files are in the root of the Maps folder.
   *
   * **Recommended** to set this key to avoid the conflict with other Customizes.
   *
   * Default set to `undefined` which means `<GameRoot>/Maps/*`
   * @default undefined
   */
  maps_directory?: string;
  /**
   * Informations about *.SC2Map files.
   *
   * **File Path:** `<GameRoot>/Maps/<maps_directory>/<map.relative_path>/<map.name>`
   */
  maps?: {
    /**
     * Name of the map file, should with `.SC2Map` extension.
     * @example `Level1.SC2Map`
     */
    name: string;
    description: string;
    version?: string;
    /**
     * If the file is saved as Components files
     * @default undefined
     */
    components?: boolean;
    /**
     * Relative path to the `maps_directory` from the map file.
     * Not used as default when the map files are in the `maps_directory` folder.
     * @default undefined
     */
    relative_path?: string;
  }[];
  /**
   * Relative path to the Mods folder from the mod file.
   * Not used as default when the mod files are in the root of the Mods folder.
   *
   * **Recommended** to set this key to avoid the conflict with other Customizes.
   *
   * Default set to `undefined` which means `<GameRoot>/Mods/*`
   * @default undefined
   */
  dependencies_directory?: string;
  /**
   * Informations about *.SC2Mod files.
   *
   * **File Path:** `<GameRoot>/Mods/<dependencies_directory>/<dependencies.relative_path>/<dependencies.name>`
   */
  dependencies?: {
    name: string;
    description: string;
    version?: string;
    /**
     * If the file is saved as Components files
     * @default undefined
     */
    components?: boolean;
    /**
     * Relative path to the `dependencies_directory` folder from the mod file.
     * Not used as default when the mod files are in the `dependencies_directory` folder.
     * @default undefined
     */
    relative_path?: string;
  }[];
  campaign_bank?: "offcial" | "custom" | "inactive";
  banks?: {
    name: string;
    description: string;
    version?: string;
  }[];
  /**
   * Specify the manager of this Customize.
   *
   * This default to `undefined` which means the manager is not specified,
   * then will be determined by the metadata file extension,
   * `metadata.json` will be `SCNexus` and `metadata.txt` will be `CCM`.
   *
   * @value `SCNexus` | `CCM`
   * @default undefined
   */
  manager?: "SCNexus" | "CCM";
};
```

## 额外支持

“星际枢纽”应用程序同时也将支持 [CCM](https://github.com/7thAce/SC2CCM) 的元数据文件标准，将对其所采用的 `metadata.txt` 元数据文件进行基本支持。

