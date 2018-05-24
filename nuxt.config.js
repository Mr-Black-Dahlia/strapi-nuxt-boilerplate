module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'logintest',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
  '@nuxtjs/axios',
  '@nuxtjs/toast',
  '@nuxtjs/auth',
  'nuxt-validate'
  
],

auth: {
  // Options
  strategies: {
    local: {
      endpoints: {
        login: { url: '/auth/local', method: 'post', propertyName: 'jwt' },
        register: { url: '/auth/local/register', method: 'post'},
        user: { url: '/user/me', method: 'get', propertyName: null},
        logout: null
      },
      // tokenRequired: true,
      // tokenType: 'bearer',
    }
  }
},
axios: {
  baseURL: 'http://localhost:1337'
},
router: {
  middleware: ['auth']
},
toast: {
  position: 'top-center'
}
}
