import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

import locale from '~/locales/locales.js'

export default ({ app, store }) => {

    let langMap = {
        'en'    : 'en-US',
        'ja'    : 'ja-JP',
        'zh-TW' : 'zh-TW',
    };

    app.i18n = new VueI18n({
        locale                  : langMap[ store.state.user.profile.lang ],
        fallbackLocale          : 'en-US',
        messages                : locale,
        silentTranslationWarn   : true,
    });
}