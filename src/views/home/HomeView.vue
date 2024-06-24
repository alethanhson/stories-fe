<template>
  <div>
    <div class="w-full mb-6">
      <carousel-story :stories="data_story"></carousel-story>
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

      <el-select
        v-model="paramFilter.selectedGenre"
        @change="getFilterListStory"
        placeholder="Select genre"
        style="width: 240px"
      >
        <el-option label="genre 1" value="1" />
        <el-option label="genre 2" value="2" />
        <el-option label="genre 3" value="3" />
        <el-option label="genre 4" value="4" />
      </el-select>
    </div>

    <div v-if="filterResults.length > 0">
      <list-story :stories="filterResults"></list-story>
    </div>
    <div v-else>
      <p>{{ t('story.no_find') }}</p>
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

const { t } = i18n.global
const route = useRoute()
const router = useRouter()
onMounted(() => {
  handlePaymentNotify()
  getFilterListStory()
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
</script>
