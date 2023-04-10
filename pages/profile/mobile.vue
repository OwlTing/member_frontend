<template>
    <b-container>
        <transition name="fade" mode="out-in">
            <b-card v-if="step.password">
                <b-card-title class="clearfix">
                    <NuxtLink :to="{ name: 'profile-show'}">
                        <fa icon="arrow-left" class="mr-3" />
                    </NuxtLink>
                    <span>{{ $t('profile.title.passwordConfirm') }}</span>
                </b-card-title>

                <b-row>
                    <b-col md="7" sm="10" xs="12">
                        <div class="mt-2">
                            <div v-if="mobile.number">
                                ({{ mobile.code }}) {{ mobile.number }}
                                <fa icon="circle-check" style="margin-left:10px; color:#a9d341" />
                                <span style="color:#a3abb2">{{ $t('profile.mobileValidate') }}</span>
                            </div>
                            <div class="mt-3">{{ $t('profile.mobileBindHint') }}</div>
                            <div class="mt-3">
                                <b-form @submit="onPasswordSubmit" @submit.stop.prevent>
                                    <b-form-group :label="$t('profile.password')" required>
                                        <b-form-input type="password" v-model="form.password" autofocus required autocomplete="off" v-bind:class="{'is-invalid' : (formerrs.hasOwnProperty('password')) }"></b-form-input>
                                        <b-form-invalid-feedback v-if="formerrs['password']">
                                            {{ formerrs['password'].join(', ') }}
                                        </b-form-invalid-feedback>
                                    </b-form-group>

                                    <b-form-group class="mt-5">
                                        <b-button type="submit" variant="primary" :disabled="(form.loading)">{{ $t('m.reset') }}</b-button>
                                    </b-form-group>
                                </b-form>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </b-card>

            <b-card v-else>
                <b-card-title class="clearfix">
                    <NuxtLink :to="{ name: 'profile-show'}">
                        <fa icon="arrow-left" class="mr-3" />
                    </NuxtLink>
                    <span>{{ $t('profile.title.mobile') }}</span>
                </b-card-title>

                <b-row>
                    <b-col md="7" sm="10" xs="12">
                        <div class="mt-5">
                            <b-form @submit="onMobileSubmit" @submit.stop.prevent>
                                <b-row>
                                    <b-col cols="4">
                                        <b-form-group :label="$t('profile.countryCode')" required>
                                            <b-form-input v-model="form.countryCode" autofocus required autocomplete="off" v-bind:class="{'is-invalid' : (formerrs.hasOwnProperty('countryCode')) }" placeholder='+886' @blur="onBlur"></b-form-input>
                                            <b-form-invalid-feedback v-if="formerrs['countryCode']">
                                                {{ formerrs['countryCode'].join(', ') }}
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </b-col>
                                    <b-col>
                                        <b-form-group :label="$t('profile.mobile')" required>
                                            <b-form-input v-model="form.mobile" required autocomplete="off" v-bind:class="{'is-invalid' : (formerrs.hasOwnProperty('mobile')) }"></b-form-input>
                                            <b-form-invalid-feedback v-if="formerrs['mobile']">
                                                {{ formerrs['mobile'].join(', ') }}
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </b-col>
                                </b-row>

                                <b-row class="mt-5">
                                    <b-col cols="6">
                                        <b-form-group :label="$t('profile.verificationCode')" required>
                                            <b-form-input v-model="form.verificationCode" required autocomplete="off" v-bind:class="{'is-invalid' : (formerrs.hasOwnProperty('verificationCode')) }"></b-form-input>
                                            <b-form-invalid-feedback v-if="formerrs['verificationCode']">
                                                {{ formerrs['verificationCode'].join(', ') }}
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </b-col>
                                    <b-col>
                                        <b-form-group>
                                            <div style="height:40px"></div>
                                            <b-button variant="success" :disabled="(form.verification)" class="btn-block" @click="onVerification">
                                                <template v-if="!form.verification">{{ $t('profile.verificationCodeGet') }}</template>
                                                <template v-else>{{ $t('profile.verificationCountDown', {time: verification.counter}) }}</template>
                                            </b-button>
                                        </b-form-group>
                                    </b-col>
                                </b-row>

                                <b-form-group class="mt-5">
                                    <b-button type="submit" variant="primary" :disabled="(form.loading)">{{ $t('m.save') }}</b-button>
                                </b-form-group>
                            </b-form>
                        </div>
                    </b-col>
                </b-row>
            </b-card>
        </transition>
    </b-container>
</template>
<script>

import api from '~/api/api.js';

export default {
    layout:'main',

    head() {
        return {
            title: this.$t('profile.title.edit')
        }
    },

    computed: {
        profile () {
            return this.$store.state.user.profile;
        }
    },

    created() {

        this.$nuxt.$emit('breadcrumbLoading', [ {
            text: this.$t('profile.title.show'),
            to : {name : 'profile-show'}
        }, {
            text: this.$t('profile.title.mobile'),
        }]);

        this.mobile.code    = this.profile.mobile.code;
        this.mobile.number  = this.profile.mobile.number;
    },


    data() {
        return {
            mobile : {
                code    : null,
                number  : null,
            },

            step : {
                password: true,
                mobile: false,
            },

            verification : {
                interval : null,
                time : 60,
                counter : 60,
            },

            form: {

                loading : false,
                verification : false,

                password            : null,

                countryCode         : null,
                mobile              : null,
                verificationCode    : null,
            },

            formerrs: []
        }
    },


    methods: {

        async onVerification(e) {

            this.form.verification = true;

            let ret = await api.auth.verificationSend(this.form.countryCode, this.form.mobile);

            if ( !ret.status ) {
                this.form.loading = false;
                this.form.verification = false;
                this.formerrs= ret.error;
                return;
            }

            this.verification.interval = setInterval( () => {

                this.verification.counter -= 1;

                if ( this.verification.counter <= 0 ) {
                    this.form.verification = false;

                    clearInterval(this.verification.interval);
                    this.verification.interval = null;

                    this.verification.counter = this.verification.time;
                }

            }, 1000);
        },

        async onPasswordSubmit(e) {

            this.form.loading = true;

            let ret = await api.auth.passwordConfirm(this.form.password);

            if ( !ret.status ) {
                this.form.loading = false;
                this.formerrs = ret.error;

                return;
            }


            this.form.loading = false;

            this.step.password = false;
            this.step.mobile = true;
        },

        async onMobileSubmit(e) {
            this.form.loading = true;

            const h = this.$createElement;

            let ret = await api.auth.verification(this.form.countryCode, this.form.mobile, this.form.verificationCode);

            if ( !ret.status ) {
                this.form.loading = false;

                const msg = h(
                    'div', { class: ['text-center']}, [
                        h('div', { style:'font-size:56px' }, [h('i', { class : ['fa-solid', 'fa-circle-xmark', 'text-danger'] })]),
                        h('div', { style:'margin-top:24px; font-size:20px; font-weight:bold' }, [this.$t('profile.mobileValidateFail')]),
                        h('div', { style:'margin-top:8px;  font-size:16px' }, [this.$t('profile.mobileValidateFailHint')]),
                    ]
                );

                this.$bvModal.msgBoxOk([msg], {
                    id : 'mobile-modal',
                    okTitle: this.$t('m.ok'),
                    headerClass: 'text-center',
                    centered: true,
                    okVariant: 'block btn-primary'
                });

                return;
            }

            this.$store.dispatch('user/profile', {
                mobile : {
                    code    : this.form.countryCode, 
                    number  : this.form.mobile
                }
            });

            const msg = h(
                'div', { class: ['text-center']}, [
                    h('div', { style:'font-size:56px' }, [h('i', { class : ['fa-solid', 'fa-circle-check', 'text-success'] })]),
                    h('div', { style:'margin-top:24px; font-size:20px; font-weight:bold' }, [this.$t('profile.mobileValidateSuccess')]),
                    h('div', { style:'margin-top:8px;  font-size:16px' }, [this.$t('profile.mobileValidateSuccessHint')]),
                ]
            );

            this.$bvModal.msgBoxOk([msg], {
                id : 'mobile-modal',
                okTitle: this.$t('m.ok'),
                headerClass: 'text-center',
                centered: true,
                okVariant: 'block btn-primary'
            }).then(value => {
                this.$router.push({ name: 'profile-show' });
            });
        },

        onBlur(e){

            let code = this.form.countryCode;

            if (!code) return;

            if ( code.substring(0, 1) != '+' )
                this.form.countryCode = '+' + this.form.countryCode;
        }

    }
};
</script>


<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

</style>
