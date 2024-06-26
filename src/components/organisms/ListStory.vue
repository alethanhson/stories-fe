<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 mt-2">
    <div
      v-for="story in props.stories"
      :key="story.id"
      class="relative rounded-lg overflow-hidden h-[250px] w-full bg-blue-200"
    >
      <router-link :to="{ name: 'detail_story', params: { id: story.id } }">
        <img :src="story.cover_image" class="w-full h-full object-cover" alt="Book Cover" />
        <div
          class="absolute text-main-primary-25 bottom-0 text-center w-full bg-gray-700 bg-opacity-50 h-10 pb-11"
        >
          <p class="font-sm truncate px-3">{{ story.title }}</p>
          <p class="text-xs truncate px-3">{{ story.author.author_name }}</p>
        </div>

        <div
          class="absolute top-0 right-0 z-10 px-5 py-0.5 text-white font-semibold rounded-bl-xl"
          :class="serviceTag(story.package_type)"
        >
          {{ serviceName(story.package_type) }}
        </div>
      </router-link>
    </div>
  </div>
  <el-pagination
    :page-size="form.pageSize"
    layout="prev, pager, next"
    :total="form.total"
    v-model:current-page="form.currentPage"
  />
</template>

<script setup lang="ts">
import type { Book } from '@/types'

const props = defineProps({
  stories: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  total: {
    type: Number,
    default: 0
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  }
})

const form = computed(() => {
  return {
    currentPage: props.currentPage,
    pageSize: props.pageSize,
    total: props.total
  }
})
</script>

<style scope>
.el-pagination li {
  background: transparent !important;
}
.el-pagination button {
  background: transparent !important;
}
</style>