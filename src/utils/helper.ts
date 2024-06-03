import router from '@/router'
import dayjs from 'dayjs'

export const clearObject = (obj) => {
  Object.keys(obj).forEach((key) => {
    obj[key] = ''
  })
}

export const isObjectEmpty = (data: Record<string, string>): boolean => {
  return !Object.values(data).some((value) => value.trim() !== '')
}

export const openNewTab = async (routerPush) => {
  const url = router.resolve(routerPush).href

  const newTab = window.open(url, '_blank')
  if (newTab) {
    newTab.focus()
  }
}

export const getFirstDayOfMonth = () => {
  return dayjs().startOf('month').format('YYYY/MM/DD')
}

export const getLastDayOfMonth = () => {
  return dayjs().endOf('month').format('YYYY/MM/DD')
}
