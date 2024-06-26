import { fetchSearchStory, getFilterListStory } from '@/api/modules/story'
import type { Story } from '@/api/modules/story/types'
import { defineStore } from 'pinia'

export const useStoriesStore = defineStore('stories', {
  state: () => ({
    searchKeyWord: '',
    searchResults: [] as Story[],
    filterResults: [] as Story[],
    authorSearchResults: [] as any[],
    bookSearchResults: [] as any[]
  }),
  actions: {
    async fetchGetFilterListStory(params) {
      try {
        const response = await getFilterListStory(params)
        this.filterResults = response.data || []
      } catch (error) {
        this.filterResults = []
        return Promise.reject(error)
      }
    },
    async searchStories(keyword) {
      try {
        const response = await fetchSearchStory(keyword)
        const data = response.data || []
        this.authorSearchResults = data
          .filter((item) => item.type === 'authors')
          .map((item) => item.data)

        this.bookSearchResults = data
          .filter((item) => item.type === 'books')
          .map((item) => item.data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    clearSearchResults() {
      this.searchKeyWord = ''
      this.authorSearchResults = []
      this.bookSearchResults = []
    }
  }
})
