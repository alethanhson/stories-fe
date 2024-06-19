<template>
  <div class="border border-t-0 mt-10">
    <ul ref="topTitle" class="flex w-full text-center bg-[#2e2e2e] [&>li]:flex-1 [&>li]:p-2">
      <li
        v-for="(item, index) in tabs"
        :key="index"
        :class="{ 'border-t-2 border-main-primary-400 bg-black': selectedTab === index }"
        @click="setTopBookList(index)"
        class="top-title cursor-pointer"
      >
        {{ 'Top ' + item }}
      </li>
    </ul>

    <div
      class="px-2 [&>div:first-child>span]:text-pink-400 [&>div:nth-child(2)>span]:text-blue-400 [&>div:nth-child(3)>span]:text-green-400"
    >
      <div
        v-for="(book, index) in TopBookList"
        :key="book.id"
        class="flex items-center py-2 gap-3 border-b"
      >
        <span class="flex items-center gap-1 text-lg font-semibold"> 0{{ index + 1 }} </span>
        <div class="w-14 aspect-square overflow-hidden flex items-center">
          <img :src="book.cover_image" alt="" class="object-cover w-full h-full" />
        </div>

        <div class="flex-1">
          <router-link :to="{ name: 'detail_story', params: { id: book.id } }">
            <p class="truncate-multiline font-semibold hover:underline hover:text-main-primary-200">
              {{ book.title }}
            </p>
          </router-link>
          <p
            v-if="book.chapters.length > 0"
            class="text-[#ccc] text-sm hover:underline cursor-pointer"
          >
            Chapter {{ book.chapters[0].chapter_number }}
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
import { fetchTopBookApi } from '@/api/modules/story'
import { TOP_TYPE } from '@/constants'
import type { TopBook, TopBookResponse } from '@/api/modules/story/types'

const topTitle = ref<HTMLElement | null>(null)
const selectedTab = ref(0)
const TopBookList = ref<TopBook[] | null>(null)
const tabs = ['Month', 'Week', 'Day']

onMounted(() => {
  getTopBook(TOP_TYPE.MONTH)
})

const getTopBook = async (days: number) => {
  try {
    const response: TopBookResponse = await fetchTopBookApi(days)
    TopBookList.value = response.data
  } catch (error) {
    console.log('error: ', error)
  }
}

const setTopBookList = (index: number) => {
  selectedTab.value = index
  getTopBook(TOP_TYPE[tabs[index].toUpperCase()])
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
