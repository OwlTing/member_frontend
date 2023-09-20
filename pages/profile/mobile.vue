<template>
    <BContainer>
        <transition name="fade" mode="out-in">
            <BCard v-if="step.password">
                <BCardTitle class="clearfix">
                    <NuxtLink :to="{ name: 'profile-show'}">
                        <Icon name="ph:arrow-left" width="25" height="25" class="me-3"/>
                    </NuxtLink>
                    <span>{{ $t('profile.title.passwordConfirm') }}</span>
                </BCardTitle>

                <BRow>
                    <BCol md="7" sm="10" xs="12">
                        <div class="mt-2">
                            <div v-if="mobile.number">
                                ({{ mobile.code }}) {{ mobile.number }}
                                <Icon name="fa6-solid:circle-check" style="margin-left:10px; color:#a9d341" />
                                <span style="color:#a3abb2">{{ $t('profile.mobileValidate') }}</span>
                            </div>
                            <div class="mt-3">{{ $t('profile.mobileBindHint') }}</div>
                            <div class="mt-3">
                                <BForm @submit="onPasswordSubmit" @submit.stop.prevent>
                                    <BFormGroup :label="$t('profile.password')" required>
                                        <BFormInput type="password" v-model="form.password" autofocus required autocomplete="off" v-bind:class="{'is-invalid' : (formerrs.hasOwnProperty('password')) }"></BFormInput>
                                        <BFormInvalidFeedback v-if="formerrs['password']">
                                            {{ formerrs['password'].join(', ') }}
                                        </BFormInvalidFeedback>
                                    </BFormGroup>

                                    <BFormGroup class="mt-5">
                                        <BButton type="submit" variant="primary" :disabled="(form.loading)">{{ $t('m.reset') }}</BButton>
                                    </BFormGroup>
                                </BForm>
                            </div>
                        </div>
                    </BCol>
                </BRow>
            </BCard>

            <BCard v-else>
                <BCardTitle class="clearfix">
                    <NuxtLink :to="{ name: 'profile-show'}">
                        <Icon name="ph:arrow-left" width="25" height="25" class="me-3"/>
                    </NuxtLink>
                    <span>{{ $t('profile.title.mobile') }}</span>
                </BCardTitle>

                <BRow>
                    <BCol md="7" sm="10" xs="12">
                        <div class="mt-5">
                            <BForm @submit="onMobileSubmit" @submit.stop.prevent>
                                <BRow>
                                    <BCol cols="4">
                                        <BFormGroup :label="$t('profile.countryCode')" required>
                                            <BFormInput v-model="form.mobile.code" autofocus required autocomplete="off" v-bind:class="{'is-invalid' : (formerrs.hasOwnProperty('countryCode')) }" placeholder='+886' @blur="onBlur"></BFormInput>
                                            <BFormInvalidFeedback v-if="formerrs['countryCode']">
                                                {{ formerrs['countryCode'].join(', ') }}
                                            </BFormInvalidFeedback>
                                        </BFormGroup>
                                    </BCol>
                                    <BCol>
                                        <BFormGroup :label="$t('profile.mobile')" required>
                                            <BFormInput v-model="form.mobile.number" required autocomplete="off" v-bind:class="{'is-invalid' : (formerrs.hasOwnProperty('mobile')) }"></BFormInput>
                                            <BFormInvalidFeedback v-if="formerrs['mobile']">
                                                {{ formerrs['mobile'].join(', ') }}
                                            </BFormInvalidFeedback>
                                        </BFormGroup>
                                    </BCol>
                                </BRow>

                                <BRow class="mt-5">
                                    <BCol cols="6">
                                        <BFormGroup :label="$t('profile.verificationCode')" required>
                                            <BFormInput v-model="form.verificationCode" required autocomplete="off" v-bind:class="{'is-invalid' : (formerrs.hasOwnProperty('verificationCode')) }"></BFormInput>
                                            <BFormInvalidFeedback v-if="formerrs['verificationCode']">
                                                {{ formerrs['verificationCode'].join(', ') }}
                                            </BFormInvalidFeedback>
                                        </BFormGroup>
                                    </BCol>
                                    <BCol>
                                        <BFormGroup>
                                            <div style="height:40px"></div>
                                            <BButton variant="success" :disabled="(form.verification)" class="btn-block" @click="onVerification">
                                                <template v-if="!form.verification">{{ $t('profile.verificationCodeGet') }}</template>
                                                <template v-else>{{ $t('profile.verificationCountDown', {time: verification.counter}) }}</template>
                                            </BButton>
                                        </BFormGroup>
                                    </BCol>
                                </BRow>

                                <BFormGroup class="mt-5">
                                    <BButton type="submit" variant="primary" :disabled="(form.loading)">{{ $t('m.save') }}</BButton>
                                </BFormGroup>
                            </BForm>
                        </div>
                    </BCol>
                </BRow>
            </BCard>
        </transition>


        <BModal v-model="modal.mobileFail" :centered="true" :cancelDisabled="true" :hideFooter="true" :noCloseOnBackdrop="true" :hideHeaderClose="true">
            <p class="my-2 text-center">
                <div><Icon name="fa6-solid:circle-xmark" width="56" height="56" color="#dc3545" /></div>
                <div style='margin-top:24px; font-size:20px; font-weight:bold'>{{ $t('profile.mobileValidateFail') }}</div>
                <div style='margin-top:8px;  font-size:16px'>{{ $t('profile.mobileValidateFailHint') }}</div>
            </p>

            <div class="mt-4 text-end">
                <BButton style="width:100%" variant="primary" :to="{name: 'profile-show'}">{{ $t('m.ok') }}</BButton>
            </div>
        </BModal>


        <BModal v-model="modal.mobileSuccess" :centered="true" :cancelDisabled="true" :hideFooter="true" :noCloseOnBackdrop="true" :hideHeaderClose="true">
            <p class="my-2 text-center">
                <div><Icon name="fa6-solid:circle-check" width="56" height="56" color="#28a745" /></div>
                <div style='margin-top:24px; font-size:20px; font-weight:bold'>{{ $t('profile.mobileValidateSuccess') }}</div>
                <div style='margin-top:8px;  font-size:16px'>{{ $t('profile.mobileValidateSuccessHint') }}</div>
            </p>

            <div class="mt-4 text-end">
                <BButton style="width:100%" variant="primary" :to="{name: 'profile-show'}">{{ $t('m.ok') }}</BButton>
            </div>
        </BModal>
    </BContainer>
</template>

<script setup>

    let modal = reactive({
        mobileFail: false,
        mobileSuccess: false,
    })

    const router    = useRouter();
    const AuthStore = useAuthStore();

    import api from '~/api/api.js';

    let mobile = reactive({
        code    : null,
        number  : null,
    });

    let step = reactive({
        password: true,
        mobile: false,
    });

    let verification = reactive({
        interval : null,
        time : 60,
        counter : 60,
    });

    let form = reactive({
        loading : false,
        verification : false,

        password : '',

        mobile : {
            code    : AuthStore.profile.mobile.code,
            number  : AuthStore.profile.mobile.number
        },
        verificationCode    : '',
    });

    let formerrs = reactive([]);

    definePageMeta({
        layout: "main",
        middleware: 'auth'
    })

    const { t } = useI18n()

    const { $event } = useNuxtApp();

    $event('breadcrumb:updated', [{
        text: t('profile.title.show'),
        to : router.resolve({name:'profile-show'}).path
    }, {
        text: t('profile.title.mobile'),
    }]);

    useHead({
        title: t('profile.title.mobile')
    })

    async function onPasswordSubmit() {

        form.loading = true;

        let ret = await api.profile.passwordConfirm( form.password );

        if ( !ret.status ) {
            form.loading = false;
            formerrs = ret.error;

            return;
        }


        form.loading = false;

        step.password = false;
        step.mobile = true;
    }

    async function onVerification(e) {

        form.verification = true;

        let ret = await api.profile.verificationSend(form.mobile.code, form.mobile.number);

        if ( !ret.status ) {
            form.loading = false;
            form.verification = false;
            formerrs= ret.error;
            return;
        }

        verification.interval = setInterval( () => {

            verification.counter -= 1;

            if ( verification.counter <= 0 ) {
                form.verification = false;

                clearInterval(verification.interval);
                verification.interval = null;

                verification.counter = verification.time;
            }

        }, 1000);
    }

    async function onMobileSubmit() {
        form.loading = true;

        let ret = await api.profile.verification(form.mobile.code, form.mobile.number, form.verificationCode);

        if ( !ret.status ) {
            form.loading = false;
            modal.mobileFail = true;

            return;
        }
    
        AuthStore.update({mobile: form.mobile});

        modal.mobileSuccess = true;
    }

    function onBlur(e){

        let code = form.mobile.code;

        if (!code) return;

        if ( code.substring(0, 1) != '+' )
            form.mobile.code = '+' + form.mobile.code;
    }

</script>


<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

</style>
