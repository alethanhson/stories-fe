<template>
  <div class="flex flex-col mb-6">
    <div
      v-for="story in props.stories"
      :key="story.id"
      class="flex justify-between overflow-hidden mt-2 bg-gray-700 bg-opacity-50 rounded-full"
    >
      <div class="w-12 h-12 overflow-hidden rounded-full">
        <img :src="story.cover_image" class="w-full h-full object-cover" alt="Book Cover" />
      </div>
      <div class="text-main-primary-25 flex-1 text-start ps-3">
        <router-link :to="{ name: 'detail_story', params: { id: story.id } }">
          <p class="font-sm font-semibold w-[90%] truncate hover:underline">{{ story.title }}</p>
        </router-link>
        <p class="text-xs truncate">{{ story.author.author_name }}</p>
      </div>
    </div>
  </div>
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
</script>

<style scope>
.el-pagination li {
  background: transparent !important;
}
.el-pagination button {
  background: transparent !important;
}
</style>
