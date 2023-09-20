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
                <BNavItem :to="{ name: 'profile-show'}" @click="show = false" :active="($route.name == 'profile-show') ? true : false">
                    <Icon name="fa:user" width="16" height="16" class="me-4"/>{{ $t('sidebar.profile') }}
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
    import api from '~/api/api.js';

    const { $event, $listen } = useNuxtApp();

    let breadcrumb = ref([]);

    $listen('breadcrumb:updated', (b) => {

        let item = [{
            text: t('m.app'),
            href : '/'
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