/**
 * 每次导航都把"页面实际提供的语言版本"清空。
 * 否则从只有中文的文档页跳到首页时，首页会继承上一页的语言限制。
 */
export default defineNuxtRouteMiddleware(() => {
  usePageLocales().value = null
})
