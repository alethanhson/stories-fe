<template>
  <div>
    <div class="flex items-center gap-3 mb-8">
      <div class="w-6">
        <BaseIcon name="infoCircle" class="fill-main-primary-200" />
      </div>
      <strong class="text-2xl flex-1">My Books</strong>
      <el-button
        round
        class="!bg-main-primary-200 !text-white !border-main-primary-300 hover:!bg-main-primary-400 !px-10"
        @click="router.push({ name: 'author.book.create' })"
      >
        + Add Book
      </el-button>
    </div>

    <div class="flex flex-col gap-5 overflow-x-auto">
      <BookInfoCard v-for="story in stories" :key="story.id" :story="story" @delete="deleteStory" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { authors } from '@/api/modules/author'
import type { Story } from '@/api/modules/author/types'
import { useAuthorStore } from '@/stores/modules/author'

const authorStore = useAuthorStore()
const stories = reactive<Story[]>([])
const router = useRouter()

onMounted(async () => {
  await getBook()
})

const getBook = async () => {
  stories.splice(0, stories.length, ...(await authorStore.fetchBookPosted()))
}
const deleteStory = async (bookId: number) => {
  try {
    await authors.deleteBook(bookId)
    getBook()
  } catch (error) {
    console.log(error)
  }
}
</script>

<style></style>
