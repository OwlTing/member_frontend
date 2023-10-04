<template>
    <BContainer>
        <BCard>
            <BCardTitle class="clearfix">
                <NuxtLink :to="{ name: 'profile'}">
                    <Icon name="ph:arrow-left" width="25" height="25" class="me-3"/>
                </NuxtLink>
                <span>{{ $t('profile.title.premium') }}</span>
            </BCardTitle>

            <div>
                <div v-if="premium.level == 'NORMAL'" v-html="$t('profile.premium.info')" class="mb-4"></div>

                <div v-if="premium.plan.hasOwnProperty('sign')" style="border:2px solid #d9b474; border-radius:1rem" class="mb-4 p-4">
                    <div style='font-size:1.3rem; color:#25819e; font-weight:bold'>{{ $t('profile.premium.title', {type : $t(`profile.premium.type.${premium.plan.sign}`)}) }}</div>
                    <div style='margin-top:10px; color:#25819e'>
                        TWD <span style="font-size:1.5rem; font-weight:bold">${{ premium.plan.price }}</span>
                    </div>
                    <div style='margin-top:5px; font-size:0.9rem'>{{ premium.plan.description }}</div>
                    <div style='margin-top:15px'>{{ $t('profile.premium.period') }}: {{ $dayjs(premium.plan.start).format('YYYY/MM/DD') }} ~ {{ $dayjs(premium.plan.end).format('YYYY/MM/DD') }}</div>
                </div>

                <div>
                    <BLink class="btn btn-primary" href="https://premium.owlting.com/" target="_blank">
                        {{ $t('profile.premium.redirect') }}
                    </BLink>
                </div>
            </div>
        </BCard>

    </BContainer>
</template>

<script setup>

    const { t } = useI18n()

    useHead({
        title: t('profile.title.premium')
    })

    const { $event } = useNuxtApp();

    $event('breadcrumb:updated', [{
        text: t('profile.title.premium'),
    }]);


    definePageMeta({
        layout: "main",
        middleware: 'auth'
    })

    import api from '~/api/api.js';

    let ret = await api.sys.premium();

    let premium = reactive({
        level : "NORMAL",
        plan : {}
    });

    premium.level   = ret.data.premium.level;
    premium.plan    = ret.data.premium.plan;
</script>