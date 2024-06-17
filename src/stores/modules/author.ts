import { defineStore } from 'pinia'
import { authors } from '@/api/modules/author'
import type {
  StoryPostedResponse,
  Story,
  AuthorData,
  DetailAuthorResponse
} from '@/api/modules/author/types'

export const useAuthorStore = defineStore('author', {
  state: () => ({
    stories: [] as Story[],
    infoAuthor: {} as AuthorData
  }),
  getters: {
    getStories: (state) => state.stories,
    getInfoAuthor: (state) => state.infoAuthor
  },
  actions: {
    async fetchBookPosted() {
      const res: StoryPostedResponse = await authors.fetchBookPostedApi()
      this.stories = res.data
      return res.data
    },
    async getData() {
      const res: DetailAuthorResponse = await authors.getDataApi()
      this.infoAuthor = res.data
      return res.data
    },
    resetAuthor() {
      this.infoAuthor = {} as AuthorData
      this.stories = []
    }
  }
})
