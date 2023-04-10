<template>
    <b-container>
        <b-card>
            <b-card-title class="clearfix">
                <NuxtLink :to="{ name: 'profile-show'}">
                    <fa icon="arrow-left" class="mr-3" />
                </NuxtLink>
                <span>{{ $t('profile.title.preferences') }}</span>
            </b-card-title>

            <b-row>
                <b-col md="6" sm="10" xs="12">
                    <div class="mt-5">
                        <b-form @submit="onSubmit">

                            <b-form-group :label="$t('profile.language')" class="mt-5" required>
                                <b-form-select v-model="form.lang" :options=" [
                                    { text: $t('m.selectPlease'),               value: null, disabled: true },
                                    { text: $t('profile.languageHint.en'),      value: 'en'     },
                                    { text: $t('profile.languageHint.ja'),      value: 'ja'     },
                                    { text: $t('profile.languageHint.zh-TW'),   value: 'zh-TW'  }
                                ]" required>
                                </b-form-select>
                            </b-form-group>

                            <b-form-group :label="$t('profile.currency')" class="mt-5" required>
                                <b-form-select v-model="form.currency" :options=" [
                                    { text: $t('m.selectPlease'), value: null, disabled: true    },
                                    { text: $t('profile.currencyHint.TWD'), value: 'TWD'},
                                    { text: $t('profile.currencyHint.USD'), value: 'USD'    },
                                    { text: $t('profile.currencyHint.JPY'), value: 'JPY'    },
                                    { text: $t('profile.currencyHint.EUR'), value: 'EUR'    },
                                ]" required>
                                </b-form-select>
                            </b-form-group>

                            <b-form-group class="mt-5">
                                <b-button type="submit" variant="primary" :disabled="(form.loading)">{{ $t('m.save') }}</b-button>
                            </b-form-group>
                        </b-form>
                    </div>
                </b-col>
            </b-row>
        </b-card>

    </b-container>
</template>
<script>

import api from '~/api/api.js';

export default {

    layout:'main',

    head() {
        return {
            title: this.$t('profile.title.preferences')
        }
    },

    computed: {
        profile () {
            return this.$store.state.user.profile;
        }
    },

    metaInfo: function () {
        return {title: this.$t('profile.title.preferences')}
    },

    data() {
        return {
            email : '',

            form: {
                loading : false,

                lang        : null,
                currency    : null
            },

            langMap : {
                'en'    : 'en-US',
                'ja'    : 'ja-JP',
                'zh-TW' : 'zh-TW',
            }
        }
    },

    created() {

        this.form.lang      = this.profile.lang;
        this.form.currency  = this.profile.currency;

        this.$emit('breadcrumbLoading', [ {
            text    : this.$t('profile.title.show'),
            to      : {name : 'profile-show'}
        }, {
            text: this.$t('profile.title.preferences'),
        }]);
    },

    methods: {

        async onSubmit(e) {
            e.preventDefault()

            this.form.loading = true;

            let ret = await api.auth.update({
                lang     : this.form.lang,
                currency : this.form.currency,
            });

            if ( !ret.status ) {
                this.form.loading = false;
                return;
            }

            this.$store.dispatch('user/profile', {
                lang     : this.form.lang,
                currency : this.form.currency,
            });

            this.$i18n.locale = this.langMap[ this.form.lang ];

            this.$router.push({ name: 'profile-show' });
        },
    }
};
</script>