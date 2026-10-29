export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  modules: ['@nuxt/ui', '@nuxt/content'],

  css: ['~/assets/css/main.css'],

  /**
   * 排版用系统字体栈（见 main.css 的 --font-sans），不需要任何在线字体。
   * @nuxt/fonts 默认会注册 google / adobe / bunny 等远程 provider，启动时会去拉取字体，
   * 在无外网或受限网络下会抛 UND_ERR_CONNECT_TIMEOUT 并拖慢启动；这里全部关闭，只保留 local。
   */
  fonts: {
    providers: {
      adobe: false,
      google: false,
      googleicons: false,
      bunny: false,
      fontshare: false,
      fontsource: false,
      npm: false,
    },
  },

  components: [
    { path: '~/components', pathPrefix: false },
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '128x128', href: '/logo_scnexus_128.png' },
        { rel: 'apple-touch-icon', sizes: '128x128', href: '/logo_scnexus_128.png' },
      ],
      meta: [
        {
          name: 'keywords',
          content:
            '星际枢纽, SCNexus, 星际社区, SC Community, 星际应用, SC Application, '
            + '星际地图, STARCRAFT MAP, 星际模组, STARCRAFT MOD, 星际战役, STARCRAFT CAMPAIGN, '
            + '星际2, 星际争霸2, STARCRAFT 2, 星际, 星际争霸, STARCTAFT',
        },
        { name: 'baidu-site-verification', content: 'codeva-Hv8tvWvz6r' },
        { name: 'msvalidate.01', content: 'E3BD0E485B6F3FE4E862B600A1B29ADC' },
      ],
      script: [
        {
          defer: true,
          'data-cf-beacon': '{"token": "caf6db6bb05f443ea7f8aeea7f0f0d56"}',
          src: 'https://static.cloudflareinsights.com/beacon.min.js',
        },
      ],
    },
  },

  /**
   * 与 scnexus-web 保持完全一致：同一个 md 在两站必须渲染出同样的结果，
   * 包括标题锚点层级和代码高亮主题。
   */
  content: {
    build: {
      markdown: {
        toc: { depth: 3, searchDepth: 3 },
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
          },
          langs: [
            'bash', 'shell', 'json', 'js', 'ts', 'vue', 'html', 'css', 'md', 'yaml', 'diff', 'powershell',
          ],
        },
      },
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? 'https://scnexus.net',
    },
  },

  routeRules: {
    '/**': {
      headers: {
        'x-content-type-options': 'nosniff',
        'x-frame-options': 'SAMEORIGIN',
        'referrer-policy': 'strict-origin-when-cross-origin',
        'permissions-policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
        'cross-origin-opener-policy': 'same-origin-allow-popups',
        'strict-transport-security': 'max-age=15552000',
      },
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/guide', '/reference', '/patchnotes', '/sitemap.xml'],
    },
  },

  typescript: {
    strict: true,
  },
})
