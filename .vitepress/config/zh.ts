import { defineConfig } from "vitepress";
import pkg from "../../package.json";

export default defineConfig({
  lang: "zh",
  title: "星际枢纽",
  description: "星际枢纽 - 专为星际社区服务的枢纽应用",
  themeConfig: {
    sidebar: {
      "/guide/": [
        {
          text: "指南",
          items: [
            { text: "快速开始", link: "/guide/" },
            { text: "常见问题", link: "/guide/faq" },
            {
              text: "创作者指南",
              collapsed: false,
              items: [
                {
                  text: "创建项目包",
                  link: "/guide/creator/create-project",
                },
                {
                  text: "包管理与富信息",
                  link: "/guide/creator/package-management",
                },
              ],
            },
          ],
        },
      ],
      "/reference/": [
        {
          text: "参考文档",
          items: [],
        },
      ],
    },
    nav: [
      { text: "指南", link: "/guide/" },
      { text: "参考", link: "/reference/" },
      { text: "赞助支持", link: "/sponsor" },
      {
        text: `v${pkg.version}`,
        items: [
          { text: "更新日志", link: "/patchnotes" },
          {
            text: "参与翻译",
            link: "/guide/localization",
          },
          {
            text: "参与贡献",
            link: "https://github.com/MengLuoRJ/scnexus/blob/main/CONTRIBUTING.md",
          },
        ],
      },
    ],

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "页面导航",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },
});
