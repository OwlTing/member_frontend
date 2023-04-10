
let host = ( process.env.BASE == 'dev' ) ? "local.member.test" : '0.0.0.0';
let port = ( process.env.BASE == 'dev' ) ? 3000 : 80;

export default {
  // Target: https://go.nuxtjs.dev/config-target
    target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'OwlTing Member',
        htmlAttrs: {
            lang: 'zh-TW'
        },

        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],

        link: [
            { rel: 'icon', type: 'image/svg', href: 'https://auth.owlting.com/imgs/favicon.svg' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@200;300;400;500;600;700;800;900&display=swap' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap' },
            { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' },
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css',
        '~/assets/style/main.scss'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/router.js', },
        { src: '~/plugins/request.js' },
        { src: '~/plugins/i18n.js', },
        { src: '~/plugins/vuex-persist.js',     ssr: false },
        { src: '~/plugins/fontawesome.js',      ssr: false },
        { src: '~/plugins/datepicker.js',       ssr: false },
        { src: '~/plugins/avatar.cropper.js',   ssr: false }
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        ['@nuxtjs/dotenv', { filename: process.env.BASE ? `.env.${process.env.BASE}` : '.env' }],
        '@nuxtjs/dayjs'
    ],

  // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@privyid/nuxt-csrf',
        'bootstrap-vue/nuxt',
        '@nuxtjs/axios',
        ['nuxt-fontawesome', {
          component: 'fa',
          imports: [
            // import whole set
            {
              set: '@fortawesome/free-solid-svg-icons',
              icons: ['fas']
            },
            {
              set: '@fortawesome/free-regular-svg-icons',
              icons: ['far']
            },
            {
              set: '@fortawesome/free-brands-svg-icons',
              icons: ['fab']
            }
          ]
        }]
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        babel: {
          compact: true
        }
        
    },

    loading: {
        color: '#f33',
        height: '2px'
    },

    router: { middleware: ['authenticated'] },

    server: {
        port: port,
        host: host,
    }
}
