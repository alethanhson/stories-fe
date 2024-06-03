import en from '@/locales/en'
import ja from '@/locales/ja'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: ['ja', 'en'],
  legacy: false,
  messages: {
    en,
    ja
  }
})

export default i18n
