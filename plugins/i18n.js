import { createI18n } from 'vue-i18n';

import zhTW from '@/locales/zhTW.ts';
import jaJP from '@/locales/jaJP.ts';
import enUS from '@/locales/enUS.ts';

export default defineNuxtPlugin(( nuxtApp ) => {

    const i18n = createI18n({
        legacy: false,
        lazy: true,
        warnHtmlMessage: false,
        globalInjection: true,
        useScope: 'global',
        locale: 'zh-TW',
        messages: {
            'zh-TW': zhTW,
            'ja-JP': jaJP,
            'en-US': enUS,
        },
    });

    nuxtApp.vueApp.use(i18n);
    
})