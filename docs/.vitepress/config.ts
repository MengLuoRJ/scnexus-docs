import { defineConfig } from "vitepress";
import UnoCSS from "unocss/vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo_scnexus_large_512.png",
    nav: [
      { text: "指南", link: "/guide/" },
      { text: "参考文档", link: "/reference/" },
      { text: "使用条款", link: "/terms.html" },
      { text: "隐私政策", link: "/privacy-policy.html" },
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
        // sidebar: [
        //   {
        //     text: "Examples",
        //     items: [
        //     ],
        //   },
        // ],
      },
    },
    en: {
      label: "English",
      lang: "en-US",
      title: "SCNexus Docs",
      description: "SCNexus Documents",
    },
  },

  vite: {
    plugins: [UnoCSS(), visualizer()],
  },
});
