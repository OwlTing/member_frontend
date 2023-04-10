import http from '~/utils/client';

export const app = {

    get: function(){
        return http.get("/app");
    }
}
