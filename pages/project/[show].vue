<template>
    <div id="layout-reservation">
        <BContainer>
            <BCard>
                <BCardTitle class="clearfix">
                    <NuxtLink :to="{ name: 'profile'}">
                        <Icon name="ph:arrow-left" width="25" height="25" class="me-3"/>
                    </NuxtLink>
                    <span>{{ $t(`project.title.${project.sym}`) }}</span>
                </BCardTitle>
                <BCardBody>

                    <div v-if="page.loading">
                        <Icon name="svg-spinners:270-ring-with-bg" class="me-2" />Loading...
                    </div>
                    <template v-else>
                        <div v-if="reservation.length == 0">
                            <div class="alert alert-info" role="alert">
                                {{ $t('m.noData') }}
                            </div>
                        </div>
                        <component v-else :is="component[project.sym]" :reservation="reservation" :meta="meta" :key="key" />
                    </template>

                    <div class="mt-5">
                        <BPagination v-model="page.at" :per-page="page.per" :total-rows="page.total" @page-click="toPage" />
                    </div>
                </BCardBody>
            </BCard>
        </BContainer>
    </div>
</template>

<script setup>

    const component = {
        'Market'        : resolveComponent('reservation/Market'),
        'Owljourney'    : resolveComponent('reservation/Owljourney'),
        'Experiences'   : resolveComponent('reservation/Experiences'),
    };

    let key = ref(0);
    const { t } = useI18n();

    const router    = useRouter();

    import api from '~/api/api.js';

    definePageMeta({
        layout: "main",
        middleware: 'auth'
    })

    const route = useRoute()

    let ret = null;


    const code = ref(route.params.show);

    ret = await api.project.show(code.value);

    const project = reactive(ret.data.project);

    useHead({
        title: t(`project.title.${project.sym}`)
    })


    const { $event } = useNuxtApp();

    $event('breadcrumb:updated', [{
        text: t('profile.title.show'),
        to : router.resolve({name:'profile'}).path
    }, {
        text: t(`project.title.${project.sym}`),
    }]);

    useHead({
        title: t(`project.title.${project.sym}`)
    })


    let page = reactive({
        loading : false,
        per     : 1,
        total   : 1,
        at      : 1,
        size    : 5,
    });

    let reservation   = reactive([]);
    let meta          = reactive({});

    toPage(null, page.at);

    async function toPage(e, p) {
        page.loading = true;

        let ret = await api.project.reservation(code.value, page.size, p);

        if ( ret.data.status == false ) {
            page.loading = false;
            return;
        }

        reservation   = ret.data.reservation;
        meta          = ret.data.meta;

        key.value += 1;

        page.loading = false;

        page.per    = meta.pagination.per_page;
        page.total  = meta.pagination.total;
        page.at     = meta.pagination.current_page;

        window.scrollTo(0, 0);
    }
</script>