<template>
    <div id="layout-main">

        <div class="sidebarBox" v-bind:class="{ active: show }" @click.stop="">
            <div class="title">
                <NuxtLink :to="{ name: 'index'}">
                    <b-img src="~/assets/imgs/owlting_logo.svg"></b-img>
                </NuxtLink>
            </div>
            <div class="profileBox clearfix">
                <div class="float-left" style="margin-right:16px">
                    <b-avatar variant="info" :src="profile.avatar" size="50px"/>
                </div>
                <div style="overflow:hidden">
                    <div class="name text-truncate">{{ profile.name }}</div>
                    <div class="email text-truncate">{{ profile.email }}</div>
                </div>
            </div>

            <b-nav vertical>
                <b-nav-item :to="{ name: 'profile-show'}" @click="show = false" :active="($route.name == 'profile-show') ? true : false">
                    <fa icon='user' style="font-size:20px; margin-right:16px"/>{{ $t('sidebar.profile') }}
                </b-nav-item>

                <b-nav-item class="logoutBox">
                    <b-button variant="link" @click="logout" class="p-0">{{ $t('m.logout') }}</b-button>
                </b-nav-item>
            </b-nav>

            <div v-if="project.length > 0" class="mt-3">
                <div class="small px-4">{{ $t('sidebar.consumption') }}</div>
                <b-nav vertical>
                    <b-nav-item :to="{ name: 'project-show', params: {code : item.code}}" v-for="(item, key) in project" :key="item.code">
                        {{ item.name }}
                    </b-nav-item>
                </b-nav>
            </div>
        </div>
        <div class="mainBox">
            <div class="navbarBox">
                <b-navbar class="mobileBox clearfix" variant="light">
                    <b-navbar-brand class="mb-0 float-left">
                        <b-img src="~/assets/imgs/owlting_logo.svg" class="d-inline-block align-top"></b-img>
                    </b-navbar-brand>
                </b-navbar>

                <b-navbar class="breadcrumbBox clearfix" variant="light">
                    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
                </b-navbar>

                <b-navbar-nav class="avatarBox">
                    <b-nav-item @click.stop="menuToggle">
                        <b-avatar variant="info" :src="profile.avatar" v-bind:class="{ active: show }" size="32px"/>
                        <span class="toggle" style="line-height:32px; vertical-align:middle; color:#3C4145">
                            <fa icon="bars"  v-if="!show" style="font-size:12px"/>
                            <fa icon="xmark" v-if="show"  style="font-size:20px"/>
                        </span>
                    </b-nav-item>

                    <transition name="dropdown">
                        <div class="menuBox" v-show="show" v-on:click.stop="">
                            <div class="profileBox clearfix" style="border-bottom:1px solid #e9edef">
                                <div class="float-left" style="margin-right:16px">
                                    <b-avatar variant="info" :src="profile.avatar" size="50px"/>
                                </div>
                                <div style="overflow:hidden">
                                    <div class="name text-truncate">{{ profile.name }}</div>
                                    <div class="email text-truncate">{{ profile.email }}</div>
                                </div>
                            </div>

                            <div class="logoutBox">
                                <b-button variant="link" @click="logout" class="p-0">{{ $t('m.logout') }}</b-button>
                            </div>
                        </div>
                    </transition>
                </b-navbar-nav>
            </div>

            <section>
                <transition name="fade">
                    <Nuxt />
                </transition>
            </section>
        </div>
    </div>
</template>

<script>

import api from '~/api/api.js';

export default {
    scrollToTop: true,

    computed: {
        profile () {
            return this.$store.state.user.profile;
        }
    },

    data () {
        return {
            show: false,
            breadcrumb : [],

            project : [],
        }
    },

    async created () {

        this.$nuxt.$on('breadcrumbLoading', ($event) => this.breadcrumbLoading($event))

        let ret = await api.project.index();
        this.project = ret.data.project;
    },

    methods: {

        breadcrumbLoading( breadcrumb ) {

            let item = [{
                text: this.$t('m.app'),
                to : { name: 'index' }
            }];

            for ( let k in breadcrumb) {
                item.push(breadcrumb[k]);
            }

            this.breadcrumb = item;
        },

        close(){
            this.show = false;
        },

        async logout(){

            const ret = await api.auth.logout();
            this.$store.dispatch('user/logout');

            this.menuToggle();

            window.location.href = process.env.AUTH_LOGOUT_REDIRECT;

            return;
        },

        menuToggle(){

            this.show = !this.show;

            const evt = (e) => {
                this.show = false;
                window.removeEventListener('click', evt);
            };

            window.addEventListener('click', evt);
        }
    }
}

</script>


<style>
  .fade-enter-active, .fade-leave-active { transition: opacity .5s; }
  .fade-enter, .fade-leave-active { opacity: 0; }
</style>