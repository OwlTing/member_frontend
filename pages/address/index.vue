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
                    <dl>
                        <dt>{{ $t('profile.address.address') }}</dt>
                        <dd>
                            <div class="font-monospace ps-2">{{ form.address }}</div>
                            <div class="mt-2 ps-2">{{ form.note }}</div>
                        </dd>
                    </dl>
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
console.log(ret);
        form.created = true;

        form.address = ret.data.address.address;
        form.note    = ret.data.address.note;
    }

</script>