<template>
    <BContainer>
        <BCard>
            <BCardTitle class="clearfix">
                <NuxtLink :to="{ name: 'profile'}">
                    <Icon name="ph:arrow-left" width="25" height="25" class="me-3"/>
                </NuxtLink>
                <span>{{ $t('profile.title.premium') }}</span>
            </BCardTitle>

            <BRow>
            </BRow>
        </BCard>

    </BContainer>
</template>

<script setup>

    definePageMeta({
        layout: "main",
        middleware: 'auth'
    })
    
    import api from '~/api/api.js';

    let ret = await api.sys.premium();
    
</script>