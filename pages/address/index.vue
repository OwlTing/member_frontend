<template>
    <BContainer>
        <BCard>
            <BCardTitle class="clearfix">
                <NuxtLink :to="{ name: 'profile'}">
                    <Icon name="ph:arrow-left" width="25" height="25" class="me-3"/>
                </NuxtLink>
                <span>{{ $t('profile.title.address') }}</span>
            </BCardTitle>

            <div>
                <div v-if="!form.created">
                    <BForm @submit="onAddressSubmit" @submit.stop.prevent>
                        <BFormGroup :label="$t('profile.address.address')" required>
                            <BFormInput type="string" v-model="form.address" :autofocus="true"  autocomplete="off" v-bind:class="{'is-invalid' : (formerrs.hasOwnProperty('address')) }"></BFormInput>
                            <BFormInvalidFeedback :force-show="true" :key="inpKey">
                                 <template v-if="formerrs.hasOwnProperty('address')">{{ formerrs.address.join(', ') }}</template>
                            </BFormInvalidFeedback>
                        </BFormGroup>

                        <BFormGroup :label="$t('profile.address.note')" class="mt-3">
                            <BFormTextarea v-model="form.note" rows="4"></BFormTextarea>
                        </BFormGroup>

                        <BFormGroup class="mt-5 text-end">
                            <BButton type="submit" variant="primary" :disabled="(form.loading)">{{ $t('m.ok') }}</BButton>
                        </BFormGroup>
                    </BForm>
                </div>
                <div v-else>
                    <div>
                        <div class="d-flex justify-content-between">
                            {{ $t('profile.address.address') }}
                            <b-form-checkbox switch v-model="updatedSwitch" :disabled="isLoadingBalance" class="ms-3">{{  $t('profile.address.update')  }}</b-form-checkbox>
                        </div>
                        <div class="mt-2">
                            <div v-if="!updatedSwitch" class="font-monospace ps-2 text-break">{{ form.address }}</div>
                            <div v-else>
                                <BFormInput type="string" v-model="form.address" :autofocus="true"  autocomplete="off" :state="updateInputState"></BFormInput>
                                <b-form-invalid-feedback id="input-live-feedback" v-if="updateInputState === false">
                                    invalid address
                                </b-form-invalid-feedback>
                                <BButton type="submit" size="sm" variant="primary" :disabled="isLoadingBalance" class="mt-2" @click="onAddressSubmit">{{ $t('m.ok') }}</BButton>
                            </div>

                            <div class="mt-2 ps-2">{{ form.note }}</div>
                        </div>
                    </div>
                    <div class="mt-5">
                        <div class="d-flex flex-row-reverse">
                            <b-button type="submit" size="sm" variant="primary" :disabled="isLoadingBalance" @click="getBalance">
                                <Icon name="fa:refresh" class="me-1 pb-1 text-white" width="14"/>{{  $t('profile.address.refresh')  }}
                            </b-button>
                        </div>
                        <BTable
                            :items="!isLoadingBalance ? table_items : []"
                            :fields="table_fields"
                            responsive
                            :busy="isLoadingBalance"
                            bordered
                            class="mt-1"
                        >
                            <template #table-busy>
                                <div class="text-center text-danger my-4">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong>Loading...</strong>
                                </div>
                            </template>
                            <template #cell(chain)="data">
                                <div class="d-flex align-items-center">
                                    <b-img :src="`/imgs/network/${data.value.toLowerCase()}.png`" width="20px" height="20px" class="me-1" />
                                    <span>{{ data.value }}</span>
                                </div>
                            </template>
                        </BTable>
                    </div>
                </div>
            </div>
        </BCard>
    </BContainer>
</template>

<script setup>
    let inpKey = ref(0);

    definePageMeta({
        layout: "main",
        middleware: 'auth'
    })

    const { t } = useI18n()

    useHead({
        title: t('profile.title.address')
    })

    const { $event } = useNuxtApp();

    $event('breadcrumb:updated', [{
        text: t('profile.title.address'),
    }]);

    import api from '~/api/api.js';

    let ret = await api.address.my();

    let form = reactive({
        created : (ret.status) ? true : false,
        loading : false,

        address : ( !ret.status ) ? '' : ret.data.address.address,
        note    : ( !ret.status ) ? '' : ret.data.address.note
    });

    let formerrs = reactive({});

    async function onAddressSubmit(){

        const addressRegex = /^0x[a-fA-F0-9]{40}$/g
        if (!addressRegex.test(form.address)) {
            updateInputState.value = false
            return false
        }

        form.loading = true;

        let ret = ( form.created )
            ? await api.address.update( form.address, form.note )
            : await api.address.store( form.address, form.note );

        if ( !ret.status ) {
            form.loading = false;
            formerrs = ret.error;

            inpKey.value = inpKey.value+1;

            return;
        }

        form.created = true;

        form.address = ret.data.address.address;
        form.note    = ret.data.address.note;
        updatedSwitch.value = false
        updateInputState.value = null
        getBalance()
    }
    
    const authStore = useAuthStore()
    const { totalBalance } = useChainBalance()
    const isLoadingBalance = ref(false)
    const updatedSwitch = ref(false)
    const updateInputState = ref(null)
    const table_fields = ref([
        { key: 'chain', label: 'Chain' },
        { key: 'crypto', label: 'Crypto' },
        { key: 'USDC', label: 'USDC'}
    ])
    const table_items = computed(() => {
        return authStore.getChainData
    })

    const getBalance = async () => {
        isLoadingBalance.value = true
        await totalBalance(form.address)
        isLoadingBalance.value = false
    }

    onMounted(async () => {
        if (form.address) {
            getBalance()
        }
    })


</script>