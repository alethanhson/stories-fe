import axios from '@/api/axios'
import type { DescriptionResponse } from './types'

const resource = '/generate-desc'
const headers = {
  'Content-Type': 'multipart/form-data'
}

export const generate = {
  description: async (data: string): Promise<DescriptionResponse> => {
    const { data: response } = await axios.post(
      `${resource}`,
      { old_description: data },
      { headers }
    )
    return response
  }
}
