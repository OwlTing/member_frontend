<template>
    <b-container>
        <b-alert class="mb-3" :variant="(validate.step=='sended' || validate.step=='success') ? 'success': 'warning'" show v-if="!profile.email_validate || validate.step=='success'">
            <template v-if="validate.step=='notProcess'">
                <span>{{ $t('profile.emailNotValidateHint') }}</span>
                <span class="ms-2" style="color: #3C4145; cursor:pointer" @click="emailValidate">{{ $t('profile.emailNotValidateProcess') }}</span>
            </template>
            <template v-if="validate.step=='processing'">Loading...</template>
            <template v-if="validate.step=='sended'">
                <div class="clearfix">
                    <div class="float-right">
                        <fa icon="spinner" style="font-size:18px; cursor:pointer" @click="reload" />
                    </div>
                    {{ $t('profile.emailValidateSended') }}
                </div>
            </template>
            <template v-if="validate.step=='success'">
                {{ $t('profile.emailValidateSuccess') }}
            </template>
        </b-alert>

        <b-card>
            <content-loader :height="75" :speed="2" primaryColor="#f3f3f3" secondaryColor="#ecebeb" v-if="loading">
                <rect x="0"  y="5"  rx="1" ry="1" width="50" height="6" />
                <rect x="0"  y="25" rx="2" ry="2" width="30" height="30"/>

                <rect x="45" y="25" rx="1" ry="1" width="70" height="4" />
                <rect x="45" y="40" rx="1" ry="1" width="30" height="4" />
                <rect x="45" y="55" rx="1" ry="1" width="60" height="4" />
                <rect x="45" y="70" rx="1" ry="1" width="30" height="4" />
            </content-loader>

            <template v-else>
                <b-card-title class="clearfix">
                    <div class="float-right">
                        <NuxtLink :to="{ name: 'profile-edit'}">
                            <fa icon="angle-right" />
                        </NuxtLink>
                    </div>

                    {{ $t('profile.title.show') }}
                </b-card-title>

                <div class="clearfix">
                    <div class="float-left" style="margin-right:24px">
                        <b-avatar rounded="sm" :src="profile.avatar" size="80px" style="outline:1px solid #d1d7dd"></b-avatar>
                    </div>
                    <div style="overflow:hidden">
                        <ul class="list-unstyled" style="line-height:2.3">
                            <li>{{ $t('profile.email') }} : {{ profile.email }}
                                <span class="ml-3" style="color:#686e74">
                                    <template v-if="!profile.email_validate">({{ $t('profile.emailNotValidate') }})</template>
                                </span>
                            </li>
                            <li style="margin-top:16px">{{ $t('profile.name') }} : {{ profile.name }}</li>
                            <li style="margin-top:16px">{{ $t('profile.birthday') }} :
                                <template v-if="profile.birthday">{{ profile.birthday }}</template>
                                <template v-else>-</template>
                            </li>
                            <li style="margin-top:16px">{{ $t('profile.gender') }} : {{ $t('profile.genderHint.' + profile.gender) }}</li>
                        </ul>
                    </div>
                </div>
            </template>
        </b-card>

        <b-card class="mt-3">

            <content-loader :height="85" :speed="2" primaryColor="#f3f3f3" secondaryColor="#ecebeb" v-if="loading">
                <rect x="0" y="5" rx="1" ry="1" width="40" height="6" />

                <rect x="0" y="25" rx="1" ry="1" width="60" height="4" />
                <rect x="0" y="40" rx="1" ry="1" width="80" height="4" />
                <rect x="0" y="55" rx="1" ry="1" width="50" height="4" />
                <rect x="0" y="70" rx="1" ry="1" width="40" height="4" />
                <rect x="0" y="80" rx="1" ry="1" width="20" height="2" />
            </content-loader>

            <template v-else>

                <b-card-title class="clearfix">
                    {{ $t('profile.title.security') }}
                </b-card-title>

                <div class="clearfix">
                    <ul class="list-unstyled editable" style="line-height:2.3">
                        <li class="clearfix">
                            <NuxtLink :to="{ name: 'profile-password'}" style="display:block">
                                <div class="float-right">
                                    <fa icon="angle-right" />
                                </div>

                                <span style="vertical-align:middle;">{{ $t('profile.password') }} :</span>

                                <span style="zoom:0.45; vertical-align:middle; letter-spacing:16px">
                                    <fa icon="circle" />
                                    <fa icon="circle" />
                                    <fa icon="circle" />
                                    <fa icon="circle" />
                                    <fa icon="circle" />
                                    <fa icon="circle" />
                                    <fa icon="circle" />
                                    <fa icon="circle" />
                                </span>
                            </NuxtLink>
                        </li>

                        <li class="clearfix" style="margin-top:24px">
                            <NuxtLink :to="{ name: 'profile-mobile'}" style="display:block">
                                <div class="float-right">
                                    <fa icon="angle-right" />
                                </div>

                                <div>{{ $t('profile.mobile') }} :
                                    <template v-if="profile.mobile.number">({{ profile.mobile.code }}) {{ profile.mobile.number }}</template>
                                    <template v-else>-</template>
                                </div>
                           </NuxtLink>
                        </li>
<!--
                        <li class="clearfix" style="margin-top:24px">
                            <NuxtLink :to="{ name: 'profile-provider'}" style="display:block">
                                <div class="float-right">
                                    <fa icon="angle-right" />
                                </div>

                                <div>{{ $t('profile.title.provider') }}</div>
                            </NuxtLink>
                        </li>

                        <li class="clearfix" style="margin-top:24px">
                            <NuxtLink :to="{ name: 'profile.twoFactor'}" style="display:block">
                                <div class="float-right">
                                    <fa icon="angle-right" />
                                </div>

                                <div>
                                    {{ $t('profile.title.twoFactor') }}
                                    <div style="margin-top:6px; font-size:14px; color:#686E74">
                                        <span v-if="this.twoFactor">
                                            {{ $t('profile.twoFactorStatusHint.enable') }}
                                            <b-icon icon="check-circle-fill" class="text-success"></b-icon>
                                        </span>
                                        <span v-else>
                                            {{ $t('profile.twoFactorStatusHint.disable') }}
                                        </span>
                                    </div>
                                </div>
                            </NuxtLink>
                        </li>
-->
                    </ul>
                </div>
            </template>
        </b-card>

        <b-card class="mt-3">

            <content-loader :height="40" :speed="2" primaryColor="#f3f3f3" secondaryColor="#ecebeb" v-if="loading">
                <rect x="0"  y="5"  rx="1" ry="1" width="70" height="6" />
                <rect x="0"  y="25" rx="2" ry="2" width="90" height="4"/>
            </content-loader>

            <template v-else>

                <b-card-title>
                    {{ $t('profile.title.preferences') }}
                </b-card-title>

                <div class="clearfix">
                    <ul class="list-unstyled editable" style="line-height:2.3">
                        <li class="clearfix">
                            <NuxtLink :to="{ name: 'profile-preferences'}" style="display:block">
                                <div class="float-right">
                                    <fa icon="angle-right" />
                                </div>

                                <template v-if="profile.lang">
                                    {{ $t('profile.languageHint.' + profile.lang) }}
                                    </template>
                                <span v-else class="text-secondary">
                                    -
                                </span>
                                <span style="color:#A3ABB2">/</span>
                                <template v-if="profile.currency">
                                    {{ $t('profile.currencyHint.' + profile.currency) }}
                                </template>
                                <span v-else class="text-secondary">
                                    -
                                </span>
                            </NuxtLink>
                        </li>

                    </ul>
                </div>
            </template>

        </b-card>
    </b-container>
</template>

<script>

import { ContentLoader } from 'vue-content-loader'

import api from '~/api/api.js';

export default {
    layout: 'main',

    computed: {
        profile () {
            return this.$store.state.user.profile;
        }
    },

    components: {
        ContentLoader,
    },

    metaInfo: function () {
        return {title: this.$t('profile.title.show')}
    },

    data() {
        return {

            loading : true,

            validate : {
                step : 'notProcess',
            }
        }
    },

    async fetch(){


    },

    mounted () {

        this.$nuxt.$emit('breadcrumbLoading', [ {
            text: this.$t('profile.title.show'),
        }]);

        this.loading = false;
    },

    methods: {

        async emailValidate(){

            this.validate.step = 'processing';

            let ret = await api.auth.emailValidate();

            if (!ret) {
                return;
            }

            this.validate.step = 'sended';
        },

        async reload(){

            await api.auth.reload().then((ret) => {
                let data = ret.data;
                this.email_validate = data.email_validate;

                this.$store.dispatch('user/profile', {
                    email_validate : true
                });

                this.validate.step = 'success';
            });
        }
    }
};
</script>