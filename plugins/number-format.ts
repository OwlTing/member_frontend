import VueNumberFormat from '@igortrindade/vue-number-format'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueNumberFormat, { decimal: '.', thounsand: ',' })
})