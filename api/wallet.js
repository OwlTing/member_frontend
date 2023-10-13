import http from '~/composables/useRequest.js'

export const wallet = {
    list: () => {
        return http.get('/walletpro/asset', {});
    },

    asset: (assetId) => {
        return http.get(`/walletpro/asset/${assetId}`, {});
    },

    balance: (assetId) => {
        
        if ( typeof assetId == 'string' )
            assetId = [assetId];

        return http.get(`/walletpro/balance?assetId=${assetId.join(',')}`, {});
    }
}
