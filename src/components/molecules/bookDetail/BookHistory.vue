<template>
  <div v-if="historyList && historyList.length > 0" class="border p-2">
    <div class="border-b pb-2 flex justify-between">
      <p class="text-lg font-semibold text-main-primary-300">Reading history</p>
      <p class="text-lg font-semibold">See all</p>
    </div>

    <div class="[&>div:last-child]:border-0 [&>div:last-child]:-mb-2">
      <div v-for="book in historyList" :key="book.id" class="flex items-center py-2 gap-3 border-b">
        <div class="w-16 aspect-square overflow-hidden flex items-center">
          <img :src="book.cover_image" alt="" class="object-cover w-full h-full" />
        </div>

        <div class="flex-1">
          <router-link :to="{ name: 'detail_story', params: { id: book.id } }">
            <p class="truncate-multiline font-semibold hover:underline hover:text-main-primary-200">
              {{ book.title }}
            </p>
          </router-link>
          <p class="text-[#ccc] cursor-pointer hover:underline">
            Continue reading chapter {{ book.user_chapters.chapter.chapter_number }}
          </p>
        </div>

        <div class="flex items-center gap-1">
          <BaseIcon name="heart" class="w-4 h-4 fill-white" />
          <span>{{ book.likes }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BookHistoryResponse, BookHistory } from '@/api/modules/story/types'
import { fetchReadingHistoryApi } from '@/api/modules/story'

const historyList = ref<BookHistory[] | null>(null)

onMounted(async () => {
  getReadingHistory()
})

const getReadingHistory = async () => {
  try {
    const response: BookHistoryResponse = await fetchReadingHistoryApi()
    historyList.value = response.data
  } catch (error) {
    console.error('Failed to fetch book detail:', error)
  }
}
</script>

<style scoped>
.truncate-multiline {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
</style>
