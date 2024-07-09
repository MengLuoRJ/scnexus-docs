// https://vitepress.dev/guide/custom-theme
import Theme from "vitepress/theme";
import BasicLayout from "./BasicLayout.vue";
import "virtual:uno.css";

/** @type {import('vitepress').Theme} */
export default {
  ...Theme,
  Layout: BasicLayout,
};
