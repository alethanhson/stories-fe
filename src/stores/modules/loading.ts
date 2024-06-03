import { defineStore } from 'pinia'

type LoadingState = {
  isLoading: boolean
}

export const useLoadingStore = defineStore({
  id: 'loading',
  state: (): LoadingState => ({
    isLoading: false
  }),
  actions: {
    setLoading() {
      this.isLoading = true
    },
    removeLoading() {
      this.isLoading = false
    }
  }
})
