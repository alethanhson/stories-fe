import axios from '@/api/axios'
import type {
  DetailAuthorResponse,
  FormAuthorData,
  StoryPostedResponse,
  ChapterPostedResponse,
  FollowerResponse
} from '@/api/modules/author/types'

const resource = '/authors'
const headers = {
  'Content-Type': 'multipart/form-data'
}

export const authors = {
  create: (data: FormAuthorData): Promise<DetailAuthorResponse> =>
    axios.post(`${resource}/register`, data, { headers }),
  fetchBookPostedApi: async (): Promise<StoryPostedResponse> =>
    await axios.get(`${resource}/book-posted`),
  fetchChapterPostedApi: async (): Promise<ChapterPostedResponse> =>
    await axios.get(`${resource}/chapter-posted`),
  fetchFollowerApi: async (): Promise<FollowerResponse> => await axios.get(`${resource}/follower`)
}
