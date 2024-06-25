<template>
  <div class="w-full mb-6">
    <carousel-story v-if="hintList.length > 0" :stories="hintList"></carousel-story>
  </div>
  <div class="w-full xl:flex block">
    <div class="w-full lg:flex-[2]">
      <h1 class="text-xl font-bold text-gray-800">{{ t('story.story_hot') }}</h1>
      <list-story :stories="bookList"></list-story>
    </div>
    <div class="w-full lg:flex-1 ms-2">
      <h1 class="text-xl font-bold text-gray-800">{{ t('story.story_new') }}</h1>
      <story-list-vertical :stories="hintList"></story-list-vertical>
    </div>
  </div>
</template>
<script setup lang="ts">
import i18n from '@/i18n'
import { ToastType } from '@/types'
import { showToast } from '@/utils'
import { fetchBookListApi } from '@/api/modules/story'

const { t } = i18n.global
const route = useRoute()
const router = useRouter()
const bookList = reactive<any>([])
const hintList = reactive<any>([])

onMounted(() => {
  handlePaymentNotify()
  loadBook()
})

const handlePaymentNotify = () => {
  if (route.query.statusPayment == 'true') {
    router.replace({ query: {} })
    showToast(t('payment.payment_success'), ToastType.SUCCESS)
  } else if (route.query.statusPayment == 'false') {
    router.replace({ query: {} })
    showToast(route.query.message + '', ToastType.ERROR)
  }
}
const loadBook = async () => {
  try {
    const response: any = await fetchBookListApi()
    bookList.push(...response.data)
    hintList.push(...bookList.slice(0, 5))
  } catch (error) {
    console.log('error: ', error)
  }
}
</script>
