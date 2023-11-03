import { defineConfig } from "vitepress";
import UnoCSS from "unocss/vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  sitemap: {
    hostname: "https://scnexus.aiurcovenant.net",
    transformItems: (items) => {
      // exlucde pages under path /apis/*
      return items.filter((item) => !item.url.startsWith("/apis/"));
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo_scnexus_large_512.png",
    nav: [
      { text: "指南", link: "/guide/" },
      { text: "参考文档", link: "/reference/" },
      { text: "使用条款", link: "/terms" },
      { text: "隐私政策", link: "/privacy-policy" },
      { text: "赞助支持", link: "/sponsor" },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/MengLuoRJ/scnexus" },
    ],
  },
  locales: {
    root: {
      label: "简体中文",
      lang: "zh-CN",
      title: "星际枢纽",
      description: "星际枢纽文档",
      themeConfig: {
        sidebar: {
          "/guide/": [
            {
              text: "星际枢纽指南",
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
      },
    },
    en: {
      label: "English",
      lang: "en-US",
      title: "SCNexus Docs",
      description: "SCNexus Documents",
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
