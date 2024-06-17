<template>
  <div class="w-full mb-6">
    <carousel-story :stories="data_story"></carousel-story>
  </div>
  <div class="w-full lg:flex block">
    <div class="w-full lg:flex-[4]">
      <h1 class="text-xl font-bold text-gray-800">{{ t('story.story_hot') }}</h1>
      <list-story :stories="data_story"></list-story>
    </div>
    <div class="w-full lg:flex-[2] ms-2">
      <h1 class="text-xl font-bold text-gray-800">{{ t('story.story_new') }}</h1>
      <story-list-vertical :stories="data_story"></story-list-vertical>
    </div>
  </div>
</template>
<script setup lang="ts">
import i18n from '@/i18n'
import data_story from '@/sample_data/list_story'
import { ToastType } from '@/types'
import { showToast } from '@/utils'

const { t } = i18n.global
const route = useRoute()
const router = useRouter()

onMounted(() => {
  handlePaymentNotify()
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
</script>
