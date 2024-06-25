<template>
  <div class="sm:grid sm:grid-cols-2">
    <div class="p-4 bg-white bg-opacity-45 rounded-lg shadow-lg me-2 hidden sm:block">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">{{ t('story.suggest') }}</h2>
      <p class="text-lg text-gray-800 mb-2 font-semibold">
        {{ stories[activeIndex].title }}
      </p>
      <span class="block text-xs text-blue-600 mb-2 truncate-multiline">{{
        stories[activeIndex].description
      }}</span>
    </div>
    <div class="block w-full">
      <el-carousel :interval="4000" type="card" height="200px" @change="handleCarouselChange">
        <el-carousel-item v-for="item in props.stories" :key="item.id">
          <div class="relative flex max-w-44 h-full justify-center rounded-lg">
            <img :src="item.cover_image" class="w-full h-full" alt="Book Cover" />
            <div
              class="absolute text-main-primary-25 bottom-0 text-center w-full bg-gray-700 bg-opacity-50 h-10 pb-11"
            >
              <p class="font-sm truncate">{{ item.title }}</p>
              <p class="text-xs truncate">{{ item.author.author_name }}</p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Book } from '@/types'
import i18n from '@/i18n'

const { t } = i18n.global
const activeIndex = ref<number>(0)

const props = defineProps({
  stories: {
    type: Array as PropType<Book[]>,
    default: () => []
  }
})
const handleCarouselChange = (index: number) => {
  activeIndex.value = index
}
</script>

<style scoped>
.el-carousel__container {
  display: flex;
}
.el-carousel__item:nth-child(2n) {
  background-color: transparent;
  display: flex;
  justify-content: center;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: transparent;
  display: flex;
  justify-content: center;
}
.truncate-multiline {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
</style>
