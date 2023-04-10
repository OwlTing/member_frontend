<template>
    <div>loading...</div>
</template>

<script>

import api from '~/api/api.js';

export default {

    data() {
        return {
            langMap : {
                'en'    : 'en-US',
                'ja'    : 'ja-JP',
                'zh-TW' : 'zh-TW',
            }
        }
    },

    async created() {

        let AuthData = JSON.parse( Buffer.from(this.$route.query.AuthData, 'base64').toString() );

        if ( !AuthData.status ) {
            return;
        }

        this.$store.dispatch('user/token', AuthData.token);

        let ret = await api.auth.me();

        let tmp = ret.data.me;

        tmp.mobile          = JSON.parse(tmp.mobile);
        tmp.localization    = JSON.parse(tmp.localization);

        this.$store.dispatch('user/profile', tmp);

        this.$i18n.locale = this.langMap[ tmp.lang ];


        this.$router.push({name: 'index'});
    }
}

</script>