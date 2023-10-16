import { defineStore } from 'pinia'

export const useCommonStore = defineStore('commonStore', {
  state: () => ({
    copyShow: false
  }),
  actions: {
    setCopyShow(payload) {
      this.copyShow = payload
    }
  },
  getters: {
    getCopyShow: state => {
      return state.copyShow
    }
  }
})
