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

  <div class="w-1/2 flex justify-between">
    <el-select
      v-model="paramFilter.selectedPackage"
      @change="getFilterListStory"
      placeholder="Select Package"
      style="width: 240px"
    >
      <el-option
        v-for="servicePackage in servicePackages"
        :key="servicePackage.value"
        :label="servicePackage.label"
        :value="servicePackage.value"
      />
    </el-select>

    <el-select
      v-model="paramFilter.selectedStoryType"
      @change="getFilterListStory"
      placeholder="Select type"
      style="width: 240px"
    >
      <el-option
        v-for="storyType in storyTypes"
        :key="storyType.value"
        :label="storyType.label"
        :value="storyType.value"
      />
    </el-select>
  </div>

  <div v-if="filterResults.length > 0">
    <list-story :stories="filterResults"></list-story>
  </div>
  <div v-else>
    <p>{{ t('story.no_find') }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import i18n from '@/i18n'
import data_story from '@/sample_data/list_story'
import { useStoriesStore } from '@/stores/modules/story'
import { ToastType } from '@/types'
import { showToast } from '@/utils'
import { SERVICE_PACKAGE, STORY_TYPE } from '@/constants'
import { fetchBookListApi } from '@/api/modules/story'

const { t } = i18n.global
const route = useRoute()
const router = useRouter()
const bookList = reactive<any>([])
const hintList = reactive<any>([])

onMounted(() => {
  handlePaymentNotify()
  getFilterListStory()
  loadBook()
})

const bookList = reactive<any>([])

const handlePaymentNotify = () => {
  if (route.query.statusPayment == 'true') {
    router.replace({ query: {} })
    showToast(t('payment.payment_success'), ToastType.SUCCESS)
  } else if (route.query.statusPayment == 'false') {
    router.replace({ query: {} })
    showToast(route.query.message + '', ToastType.ERROR)
  }
}

const store = useStoriesStore()
const paramFilter = reactive({
  selectedPackage: null,
  selectedStoryType: null,
  selectedGenre: null
})

const filterResults = computed(() => store.filterResults)

const getFilterListStory = async () => {
  await store.fetchGetFilterListStory(paramFilter)
}

const servicePackages = ref([
  { label: t('story.story_reader.all'), value: '' },
  { label: t('story.story_reader.free'), value: SERVICE_PACKAGE.FREE },
  { label: t('story.story_reader.base'), value: SERVICE_PACKAGE.BASE },
  { label: t('story.story_reader.premium'), value: SERVICE_PACKAGE.PRO }
])

const storyTypes = ref([
  { label: t('story.story_type.all'), value: '' },
  { label: t('story.story_type.comic'), value: STORY_TYPE.COMIC },
  { label: t('story.story_type.novel'), value: STORY_TYPE.NOVEL }
])
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
