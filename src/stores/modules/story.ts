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
        console.log('Updated filterResults:', this.filterResults)
      } catch (error) {
        this.filterResults = []
        return Promise.reject(error)
      }
    },
    async searchStories(keyword) {
      try {
        const response = await fetchSearchStory(keyword)

        if (response.data) {
          if (response.data.some((item) => item.type === 'authors')) {
            this.authorSearchResults = response.data
              .filter((item) => item.type === 'authors')
              .map((item) => item.author)
          } else {
            this.authorSearchResults = []
          }

          if (response.data.some((item) => item.type === 'books')) {
            this.bookSearchResults = response.data
              .filter((item) => item.type === 'books')
              .map((item) => item.book)
          } else {
            this.bookSearchResults = []
          }
        } else {
          this.authorSearchResults = []
          this.bookSearchResults = []
        }
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
