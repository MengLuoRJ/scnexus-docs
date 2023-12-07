// https://vitepress.dev/guide/custom-theme
import Theme from "vitepress/theme";
import BasicLayout from "./BasicLayout.vue";
import "./style.css";
import "virtual:uno.css";

export default {
  ...Theme,
  Layout: BasicLayout,
  enhanceApp({ app, router, siteData }) {
    // ...
  },
};
