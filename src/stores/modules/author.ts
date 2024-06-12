import { defineStore } from 'pinia'
import { authors } from '@/api/modules/author'
import type {
  StoryPostedResponse,
  Story,
  ChapterPostedResponse,
  Chapter
} from '@/api/modules/author/types'

export const useAuthorStore = defineStore('author', {
  state: () => ({
    stories: [] as Story[],
    chapters: [] as Chapter[]
  }),
  getters: {
    getBooks: (state) => state.stories,
    getChapters: (state) => state.chapters
  },
  actions: {
    async fetchBookPosted() {
      const res: StoryPostedResponse = await authors.fetchBookPostedApi()
      this.stories = res.data
      return res.data
    },
    async fetChapterPosted() {
      const res: ChapterPostedResponse = await authors.fetchChapterPostedApi()
      this.chapters = res.data
      return res.data
    }
  }
})
