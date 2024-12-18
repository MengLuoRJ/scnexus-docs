import { defineConfig } from "vitepress";
import UnoCSS from "unocss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import zh from "./zh";

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
          "星际枢纽, SCNexus, 星际社区, SC Community, 星际应用, SC Application, " +
          "星际地图, STARCRAFT MAP, 星际模组, STARCRAFT MOD, 星际战役, STARCRAFT CAMPAIGN, " +
          "星际2, 星际争霸2, STARCRAFT 2, 星际, 星际争霸, STARCTAFT",
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
  cleanUrls: true,
  metaChunk: true,

  themeConfig: {
    logo: "/logo_scnexus_128.webp",
    search: {
      provider: "local",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/MengLuoRJ/scnexus" },
    ],
  },
  locales: {
    root: {
      label: "中文",
      ...zh,
    },
    en: {
      label: "English",
      lang: "en",
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
