<template>
    <BContainer>
        <BAlert class="mb-3" :model-value="AuthStore.profile.email_validate == 0 || validate.step=='success'" :variant="(validate.step=='sended' || validate.step=='success') ? 'success': 'warning'">
            <template v-if="validate.step=='notProcess'">
                <span>{{ $t('profile.emailNotValidateHint') }}</span>
                <span class="ms-2" style="color: #3C4145; cursor:pointer" @click="emailValidate">{{ $t('profile.emailNotValidateProcess') }}</span>
            </template>
            <template v-if="validate.step=='processing'">Loading...</template>
            <template v-if="validate.step=='sended'">
                <div class="clearfix">
                    <div class="float-end">
                        <Icon name="fa:spinner" width="18" height="18" style="cursor:pointer" @click="reload"/>
                    </div>
                    {{ $t('profile.emailValidateSended') }}
                </div>
            </template>
            <template v-if="validate.step=='success'">
                {{ $t('profile.emailValidateSuccess') }}
            </template>
        </BAlert>

        <BCard>
            <BCardTitle class="clearfix">
                <div class="float-end">
                    <NuxtLink :to="{ name: 'profile-edit'}">
                       <Icon name="fa:angle-right" width="17" height="17"/>
                    </NuxtLink>
                </div>

                {{ $t('profile.title.show') }}
            </BCardTitle>

            <div class="clearfix">
                <div class="float-start" style="margin-right:24px">
                    <BAvatar rounded="sm" :src="AuthStore.profile.avatar" size="80px" style="outline:1px solid #d1d7dd"></BAvatar>
                </div>
                <div style="overflow:hidden">
                    <ul class="list-unstyled" style="line-height:2.3">
                        <li>{{ $t('profile.email') }} : {{ AuthStore.profile.email }}
                            <span class="ml-3" style="color:#686e74">
                                <template v-if="!AuthStore.profile.email_validate">({{ $t('profile.emailNotValidate') }})</template>
                            </span>
                        </li>
                        <li style="margin-top:16px">{{ $t('profile.name') }} : {{ AuthStore.profile.name }}</li>
                        <li style="margin-top:16px">{{ $t('profile.birthday') }} :
                            <template v-if="AuthStore.profile.birthday">{{ AuthStore.profile.birthday }}</template>
                            <template v-else>-</template>
                        </li>
                        <li style="margin-top:16px">{{ $t('profile.gender') }} : {{ $t('profile.genderHint.' + AuthStore.profile.gender) }}</li>
                    </ul>
                </div>
            </div>
        </BCard>

        <BCard class="mt-3">

            <BCardTitle class="clearfix">
                {{ $t('profile.title.security') }}
            </BCardTitle>

            <div class="clearfix">
                <ul class="list-unstyled editable" style="line-height:2.3">
                    <li class="clearfix">
                        <NuxtLink :to="{ name: 'profile-password'}" style="display:block">
                            <div class="float-end">
                                <Icon name="fa:angle-right" width="17" height="17" />
                            </div>

                            <span style="vertical-align:middle;">{{ $t('profile.password') }} :</span>

                            <span style="zoom:0.45; vertical-align:middle; letter-spacing:20px">
                                <Icon name="fa:circle" width="16" height="16" class="mx-3" />
                                <Icon name="fa:circle" width="16" height="16" class="mx-3" />
                                <Icon name="fa:circle" width="16" height="16" class="mx-3" />
                                <Icon name="fa:circle" width="16" height="16" class="mx-3" />
                                <Icon name="fa:circle" width="16" height="16" class="mx-3" />
                                <Icon name="fa:circle" width="16" height="16" class="mx-3" />
                                <Icon name="fa:circle" width="16" height="16" class="mx-3" />
                                <Icon name="fa:circle" width="16" height="16" class="mx-3" />
                            </span>
                        </NuxtLink>
                    </li>

                    <li class="clearfix" style="margin-top:24px">
                        <NuxtLink :to="{ name: 'profile-mobile'}" style="display:block">
                            <div class="float-end">
                                <Icon name="fa:angle-right" width="17" height="17"/>
                            </div>

                            <div>{{ $t('profile.mobile') }} :
                                <template v-if="AuthStore.profile.mobile.number">({{ AuthStore.profile.mobile.code }}) {{ AuthStore.profile.mobile.number }}</template>
                                <template v-else>-</template>
                            </div>
                       </NuxtLink>
                    </li>
                </ul>
            </div>
        </BCard>

        <BCard class="mt-3">

            <BCardTitle>
                {{ $t('profile.title.preferences') }}
            </BCardTitle>

            <div class="clearfix">
                <ul class="list-unstyled editable" style="line-height:2.3">
                    <li class="clearfix">
                        <NuxtLink :to="{ name: 'profile-preferences'}" style="display:block">
                            <div class="float-end">
                                <Icon name="fa:angle-right" width="17" height="17"/>
                            </div>

                            <template v-if="AuthStore.profile.lang">
                                {{ $t('profile.languageHint.' + AuthStore.profile.lang) }}
                                </template>
                            <span v-else class="text-secondary">
                                -
                            </span>
                            <span style="color:#A3ABB2">/</span>
                            <template v-if="AuthStore.profile.currency">
                                {{ $t('profile.currencyHint.' + AuthStore.profile.currency) }}
                            </template>
                            <span v-else class="text-secondary">
                                -
                            </span>
                        </NuxtLink>
                    </li>

                </ul>
            </div>

        </BCard>
    </BContainer>
</template>

<script setup>

    import api from '~/api/api.js';

    const { t } = useI18n()

    definePageMeta({
        layout: "main",
        middleware: 'auth',
    })

    useHead({
        title: t('profile.title.show')
    })

    const AuthStore = useAuthStore();

    const validate = reactive({
        step : 'notProcess'
    });


    const { $event } = useNuxtApp();

    $event('breadcrumb:updated', [{
        text: t('profile.title.show'),
    }]);

    async function emailValidate(){

        validate.step = 'processing';

        let ret = await api.profile.emailValidate();

        if (!ret) {
            return;
        }

        validate.step = 'sended';
    }

    async function reload(){

        let ret = await api.profile.reload();

        AuthStore.update({
            email_validate : ret.data.email_validate
        });

        if ( ret.data.email_validate )
            validate.step = 'success';
    }

</script>