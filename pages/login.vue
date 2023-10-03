<template>
    <div class="p-3">
        <Icon name="svg-spinners:270-ring-with-bg" class="me-2" />Loading...
    </div>
</template>

<script setup>

    import api from '~/api/api';
    const { t } = useI18n()

    useHead({
        title: 'Loading...'
    })

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

    let me = ret.data.me;

    me.mobile = JSON.parse(me.mobile);

    AuthStore.user(me);

    await navigateTo({name: 'profile'});

</script>