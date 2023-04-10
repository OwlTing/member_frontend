import http from '~/utils/client';

export const project = {
    index : function() {
        return http.get('/project').then( ret => {
            return ret.data;
        });
    },

    show : function(code) {
        return http.get(`/project/${code}`).then( ret => {
            return ret.data;
        });
    },

};