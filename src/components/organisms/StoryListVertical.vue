<template>
  <div class="flex flex-col mb-6">
    <div
      v-for="story in props.stories"
      :key="story.id"
      class="flex justify-between overflow-hidden mt-2 bg-gray-700 bg-opacity-50 rounded-full"
    >
      <img :src="story.cover_image" class="w-12 h-12 rounded-full ms-2" alt="Book Cover" />
      <div class="text-main-primary-25 flex-1 text-start ps-3">
        <p class="font-sm lg:max-w-24 max-w-56 truncate">{{ story.title }}</p>
        <p class="text-xs lg:max-w-24 max-w-56 truncate">{{ story.author }}</p>
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
