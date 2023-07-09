require('dotenv').config();
export default {
  server: {
    port: 3030
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'lcrm-front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'icon', href: '/logo.svg'},
      // {
      //   rel: 'stylesheet',
      //   href: '/css/bootstrap.min.css'
      // },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
        integrity:
          'sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3',
        crossorigin: 'anonymous',
      },
      {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
      {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''},
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Inter:wght@300;400&display=swap',
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
      },
    ],
    script: [
      // {src: '/js/jquery.min.js'},
      // {src: '/js/bootstrap.min.js'}
      {
        src: 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',
      },
      {
        src:
          'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
        integrity:
          'sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM',
        crossorigin: 'anonymous',
        defer: true,
      },
    ],
  },


  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/VueDraggable.js'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for
  // dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv'
  ],

  axios: {
    baseURL: process.env.BASE_URL,
    proxy: true
  },
  proxy: {
    '/api/': {
      target: process.env.BASE_URL,
      pathRewrite: {'^/api/': '/'}
    }
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {url: '/api/v1/auth/login', method: 'post', propertyName: 'token'},
          logout: {url: '/api/v1/auth/logout', method: 'post'},
          user: {url: '/api/v1/auth/user', method: 'get', propertyName: 'user'}
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: {
        additionalData: `@import "@/styles/_settings.scss"; @import "@/styles/_auth.scss";`,
      },
    },
  }
}
