<template>
    <BContainer>
        <BCard>
            <BCardTitle class="clearfix">
                <NuxtLink :to="{ name: 'profile-show'}">
                    <Icon name="ph:arrow-left" width="25" height="25" class="me-3"/>
                </NuxtLink>
                <span>{{ $t('profile.title.password') }}</span>
            </BCardTitle>

            <BRow>
                <BCol md="6" sm="10" xs="12">
                    <div class="mt-5">
                        <BForm @submit="onSubmit" @submit.stop.prevent>

                            <BFormGroup :label="$t('profile.oldPassword')" class="mt-5" required style="position:relative" >
                                <div style="position:absolute; top:-30px; right:0; cursor:pointer" class="text-secondary small" @click="passwordForgetModalShow">{{ $t('profile.passwordForget') }}</div>
                                <BFormInput type="password" v-model="form.oldPassword" autofocus required autocomplete="off" v-bind:class="{'is-invalid' : (formerrs.hasOwnProperty('oldPassword')) }"></BFormInput>
                                <BFormInvalidFeedback :force-show="true" :key="inpKey">
                                    <template v-if="formerrs.hasOwnProperty('oldPassword')">{{ formerrs.oldPassword.join(', ') }}</template>
                                </BFormInvalidFeedback>
                            </BFormGroup>

                            <BFormGroup :label="$t('profile.newPassword')" class="mt-5" required>
                                <BFormInput type="password" v-model="form.newPassword1" required :placeholder="$t('profile.newPassword1Placeholder')" autocomplete="off" v-bind:class="{'is-invalid' : (formerrs.hasOwnProperty('newPassword1')) }"></BFormInput>
                                <BFormInvalidFeedback :force-show="true" :key="inpKey">
                                    <template v-if="formerrs.hasOwnProperty('newPassword1')">{{ formerrs.newPassword1.join(', ') }}</template>
                                </BFormInvalidFeedback>
                            </BFormGroup>

                            <BFormGroup required>
                                <BFormInput type="password" v-model="form.newPassword2" required :placeholder="$t('profile.newPassword2Placeholder')" autocomplete="off" class="mt-3" v-bind:class="{'is-invalid' : (formerrs.hasOwnProperty('newPassword2')) }"></BFormInput>
                                <BFormInvalidFeedback :force-show="true" :key="inpKey">
                                    <template v-if="formerrs.hasOwnProperty('newPassword2')">{{ formerrs.newPassword2.join(', ') }}</template>
                                </BFormInvalidFeedback>
                            </BFormGroup>

                            <BFormGroup class="mt-5">
                                <BButton type="submit" variant="primary" :disabled="(form.loading)">{{ $t('profile.title.password') }}</BButton>
                            </BFormGroup>
                        </BForm>
                    </div>
                </BCol>
            </BRow>
        </BCard>

        <BModal v-model="modal.passwordChanged" :title="$t('profile.title.password')" size="xs" :centered="true" :cancelDisabled="true" :hideFooter="true" :noCloseOnBackdrop="true" :hideHeaderClose="true">
            <p class="my-2">{{ $t('profile.passwordChanged') }}</p>

            <div class="mt-4 text-end">
                <BButton variant="primary" :to="{name: 'profile-show'}">{{ $t('m.ok') }}</BButton>
            </div>
        </BModal>

        <BModal v-model="modal.passwordForget" :title="$t('profile.passwordForget')" size="xs" :centered="true" :cancelDisabled="true" :hideFooter="true" :noCloseOnBackdrop="true" :hideHeaderClose="true">
            <p class="my-2">{{ $t('profile.passwordForgetHint', {email : AuthStore.profile.email}) }}</p>

            <div class="mt-4 text-end">
                <BButton variant="primary" :to="{name: 'profile-show'}">{{ $t('m.ok') }}</BButton>
            </div>
        </BModal>

        <BModal v-model="modal.passwordForgetError" :title="$t('profile.passwordForget')" size="xs" :centered="true" :cancelDisabled="true" :hideFooter="true" :noCloseOnBackdrop="true" :hideHeaderClose="true">
            <p class="my-2">{{ $t('profile.passwordForgetError') }}</p>

            <div class="mt-4 text-end">
                <BButton variant="primary" :to="{name: 'profile-show'}">{{ $t('m.ok') }}</BButton>
            </div>
        </BModal>
    </BContainer>
</template>

<script setup>

    let modal = reactive({
        passwordChanged: false,
        passwordForget: false,
        passwordForgetError: false,
    })

    const AuthStore = useAuthStore();

    const router = useRouter();

    import api from '~/api/api.js';

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
        text: t('profile.title.password'),
    }]);

    useHead({
        title: t('profile.title.password')
    })


    let form = reactive({

        loading : false,

        oldPassword : '',
        newPassword1 : '',
        newPassword2 : '',
    });

    let inpKey = ref(0);
    let formerrs = reactive([]);


    async function onSubmit() {
        form.loading = true;

        let ret = await api.profile.password(form.oldPassword, form.newPassword1, form.newPassword2);

        if ( !ret.status ) {
            form.loading = false;
            formerrs = ret.error;

            inpKey.value += 1;

            return;
        }

        modal.passwordChanged = true;
    }

   async function passwordForgetModalShow(){

        try {

            let ret = await api.profile.passwordForget();

            if ( ret.status ) {
                modal.passwordForget = true;
            }

        } catch (error) {

            modal.passwordForgetError = true;
        }
    }
</script>