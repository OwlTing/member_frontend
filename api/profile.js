import http from '~/composables/useRequest.js'

export const profile = {

    logout : function() {
        return http.post('/auth/logout').then( ret => {
            return ret.data;
        });
    },

    update : (data) => {
        return http.post('/profile/update', {data: data});
    },


    avatar : ( file ) => {
        return http.post('/profile/avatar', file, {
            'Content-Type': 'multipart/form-data'
        });
    },


    password : function (oldPassword, newPassword1, newPassword2) {
        return http.post('/profile/password', {
            oldPassword: oldPassword,
            newPassword1: newPassword1,
            newPassword2: newPassword2,
        });
    },

    passwordForget : () => {
        return http.post('/profile/passwordForget', {});
    },

    passwordConfirm : (password) => {
        return http.post('/profile/passwordConfirm', {
            password: password
        });
    },

    verificationSend : (code, number) => {
        return http.post('/profile/verificationSend', {
            code: code,
            number: number,
        });
    },

    verification : (code, number, verificationCode) => {
        return http.post('/profile/verification', {
            countryCode: code,
            mobile: number,
            verificationCode: verificationCode
        });
    },

    emailValidate: () => {
        return http.post('/profile/emailValidate');
    },

    reload: () => {
        return http.post('/profile/reload');
    },

};