import { defineConfig } from "vitepress";
import UnoCSS from "unocss/vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "src",
  base: "/",
  lang: "zh",
  title: "星际枢纽",
  description: "星际枢纽 - 专为星际社区服务的枢纽应用",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "星际枢纽, SCNexus, 星际社区, 星际应用, 星际地图, STARCRAFT MAP, 星际模组, STARCRAFT MOD, 星际战役, STARCRAFT CAMPAIGN, 星际, 星际2, STARCTAFT, STARCRAFT 2",
      },
    ],
    ["meta", { name: "baidu-site-verification", content: "codeva-Hv8tvWvz6r" }],
    [
      "meta",
      { name: "msvalidate.01", content: "E3BD0E485B6F3FE4E862B600A1B29ADC" },
    ],
  ],
  sitemap: {
    hostname: "https://scnexus.net",
    transformItems: (items) => {
      // exlucde pages under path /apis/*
      return items.filter((item) => !item.url.startsWith("/apis/"));
    },
  },
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo_scnexus_128.webp",
    search: {
      provider: "local",
    },
    sidebar: {
      "/guide/": [
        {
          text: "基础指南",
          items: [
            { text: "简介", link: "/guide/" },
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
      { text: "参考文档", link: "/reference/" },
      { text: "使用条款", link: "/terms" },
      { text: "隐私政策", link: "/privacy-policy" },
      { text: "更新日志", link: "/patchnotes" },
      { text: "赞助支持", link: "/sponsor" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/MengLuoRJ/scnexus" },
    ],
  },
  locales: {
    root: {
      label: "中文",
      lang: "zh",
    },
    en: {
      label: "English",
      lang: "en",
      link: "https://english.scnexus.net",
    },
  },
  markdown: {
    config: (md) => {
      md.disable("linkify");
      // .use(MarkdownItFootnote)
      // .use(MarkdownItMark)
      // .use(MarkdownItImsize)
      // .use(MarkdownItPanguTs);
    },
  },
  vite: {
    plugins: [UnoCSS(), visualizer()],
  },
});
