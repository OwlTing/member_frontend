<template>
    <div class="p-3">
        <Icon name="svg-spinners:270-ring-with-bg" class="me-2" />Loading...
    </div>
</template>

<script setup>

    import api from '~/api/api';

    definePageMeta({
        layout: "plain",
    });

    const route = useRoute();

    const token     = route.query.access  ? route.query.access  : '';
    const refresh   = route.query.refresh ? route.query.refresh : '';

    if (!token || !refresh) {

    }

    const AuthStore = useAuthStore();

    AuthStore.tokenSet(token, refresh);

    let ret = await api.sys.me();

    AuthStore.user(ret.data.me);

    await navigateTo({name: 'profile-show'});
    
</script>