<template>
  <div v-if="bookDetail" class="w-full bg-black pt-10 text-white">
    <div class="flex gap-5 max-w-[1200px] mx-auto">
      <div class="flex-[2] flex-col px-5 md:max-[1200px]:px-28">
        <div class="[&>span]:hover:text-main-primary-200 [&>span]:cursor-pointer mb-2">
          <span>Home</span> / <span>Genre</span> /
          <span>{{ bookDetail?.title }}</span>
        </div>

        <div class="w-full text-center mb-4">
          <p class="text-2xl font-semibold uppercase">{{ bookDetail?.title }}</p>
          <span class="italic">[Updated at 9999/99/99]</span>
        </div>

        <BookInfo :book="bookDetail" />

        <SummaryStory :description="bookDetail.description" />

        <ChapterList :chapters="bookDetail.chapters" />
      </div>

      <div class="flex-1 max-[1200px]:hidden">
        <BookHistory :books="historyList" />

        <TopBookList />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchBookDetailApi, fetchReadingHistoryApi } from '@/api/modules/story'
import type { BookDetailResponse, BookDetail, BookHistoryResponse, BookHistory } from '@/api/modules/story/types'

const bookDetail = ref<BookDetail | null>(null)
const historyList = ref<BookHistory[] | null>(null)
const route = useRoute()

onMounted(async () => {
  getBookDetail()
  getReadingHistory()
})

const getBookDetail = async () => {
  try {
    const response: BookDetailResponse = await fetchBookDetailApi(Number(route.params.id))
    bookDetail.value = response.data
  } catch (error) {
    console.error('Failed to fetch book detail:', error)
  }
}
const getReadingHistory = async () => {
  try {
    const response: BookHistoryResponse = await fetchReadingHistoryApi()
    historyList.value = response.data
  } catch (error) {
    console.error('Failed to fetch book detail:', error)
  }
}
</script>

<style></style>
