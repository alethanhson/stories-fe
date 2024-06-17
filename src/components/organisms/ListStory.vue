<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-4 mt-2">
    <div
      v-for="story in props.stories"
      :key="story.id"
      class="relative flex justify-center rounded-lg overflow-hidden"
    >
      <img :src="story.cover_image" class="w-full h-full" alt="Book Cover" />
      <div
        class="absolute text-main-primary-25 bottom-0 text-center w-full bg-gray-700 bg-opacity-50 h-10 pb-11"
      >
        <p class="font-sm truncate">{{ story.title }}</p>
        <p class="text-xs truncate">{{ story.author }}</p>
      </div>
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
    type: Array as PropType<Book[]>,
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
