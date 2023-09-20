<template>
    <BContainer>
        <BCard>
            <BCardTitle class="clearfix">
                <NuxtLink :to="{ name: 'profile-show'}">
                    <Icon name="ph:arrow-left" width="25" height="25" class="me-3"/>
                </NuxtLink>
                <span>{{ $t('profile.title.preferences') }}</span>
            </BCardTitle>

            <b-row>
                <BCol md="6" sm="10" xs="12">
                    <div class="mt-5">
                        <BForm @submit="onSubmit" @submit.stop.prevent>

                            <BFormGroup :label="$t('profile.language')" class="mt-5" required>
                                <BFormSelect v-model="form.lang" :options=" [
                                    { text: $t('m.selectPlease'),               value: null, disabled: true },
                                    { text: $t('profile.languageHint.en'),      value: 'en'     },
                                    { text: $t('profile.languageHint.ja'),      value: 'ja'     },
                                    { text: $t('profile.languageHint.zh-TW'),   value: 'zh-TW'  }
                                ]" required>
                                </BFormSelect>
                            </BFormGroup>

                            <BFormGroup :label="$t('profile.currency')" class="mt-5" required>
                                <BFormSelect v-model="form.currency" :options=" [
                                    { text: $t('m.selectPlease'), value: null, disabled: true    },
                                    { text: $t('profile.currencyHint.TWD'), value: 'TWD'},
                                    { text: $t('profile.currencyHint.USD'), value: 'USD'    },
                                    { text: $t('profile.currencyHint.JPY'), value: 'JPY'    },
                                    { text: $t('profile.currencyHint.EUR'), value: 'EUR'    },
                                ]" required>
                                </BFormSelect>
                            </BFormGroup>

                            <BFormGroup class="mt-5">
                                <BButton type="submit" variant="primary" :disabled="(form.loading)">{{ $t('m.save') }}</BButton>
                            </BFormGroup>
                        </BForm>
                    </div>
                </BCol>
            </b-row>
        </BCard>

    </BContainer>
</template>

<script setup>

    const AuthStore = useAuthStore();

    const router = useRouter();

    import api from '~/api/api.js';

    definePageMeta({
        layout: "main",
        middleware: 'auth'
    })


    const { locale, t } = useI18n()

    useHead({
        title: t('profile.title.preferences')
    })

    const { $event } = useNuxtApp();

    $event('breadcrumb:updated', [{
        text: t('profile.title.show'),
        to : router.resolve({name:'profile-show'}).path
    }, {
        text: t('profile.title.preferences')
    }]);


    let form = reactive({
        loading : false,

        lang        : AuthStore.profile.lang,
        currency    : AuthStore.profile.currency
    });

    let langMap = reactive({
        'en'    : 'en-US',
        'ja'    : 'ja-JP',
        'zh-TW' : 'zh-TW',
    });

    async function onSubmit(e) {
        e.preventDefault()

        form.loading = true;

        let ret = await api.profile.update({
            lang     : form.lang,
            currency : form.currency,
        });

        if ( !ret.status ) {
            form.loading = false;
            return;
        }

        locale.value = langMap[ form.lang ];

        form.loading = true;

        AuthStore.update(ret.data.user);

        await navigateTo({ name: 'profile-show' });
    }

</script>