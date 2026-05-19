import webpack from "webpack";

export default {
  publicRuntimeConfig: {
    apiKey: process.env.MAP_API
  },

  mode: "universal",
  target: "server",

  // ------------------ HEAD CONFIG ------------------
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      {
        hid: "viewport",
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],

    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ],

    script: [
      // Google Analytics (GA4)
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-FEWVE4GN6F",
        async: true
      },
      {
        hid: "gtag-init",
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FEWVE4GN6F');
        `,
        type: "text/javascript"
      },

      // SEO team requirement: ga.js
      {
        src: "/ga.js",
        defer: true
      }
    ],

    __dangerouslyDisableSanitizersByTagID: {
      "gtag-init": ["innerHTML"]
    }
  },

  // ------------------ GLOBAL CSS ------------------
  css: [
    "@assets/scss/style.scss",
    { src: "@node_modules/@glidejs/glide/dist/css/glide.core.min.css", ssr: false },
    { src: "@/node_modules/slick-carousel/slick/slick.css", ssr: false },
    { src: "@/node_modules/slick-carousel/slick/slick-theme.css", ssr: false },
    { src: "@/node_modules/swiper/swiper-bundle.min.css", ssr: false }
  ],

  // ------------------ PLUGINS ------------------
  plugins: [
    "~/plugins/axios.js",
    "~/plugins/imageSrcset.js",
    "~/plugins/onload.component.js",
    "~/plugins/onload.client.js",
    { src: "@/plugins/aos", ssr: false }
  ],

  components: true,

  // ------------------ MODULES ------------------
  modules: [
    "bootstrap-vue/nuxt",
    "@nuxtjs/device",
    "@nuxtjs/axios",
    [
      "nuxt-lazy-load",
      { directiveOnly: true }
    ],
    "@nuxtjs/robots",
    "nuxt-ssr-cache"
  ],

  robots: {
    UserAgent: "*",
    Disallow: "/user"
  },

  // ------------------ AXIOS ------------------
  axios: {
    baseURL: process.env.BASE_URL,
    credentials: false,
    timeout: 25000,
    headers: {
      "Content-Type": "Application/json"
    }
  },

  // ------------------ BUILD CONFIG ------------------
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        _: "lodash",
        $: "jquery",
        jQuery: "jquery"
      })
    ],

    transpile: [
      /^vue2-google-maps($|\/)/,
      /^vue2-gmap-custom-marker($|\/)/
    ],

    extend(config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        loader: "raw-loader"
      });
    }
  },

  router: {
    middleware: ["meta-tags"]
  },

  // ------------------ SERVER ------------------
  server: {
    host: "0.0.0.0",
    port: 20000
  },

  // ------------------ SSR CACHE ------------------
  cache: {
    useHostPrefix: false,
    pages: [
      /^\/$/
    ],
    store: {
      type: "memory",
      max: 1000,
      ttl: 14400 // 4 hours
    }
  }
};
