<template>
    <div id="layout-main">
        <div class="sidebarBox" v-bind:class="{ active: show }" @click.stop="">
            <div class="title">
                <NuxtLink :to="{ name: 'index'}">
                    <BImg src="/imgs/owlting_logo.svg" />
                </NuxtLink>
            </div>
            <div class="profileBox clearfix">
                <div class="float-start" style="margin-right:16px">
                    <BAvatar variant="info" :src="AuthStore.profile.avatar" size="50px"/>
                </div>
                <div style="overflow:hidden">
                    <div class="name text-truncate">{{ AuthStore.profile.name }}</div>
                    <div class="email text-truncate">{{ AuthStore.profile.email }}</div>
                </div>
            </div>

            <BNav vertical>
                <BNavItem :to="{ name: 'profile'}" @click="show = false" :active="($route.name == 'profile') ? true : false">
                    <div class="clearfix">
                        <div class="float-start me-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                                <path d="M12.6185 11.387C12.4975 11.05 12.2405 10.7795 11.91 10.6415L7.974 8.9945H9.174C9.8785 8.9945 10.4495 8.4235 10.4495 7.719V1.775C10.4495 1.071 9.8785 0.5 9.174 0.5H4.7815C4.077 0.5 3.506 1.071 3.506 1.775V7.719C3.506 8.4235 4.077 8.9945 4.7815 8.9945H5.9915L2.0705 10.6415C1.741 10.7795 1.4845 11.0495 1.364 11.3865L0 15.186C4.341 17.6015 9.622 17.605 13.966 15.1945L13.982 15.186L12.6185 11.387Z"/>
                            </svg>
                        </div>
                        <span>{{ $t('sidebar.profile') }}</span>
                    </div>
                </BNavItem>

                <BNavItem :to="{ name: 'premium'}" @click="show = false" :active="($route.name == 'premium') ? true : false">
                    <div class="clearfix">
                        <div class="float-start me-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                                <path d="M17.3332 9.00002C17.3332 13.6024 13.6022 17.3334 8.99984 17.3334C4.39746 17.3334 0.666504 13.6024 0.666504 9.00002C0.666504 4.39765 4.39746 0.666687 8.99984 0.666687C13.6022 0.666687 17.3332 4.39765 17.3332 9.00002ZM8.99984 12.8502C10.3417 10.7122 12.397 9.06722 14.8332 8.24863C13.3921 6.66377 11.3128 5.66669 8.99984 5.66669C6.68685 5.66669 4.6076 6.66328 3.1665 8.24863C5.60126 9.06722 7.65801 10.7127 8.99984 12.8502Z"/>
                            </svg>

                        </div>
                        <span>{{ $t('sidebar.premium') }}</span>
                    </div>
                </BNavItem>

                <BNavItem :to="{ name: 'address'}" @click="show = false" :active="($route.name == 'address') ? true : false">
                    <div class="clearfix">
                        <div class="float-start me-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                <rect fill="none" x="0" y="0" width="24" height="24" />
                                <g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 20H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2Z"/><path fill="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M16.5 14a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1Z"/><path d="M18 7V5.603a2 2 0 0 0-2.515-1.932l-11 2.933A2 2 0 0 0 3 8.537V9"/></g>
                            </svg>
                        </div>
                        <span>{{ $t('sidebar.address') }}</span>
                    </div>
                </BNavItem>

                <BNavItem class="logoutBox">
                    <BButton variant="link" @click="logout" class="p-0">{{ $t('m.logout') }}</BButton>
                </BNavItem>
            </BNav>

            <div v-if="project.length > 0" class="mt-3">
                <div class="small px-4 my-2">{{ $t('sidebar.consumption') }}</div>
                <BNav vertical>
                    <BNavItem :to="{ name: 'project-show', params: {show : item.code}}" v-for="(item, key) in project" :key="item.code" @click="show = false">
                        {{ $t(`project.title.${item.sym}`) }}
                    </BNavItem>
                </BNav>
            </div>
            <div class="mt-3">
                <div class="small px-4 my-2">{{ $t('sidebar.walletpro') }}</div>
                <BNav vertical>
                    <BNavItem :to="{ name: 'wallet-pro' }">
                        Wallet Pro
                    </BNavItem>
                </BNav>
            </div>
        </div>

        <div class="mainBox">
            <div class="navbarBox">
                <BNavbar class="mobileBox clearfix" variant="light">
                    <BNavbarBrand class="mb-0 float-left">
                        <BImg src="/imgs/owlting_logo.svg" class="d-inline-block align-top" />
                    </BNavbarBrand>
                </BNavbar>

                <BNavbar class="breadcrumbBox clearfix" variant="light">
                    <BBreadcrumb :items="breadcrumb"></BBreadcrumb>
                </BNavbar>

                <BNavbarNav class="avatarBox">
                    <BNavItem @click.stop="menuToggle">
                        <BAvatar variant="light" :src="AuthStore.profile.avatar" v-bind:class="{ active: show }" size="32px" class="me-2"/>
                        <span class="toggle" style="line-height:32px; vertical-align:middle; color:#3C4145">
                            <Icon name="fa:bars" v-if="!show" width="12" height="12" />
                            <Icon name="fa6-solid:xmark" v-if="show" width="20" height="20" />
                        </span>
                    </BNavItem>

                    <transition name="dropdown">
                        <div class="menuBox" v-show="show" v-on:click.stop="">
                            <div class="profileBox clearfix" style="border-bottom:1px solid #e9edef">
                                <div class="float-start" style="margin-right:16px">
                                    <BAvatar variant="light" :src="AuthStore.profile.avatar" size="50px"/>
                                </div>
                                <div style="overflow:hidden">
                                    <div class="name text-truncate">{{ AuthStore.profile.name }}</div>
                                    <div class="email text-truncate">{{ AuthStore.profile.email }}</div>
                                </div>
                            </div>

                            <div class="logoutBox">
                                <BButton variant="link" @click="logout" class="p-0">{{ $t('m.logout') }}</BButton>
                            </div>
                        </div>
                    </transition>
                </BNavbarNav>
            </div>

            <section>
                <NuxtPage />
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
    const router    = useRouter();

    import api from '~/api/api.js';

    const { $event, $listen } = useNuxtApp();

    let breadcrumb = ref([]);

    $listen('breadcrumb:updated', (b) => {

        let item = [{
            text: t('m.app'),
            to : router.resolve({name:'profile'}).path
        }];

        for ( let k in b) {
            item.push(b[k]);
        }

        breadcrumb.value = item;
    });

    const AuthStore = useAuthStore();

    const { t } = useI18n()

    let show = ref(null);

    let project = reactive([]);

    let ret = await api.project.index();

    project = ret.data.project;

    const cfg = useRuntimeConfig()

    async function logout(){

        let ret = await api.sys.logout();

        AuthStore.logout();

        menuToggle();

        await navigateTo( ret.data.redirect, {
            external: true
        });

        return;
    }

    function menuToggle(){

        show.value = !show.value;

        const evt = (e) => {
            show.value = false;
            window.removeEventListener('click', evt);
        };

        window.addEventListener('click', evt);
    }

</script>


<style>
    .page-enter-active, .page-leave-active {transition:all .3s;}
    .page-enter-from, .page-leave-to {opacity:0; filter: blur(.7rem);}
</style>