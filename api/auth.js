import http from '~/utils/client';

export const auth = {
    me : function() {

        return http.get('/auth/me').then( ret => {
            return ret.data;
        });
    },

    refresh : function() {
        return http.post('/auth/refresh').then( ret => {
            return (ret) ? ret.data : undefined;
        });
    },

    logout : function() {
        return http.post('/auth/logout').then( ret => {
            return ret.data;
        });
    },
    
    update : function (data) {
        return http.post('/profile/update', {data: data}).then( ret => {
            return ret.data;
        });
    },
    
    password : function (oldPassword, newPassword1, newPassword2) {
        return http.post('/profile/password', {
                oldPassword: oldPassword,
                newPassword1: newPassword1,
                newPassword2: newPassword2,
            }).then( ret => {
            return ret.data;
        });
    },

    passwordConfirm : function (password) {
        return http.post('/profile/passwordConfirm', {
                password: password
            }).then( ret => {
            return ret.data;
        });
    },

    passwordForget : function () {
        return http.post('/profile/passwordForget', {}).then( ret => {
            return ret.data;
        });
    },
        
    verificationSend : function (countryCode, mobile){
        return http.post('/profile/verificationSend', {
            countryCode: countryCode,
            mobile: mobile,
        }).then( ret => {
            return ret.data;
        });
    },
    
    verification : function (countryCode, mobile, verificationCode) {
        return http.post('/profile/verification', {
            countryCode: countryCode,
            mobile: mobile,
            verificationCode: verificationCode
        }).then( ret => {
            return ret.data;
        });
    },


    avatar : function( file ){

        return http.post('/profile/avatar', file, {
            headers : {
                'Content-Type': 'multipart/form-data'
            }
        }).then( ret => {
            return ret.data;
        });
    },
    
    emailValidate: function() {
        return http.post('/profile/emailValidate').then( ret => {
            return ret.data;
        });
    },

    reload: function() {
        return http.post('/profile/reload').then( ret => {
            return ret.data;
        });
    },

};