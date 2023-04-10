export const state = () => ({
    isLogin : false,

    token   : {
        access  : '',
        refresh : ''
    },

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
            'code'      : null,
            'number'    : null,
        },

    }
});

export const getters = {
    getMe     : state => state.profile,
    getToken  : state => state.token,
    isLogin   : state => state.isLogin
};

export const mutations = {
    SET_LOGIN_STATUS (state, bool) {
        state.isLogin = bool
    },

    SET_PROFILE (state, profile) {
        state.profile = profile;
    },

    SET_TOKEN (state, token) {
        state.token = token;
    }
};

export const actions = {

    logout ({ commit }) {

        commit('SET_LOGIN_STATUS', false);

        commit('SET_PROFILE', {
            uuid            : null,
            email           : null,
            email_validate  : null,

            name            : null,
            birthday        : null,
            gender          : null,

            avatar          : null,
            lang            : null,
            currency        : null,

            mobile  : {
                'code'      : null,
                'number'    : null,
            },
        });

        commit('SET_TOKEN', {token: '', refresh: ''});
    },

    token({ commit }, token) {
        commit('SET_TOKEN', token);
    },

    profile({ commit, state }, profile) {
        commit('SET_LOGIN_STATUS',  true);
        commit('SET_PROFILE',       {...state.profile, ...profile});
    }
};
