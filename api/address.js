import http from '~/composables/useRequest.js'

export const address = {

    my: () => {
        return http.get('/address', {});
    },

    store: (address, note) => {
        return http.post('/address', {
            address: address,
            note: note
        });
    },

    update: (address, note) => {
        return http.post('/address/update', {
            address: address,
            note: note
        });
    },
}
