import type { AxiosResponse } from 'axios'
import axios, { AxiosError } from 'axios'

import {
  CODE_ACTION_CANNOT_DONE,
  CODE_UNAUTHENTICATED,
  HTTP_BAD_REQUEST,
  HTTP_DATA_INVALID,
  HTTP_FORBIDDEN,
  HTTP_NOT_ALLOWED,
  HTTP_NOT_FOUND,
  HTTP_REQUEST_ENTITY_TOO_LARGE,
  HTTP_REQUEST_TIMEOUT,
  HTTP_SERVER_ERROR,
  HTTP_TOO_MANY_REQUESTS,
  HTTP_UNAUTHORIZED,
  HTTP_UNKNOW_STATUS
} from '@/constants'
import router from '@/router'
import { useAuthStore } from '@/stores/modules/auth'
import type { ResponseError } from '@/types'
const authStore = useAuthStore()
const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_API_PREFIX}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  (config) => {
    config.headers.apiToken = import.meta.env.VITE_API_TOKEN
    // @ts-ignore
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token')
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    localStorage.removeItem('toastNetwork')
    return response.data
  },
  (error: AxiosError) => {
    // network error
    const errorResponse = error.response
    const httpCode = errorResponse?.status
    const errorData = errorResponse?.data as ResponseError

    const errorCodesToRedirect = [
      HTTP_NOT_FOUND,
      HTTP_NOT_ALLOWED,
      HTTP_REQUEST_TIMEOUT,
      HTTP_REQUEST_ENTITY_TOO_LARGE,
      HTTP_UNKNOW_STATUS,
      HTTP_TOO_MANY_REQUESTS,
      HTTP_SERVER_ERROR,
      HTTP_FORBIDDEN
    ]

    if (typeof httpCode === 'number' && errorCodesToRedirect.includes(httpCode)) {
      return router.push({ name: 'page_error' })
    }

    switch (httpCode) {
      // validation
      case HTTP_DATA_INVALID:
        return Promise.reject(errorData.errors)

      // @TODO: pending waiting BE update format code
      case HTTP_UNAUTHORIZED:
        switch (errorData.code_error) {
          case CODE_UNAUTHENTICATED:
            authStore.logout().then(() => router.push({ name: 'login' }))
            break
        }

        return Promise.reject(errorData)

      case HTTP_BAD_REQUEST:
        switch (errorData.code_error) {
          case CODE_ACTION_CANNOT_DONE:
            return Promise.reject(errorData)
        }

        return Promise.reject(errorData)
      default:
        return
    }
  }
)

export default instance
