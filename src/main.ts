import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import type { PluginOptions } from 'vue-toastification'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import VueI18n from './i18n'
import router from './router'
import setupVeeValidateI18n from '@/utils/vee-validate-rules'
const options: PluginOptions = {}
const app = createApp(App)

app.use(Toast, options)
app.use(VueI18n)
const { t } = VueI18n.global
app.config.globalProperties.$t = t
app.use(createPinia())
app.use(router)
setupVeeValidateI18n()

app.mount('#app')
