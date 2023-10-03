import http from '~/composables/useRequest.js'

export const sys = {
    login: (email, password) => {
        return http.post('login', {email: email, password: password}, false);
    },

    logout: () => {
        return http.post('logout');
    },

    me: () => {
        return http.get("auth/me");
    },

    premium: () => {
        return http.post("auth/premium");
    },
}
