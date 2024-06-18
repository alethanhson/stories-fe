<template>
  <div v-if="bookDetail" class="w-full bg-black pt-10 text-white">
    <div class="flex gap-5 max-w-[1200px] mx-auto">
      <div class="flex-[2] flex-col px-5 md:max-[1200px]:px-28">
        <div class="[&>span]:cursor-pointer mb-2 text-main-primary-300">
          <router-link :to="{ name: 'home' }"> Home </router-link>
          /
          <router-link :to="{ name: 'detail_story', params: { id: bookDetail.id } }">
            {{ bookDetail?.title }}
          </router-link>
        </div>

        <div class="w-full text-center mb-4">
          <p class="text-2xl font-semibold uppercase">{{ bookDetail?.title }}</p>
          <span class="italic">[Updated at {{ formatDate(bookDetail?.updated_at + '') }} ]</span>
        </div>

        <BookInfo :book="bookDetail" />

        <SummaryStory :description="bookDetail.description" />

        <ChapterList :chapters="bookDetail.chapters" />
      </div>

      <div class="flex-1 max-[1200px]:hidden">
        <BookHistory v-if="user" />

        <TopBookList />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchBookDetailApi } from '@/api/modules/story'
import type { BookDetailResponse, BookDetail } from '@/api/modules/story/types'
import { useAuthStore } from '@/stores/modules/auth'
import { formatDate } from '@/utils'

const bookDetail = ref<BookDetail | null>(null)

const route = useRoute()
const authStore = useAuthStore()
const user = computed(() => authStore.currentUser)

onMounted(async () => {
  getBookDetail()
})

const getBookDetail = async () => {
  try {
    const response: BookDetailResponse = await fetchBookDetailApi(Number(route.params.id))
    bookDetail.value = response.data
  } catch (error) {
    console.error('Failed to fetch book detail:', error)
  }
}
</script>

<style></style>
