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
            web3: {
                avaInfura: process.env.NUXT_AVA_INFURA,
                avaUSDCContract: process.env.NUXT_AVA_USDC_CONTRACT,
                ethInfura: process.env.NUXT_ETH_INFURA,
                ethUSDCContract: process.env.NUXT_ETH_USDC_CONTRACT,
                polygonInfura: process.env.NUXT_POLYGON_INFURA,
                polygonUSDCContract: process.env.NUXT_POLYGON_USDC_CONTRACT
            }
        }
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
    ],

    bootstrapVueNext: {
        composables: true, // Will include all composables
    },
    pinia: {
        autoImports: ['authStore', 'commonStore']
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
