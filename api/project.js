import http from '~/composables/useRequest.js'

export const project = {
    index: () => {
        return http.get('/project', {});
    },

    show: (code) => {
        return http.get(`/project/${code}`, {});
    },

    reservation: (code, size, page) => {
        return http.get(`/project/${code}/reservation`, {
            size: size,
            page: page,
        });
    }
}
