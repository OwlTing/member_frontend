<template>
    <b-container>
        <b-card>
            <b-card-title class="clearfix">
                <router-link :to="{ name: 'profile-show'}"><i class="owl-arrow-left"></i></router-link> {{ $t('profile.title.provider') }}
            </b-card-title>

            <div v-for="(item, idx) in provider" class="itemBox">
                <h4><strong>{{ item.name }}</strong></h4>

                <div style="margin:16px 0; font-size:14px">{{ $t('profile.providerHint') }}</div>

                <template v-if="item.connected == null">
                    <b-button class="socialBtn" disabled>
                        <b-icon icon="arrow-clockwise" animation="spin"></b-icon> Loading
                    </b-button>
                </template>
                <template v-else-if="item.connected == false">
                    <b-button class="socialBtn" :class="idx" @click="authenticate(idx)" :disabled="status == 'binding'">
                        <b-img :src='`/imgs/social/${idx}.svg`' />{{ $t('profile.providerConnect', {item: item.name }) }}
                    </b-button>
                </template>
                <template v-else>
                    <b-button variant="link" @click="providerUnbind(idx)">
                        {{ $t('profile.providerUnbind') }}
                    </b-button>
                </template>
            </div>
        </b-card>

        <b-modal ref="bindFail" hide-header centered  hide-footer>
            <div style="padding:40px !important">
                <div class="d-block text-center" style="font-size:52px; color:#EA5E2E">
                    <b-icon icon="x-circle-fill"></b-icon>
                </div>

                <div class="d-block text-center" style="margin-top:28px; font-size:20px">
                    {{ this.$t('profile.providerBindFailTitle') }}
                </div>

                <div class="d-block text-center" style="margin-top:8px; font-size:16px">
                    {{ this.$t('profile.providerBindFailHint', {provider:binding}) }}
                </div>
                <b-button style="margin-top:24px" variant="primary" block @click="hideModal">{{ $t('m.ok') }}</b-button>
            </div>
        </b-modal>
    </b-container>
</template>
<script>
/*
import { CookieStorage } from 'cookie-storage';

const cookieStorage = new CookieStorage();
*/
import api from '~/api/api.js';

export default {

    metaInfo: function () {
        return {title: this.$t('profile.title.provider')}
    },

    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },

    data() {
        return {
            provider : {
                facebook : {
                    name: 'Facebook',
                    redirectUri : process.env.MIX_FACEBOOK_REDIRECT,
                    option: { width: 580, height: 400 },
                    connected : null,
                },
                google : {
                    name: 'Google',
                    redirectUri : process.env.MIX_GOOGLE_REDIRECT,
                    option: { width: 452, height: 633 },
                    connected : null,
                },
                twitter: {
                    name: 'Twitter',
                    redirectUri: process.env.MIX_TWITTER_REDIRECT,
                    connected : null,
                },
                line: {
                    name: 'Line',
                    redirectUri: process.env.MIX_LINE_REDIRECT,
                    connected : null,
                },
                apple: {
                    name: 'Apple',
                    redirectUri: process.env.MIX_APPLE_REDIRECT_URI,
                    option: { width: 495, height: 645 },

                    connected : null,
                },
            },

            binding: null,
            status : null,
            popup : null,
        }
    },

    created() {
        this.onInit();
    },

    methods: {

        hideModal() {
            this.$refs['bindFail'].hide()
        },

        async onInit(){

            let ret = await ProfileApi.provider();

            for (let k in ret.data) {
                this.provider[k].connected = ret.data[k];
            }

            this.$emit('breadcrumbLoading', [ {
                text: this.$t('profile.title.show'),
                to : {name : 'profile-show'}
            }, {
                text: this.$t('profile.title.provider'),
            }]);
        },

        async providerUnbind( provider ) {

            this.$bvModal.msgBoxConfirm( this.$t('profile.providerCFUnbindHint'), {
                title: this.provider[provider].name,
                size: 'sm',
                okTitle: this.$t('m.ok'),
                cancelTitle: this.$t('m.cancel'),
                centered: true
            }).then(async (val) => {

                if (!val) return;

                let ret = await ProfileApi.providerUnbind(provider);

                if ( ret.status != true ) {
                    return;
                }

                this.$bvModal.msgBoxOk( this.$t('profile.providerUnbindHint'), {
                    title: this.provider[provider].name,
                    size: 'sm',
                    okTitle: this.$t('m.ok'),
                    cancelTitle: this.$t('m.cancel'),
                    centered: true
                });

                this.provider[provider].connected = false;
            });
        },

        async authenticate( provider ){

            this.status  = 'binding';
            this.binding = provider;

            let name        = this.provider[provider].name;
            let option      = this.provider[provider].option;
            let redirectUri = this.provider[provider].redirectUri;

            let redirect = process.env.MIX_PROVIDER_REDIRECT;

            this.popup = window.open( redirect.replace('%PROVIDER%', provider), name, this.stringifyOptions(option) );

            this.pooling(provider, redirectUri).then( async (response) => {

                let tmp = JSON.parse(atob(cookieStorage.getItem('social_media')));

                let id      = tmp.id;
                let email   = tmp.email;

                let data = {};
                data[provider] = id;

                let ret = await ProfileApi.update(data);
                this.status = null;

                this.provider[provider].connected = true;

                this.$bvModal.msgBoxOk( this.$t('profile.providerBindHint'), {
                    title: this.provider[provider].name,
                    size: 'sm',
                    okTitle: this.$t('m.ok'),
                    centered: true
                });

                this.binding = null;

                cookieStorage.removeItem('social_media');

            }).catch((ret) => {
                this.status = null;
                this.binding = null;
            });
        },


        pooling( provider, uri ) {

            return new Promise((resolve, reject) => {

                var poolingInterval = setInterval( () => {
                    if ( !this.popup || this.popup.closed || this.popup.closed === undefined) {
                        clearInterval(poolingInterval);
                        poolingInterval = null;
                        reject(new Error('Auth popup window closed'));
                    }

                    try {

                        var popupWindowPath = this.getFullUrlPath(this.popup.location);

                        if (popupWindowPath !== uri) return;

                        if ( provider != 'apple' ) {
                            if (!this.popup.location.search && !this.popup.location.hash) {
                                reject(new Error('OAuth redirect has occurred but no query or hash parameters were found.'));
                                return;
                            }
                        }

                        let query = this.parseQueryString(this.popup.location.search.substring(1).replace(/\/$/, ''));
                        let hash = this.parseQueryString(this.popup.location.hash.substring(1).replace(/[\/$]/, ''));

                        let params = this.objectExtend({}, query);
                        params = this.objectExtend(params, hash);

                        if (params.error) {
                            reject(new Error(params.error));
                        } else {
                            resolve(params);
                        }

                        clearInterval(poolingInterval);
                        poolingInterval = null;
                        this.popup.close();


                    } catch (e) {
                      // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
                    }
                }, 250);
            });
        },

        stringifyOptions( opt ) {

            var options = [];
            for (var optionKey in opt) {
                options.push((optionKey + "=" + (opt[optionKey])));
            }
            return options.join(',');
        },

        getFullUrlPath(location) {
            var isHttps = location.protocol === 'https:';
            return (location.protocol + '//' + location.hostname + (/^\//.test(location.pathname)
                ? location.pathname
                : '/' + location.pathname)
            );
        },


        parseQueryString(str) {
            var obj = {};
            var key;
            var value;

            (str || '').split('&').forEach(function (keyValue) {
                if (keyValue) {
                    value = keyValue.split('=');
                    key = decodeURIComponent(value[0]);
                    obj[key] = !!value[1] ? decodeURIComponent(value[1]) : true;
                }
            });

            return obj;
        },

        objectExtend(a, b) {

            if (a == null || b == null) {
                return a;
            }

            Object.keys(b).forEach(function (key) {
                if (Object.prototype.toString.call(b[key]) == '[object Object]') {
                    a[key] = (Object.prototype.toString.call(a[key]) != '[object Object]')
                        ? b[key]
                        : objectExtend(a[key], b[key]);
                } else {
                    a[key] = b[key];
                }
            });

            return a;
        }
    }
};
</script>

<style scoped>
    .socialBtn {width:210px; padding:8px 16px !important; border-radius:6px; font-size:14px !important; color:#fff; line-height:24px}
        .socialBtn img {margin-right:20px; height:16px}
            .facebook   {background:#1877f2;}
            .line       {background:#00c200;}
            .twitter    {background:#55acee;}
            .google     {background:#fff; border:1px solid #d1d7dd; color:#3c4145}
            .apple      {background:#fff; border:1px solid #d1d7dd; color:#3c4145}

    .btn-link {padding:0; color:#078ABC; text-decoration:none}

    .itemBox {padding-top:8px}
    .itemBox + .itemBox {padding-top:24px; margin-top:24px; border-top:1px solid #e9edef}

    @media screen and (max-width:835px) {
        .socialBtn {width:100%; display:block; text-align:center}
    }
</style>