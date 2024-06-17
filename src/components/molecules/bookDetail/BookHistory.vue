<template>
  <div class="border p-2">
    <div class="border-b pb-2 flex justify-between">
      <p class="text-lg font-semibold text-main-primary-300">Reading history</p>
      <p class="text-lg font-semibold">See all</p>
    </div>

    <div class="[&>div:last-child]:border-0 [&>div:last-child]:-mb-2">
      <div v-for="book in books" :key="book.id" class="flex items-center py-2 gap-3 border-b">
        <div class="w-16 aspect-square overflow-hidden flex items-center">
          <img :src="book.cover_image" alt="" class="object-cover w-full h-full" />
        </div>

        <div class="flex-1">
          <router-link :to="{ name: 'detail_story', params: { id: book.id } }">
            <p class="font-semibold hover:underline hover:text-main-primary-200">{{ book.title }}</p>
          </router-link>
          <p class="text-[#ccc]">Continue reading chapter 123</p>
        </div>

        <div class="flex items-center gap-1">
          <BaseIcon name="eye" class="w-4 h-4 fill-white" />
          <span>123M</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BookHistory } from '@/api/modules/story/types'

defineProps({
  books: {
    type: Array as PropType<BookHistory[] | null>,
    default: () => {
      ;[]
    }
  }
})
</script>

<style></style>
