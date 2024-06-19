<template>
  <div class="mb-10">
    <p class="mt-3 text-2xl font-semibold uppercase text-main-primary-300">Chapter list</p>
    <hr class="border-main-primary-300" />

    <table class="w-full table-auto">
      <thead>
        <tr class="[&>th]:text-start [&>th]:p-1">
          <th>Chapter Number</th>
          <th>Updated</th>
        </tr>
      </thead>
      <tbody class="[&>tr>td]:p-1">
        <tr v-for="chapter in chapters" :key="chapter.id">
          <td class="cursor-pointer hover:text-main-primary-200">
            Chapter <span>{{ chapter.chapter_number }}</span>
          </td>
          <td>{{ formatDate(chapter.updated_at + '') }}</td>
        </tr>
      </tbody>
    </table>

    <p
      v-show="chapters.length < total_chapters"
      @click="$emit('moreChapter')"
      class="mt-3 text-center text-gray-400 hover:text-main-primary-400 cursor-pointer"
    >
      show more
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Chapter } from '@/api/modules/story/types'
import { formatDate } from '@/utils'

defineProps({
  chapters: {
    type: Array as PropType<Chapter[]>,
    default: () => []
  },
  total_chapters: {
    type: Number,
    default: 0
  }
})
</script>

<style></style>
