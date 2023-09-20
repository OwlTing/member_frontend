<template>
    <NuxtLayout />
</template>

<script setup lang="ts">

    const AuthStore = useAuthStore();
    const { locale } = useI18n();

    watch(
        () => AuthStore.profile.lang, 
        () => { 
            let langMap = {
                'en'    : 'en-US',
                'ja'    : 'ja-JP',
                'zh-TW' : 'zh-TW',
            };
        
            locale.value = langMap[AuthStore.profile.lang]; 
        },
        { immediate: true }
    )

</script>