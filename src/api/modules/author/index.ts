import axios from '@/api/axios'
import type {
  DetailAuthorResponse,
  FormAuthorData,
  StoryPostedResponse
} from '@/api/modules/author/types'

const resource = '/authors'
const headers = {
  'Content-Type': 'multipart/form-data'
}

export const authors = {
  create: (data: FormAuthorData): Promise<DetailAuthorResponse> =>
    axios.post(`${resource}/register`, data, { headers }),
  getDataApi: async (): Promise<DetailAuthorResponse> => await axios.get(`${resource}`),
  fetchBookPostedApi: async (): Promise<StoryPostedResponse> =>
    await axios.get(`${resource}/book-posted`)
}
