import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: (process.browser) ? window.localStorage : null
})

export const plugins = [vuexLocal.plugin];
