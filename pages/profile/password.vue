<template>
    <b-container>
        <b-card>
            <b-card-title class="clearfix">
                <NuxtLink :to="{ name: 'profile-show'}">
                    <fa icon="arrow-left" class="mr-3" />
                </NuxtLink>
                <span>{{ $t('profile.title.password') }}</span>
            </b-card-title>

            <b-row>
                <b-col md="6" sm="10" xs="12">
                    <div class="mt-5">
                        <b-form @submit="onSubmit" @submit.stop.prevent>

                            <b-form-group :label="$t('profile.oldPassword')" class="mt-5" required style="position:relative" >
                                <div style="position:absolute; top:-30px; right:0; cursor:pointer" class="text-secondary small" @click="passwordForgetModalShow">{{ $t('profile.passwordForget') }}</div>
                                <b-form-input type="password" v-model="form.oldPassword" autofocus required autocomplete="off" v-bind:class="{'is-invalid' : (formerrs.hasOwnProperty('oldPassword')) }"></b-form-input>
                                <b-form-invalid-feedback v-if="formerrs['oldPassword']">
                                    {{ formerrs['oldPassword'].join(', ') }}
                                </b-form-invalid-feedback>
                            </b-form-group>

                            <b-form-group :label="$t('profile.newPassword')" class="mt-5" required>
                                <b-form-input type="password" v-model="form.newPassword1" required :placeholder="$t('profile.newPassword1Placeholder')" autocomplete="off" v-bind:class="{'is-invalid' : (formerrs.hasOwnProperty('newPassword1')) }"></b-form-input>
                                <b-form-invalid-feedback v-if="formerrs['newPassword1']">
                                    {{ formerrs['newPassword1'].join(', ') }}
                                </b-form-invalid-feedback>
                            </b-form-group>

                            <b-form-group required>
                                <b-form-input type="password" v-model="form.newPassword2" required :placeholder="$t('profile.newPassword2Placeholder')" autocomplete="off" class="mt-3" v-bind:class="{'is-invalid' : (formerrs.hasOwnProperty('newPassword2')) }"></b-form-input>
                                <b-form-invalid-feedback v-if="formerrs['newPassword2']">
                                    {{ formerrs['newPassword2'].join(', ') }}
                                </b-form-invalid-feedback>
                            </b-form-group>

                            <b-form-group class="mt-5">
                                <b-button type="submit" variant="primary" :disabled="(form.loading)">{{ $t('profile.title.password') }}</b-button>
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
            title: this.$t('profile.title.edit')
        }
    },

    created() {

        this.$nuxt.$emit('breadcrumbLoading', [ {
            text: this.$t('profile.title.show'),
            to : {name : 'profile-show'}
        }, {
            text: this.$t('profile.title.password'),
        }]);
    },

    computed: {},

    data() {
        return {

            form: {

                loading : false,

                oldPassword : '',
                newPassword1 : '',
                newPassword2 : '',
            },

            formerrs: []
        }
    },

    methods: {

        async passwordForgetModalShow(){

            try {

                let ret = await api.auth.passwordForget();

                this.$bvModal.msgBoxOk(this.$t('profile.passwordForgetHint', {email : this.me.email}), {
                    title: this.$t('profile.passwordForget'),
                    okTitle: this.$t('m.ok'),
                    centered: true
                }).then(value => {
                    this.$router.push({ name: 'profile-show' });
                });

            } catch (error) {

                this.$bvModal.msgBoxOk(this.$t('profile.passwordForgetError'), {
                    title: this.$t('profile.passwordForget'),
                    okTitle: this.$t('m.ok'),
                    centered: true
                });
            }
        },

        async onSubmit(e) {
            this.form.loading = true;

            let ret = await api.auth.password(this.form.oldPassword, this.form.newPassword1, this.form.newPassword2);

            if ( !ret.status ) {
                this.form.loading = false;
                this.formerrs = ret.error;

                return;
            }

            this.$bvModal.msgBoxOk(this.$t('profile.passwordChanged'), {
                title: this.$t('profile.title.password'),
                size: 'sm',
                okTitle: this.$t('m.ok'),
                centered: true
            }).then(value => {
                this.$router.push({ name: 'profile-show' });
            });
        },
    }
};
</script>