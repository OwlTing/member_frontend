// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    
    devtools: { enabled: true },
    
    build: {
        transpile: ['@vuepic/vue-datepicker']
    },
    
    runtimeConfig: {
        public: {
            authRedirect: process.env.NUXT_AUTH_REDIRECT,
            baseURL     : process.env.NUXT_BASE_URL,
            ssoAvatar   : process.env.NUXT_SSO_AVATAR,
        },
    },
    css: [
        "bootstrap/dist/css/bootstrap.min.css",
        "~/assets/style/main.css",
    ],

    app: {
        pageTransition: { name: 'page', mode: 'out-in' },

        head: {
            title : 'OwlTing Member',
            
            viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
            charset: 'utf-8',

            link : [
                {href: "/imgs/favicon.svg", rel:"icon", type:"image/x-icon"},
                {href: "//fonts.googleapis.com/earlyaccess/notosanstc.css", rel:"stylesheet", type:"text/css"}
            ]
        }
    },
    modules: [
        '@bootstrap-vue-next/nuxt',
        '@pinia/nuxt',
        'nuxt-icon',
        'dayjs-nuxt'
    ],
    
    plugins: [
      { src: '/plugins/router-nprogress.ts', mode: 'client'}
    ],

    bootstrapVueNext: {
        composables: true, // Will include all composables
    },
    pinia: {
        autoImports: ['authStore']
    },

    imports: {
        dirs: ["stores"],

        presets: [
          {from: 'vue-i18n', imports: ['useI18n']}
        ]
    },
    components: {
        global: true,
        dirs: ['~/components']
    },
    
})
