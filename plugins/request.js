import { setClient } from '../utils/client'
import Cookies from 'js-cookie';

const cookieparser = require('cookieparser');


export default function ({ $axios, app, redirect, error, store }) {

    $axios.setHeader('Content-Type', 'application/json')

    $axios.onRequest( async (config) => {

        const token = store.state.user.token.access;
        if (token) config.headers.Authorization = `Bearer ${token}`
        config.baseURL = process.env.API_BASE_URL;

        return config
    });


    $axios.onRequestError((e) => {
        return Promise.reject(e)
    })

    $axios.onResponse((response) => {
        console.debug(`[onResponse]👌 ${response.config.method} ${response.status} success.`)
        console.debug(`api: ${response.config.url.replace(response.config.baseURL, '')}, baseURL: ${response.config.baseURL}`)
        return response
    });


    $axios.onResponseError((error) => {

        if ( error.response.hasOwnProperty('status') && error.response.status == 401 ) {
            return redirect( process.env.AUTH_LOGIN_REDIRECT );
        }

        console.error(`[onResponseError]🚨 Error Info:`)
        console.table({
            message: error.message,
            method: error.config.method,
            api: error.config.url.replace(error.config.baseURL, ''),
            baseURL: error.config.baseURL,
            Authorization: error.config.headers.Authorization
        });

        return Promise.reject(error);
    });


    setClient($axios)
}

