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
      >
        + Add Book
      </el-button>
    </div>

    <div class="flex flex-col gap-5 overflow-x-auto">
      <BookInfoCard v-for="story in stories" :key="story.id" :story="story" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Story } from '@/api/modules/author/types'
import { useAuthorStore } from '@/stores/modules/author'

const authorStore = useAuthorStore()
const stories = reactive<Story[]>([])

onMounted(async () => {
  await getBook()
})

const getBook = async () => {
  if (!authorStore.getStories.length) await authorStore.fetchBookPosted()
  stories.push(...authorStore.getStories)
}
</script>

<style></style>
