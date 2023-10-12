import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', {
    state: () => ({

        loggedIn   : false,

        profile: {
            uuid            : null,
            email           : null,
            email_validate  : null,

            name            : null,
            birthday        : null,
            gender          : null,

            avatar          : null,
            lang            : null,
            currency        : null,

            mobile          : {
                code        : null,
                number      : null,
            },

        },

        token: {
            access  : null,
            refresh : null,
        },
        chain: []
    }),

    persist: true,

    actions: {
        user(usr) {

            this.loggedIn = true;

            this.profile  = usr;
        },

        tokenSet(access, refresh) {
            this.token.access  = access;
            this.token.refresh = refresh;
        },

        logout() {
            this.loggedIn = false;
            this.token = { };
        },

        update (data){

            if ( data.hasOwnProperty('email_validate') )
                this.profile.email_validate = data.email_validate;

            if ( data.hasOwnProperty('name') )
                this.profile.name = data.name;

            if ( data.hasOwnProperty('birthday') )
                this.profile.birthday = data.birthday;

            if ( data.hasOwnProperty('gender') )
                this.profile.gender = data.gender;

            if ( data.hasOwnProperty('avatar') )
                this.profile.avatar = data.avatar;

            if ( data.hasOwnProperty('lang') )
                this.profile.lang = data.lang;

            if ( data.hasOwnProperty('lang') )
                this.profile.lang = data.lang;

            if ( data.hasOwnProperty('currency') )
                this.profile.currency = data.currency;

            if ( data.hasOwnProperty('mobile') )
                this.profile.mobile = data.mobile;
        },
        setBalance(payload) {
            this.chain = payload
        }
    },
    getters: {
        getChainData: state => {
            return state.chain
        }
    }
});