<template>
  <div
    class="min-h-[896px] bg-dark-0 text-white flex md:flex-row flex-col 2xl:px-40 lg:px-20 px-5 pt-20 gap-16"
  >
    <div class="flex-1 bg-dark-50 px-10 py-5 h-fit">
      <div class="flex items-center flex-col">
        <div class="w-36 overflow-hidden bg-blue-300 rounded-full">
          <img :src="defaultAvatar" alt="" />
        </div>
        <span class="font-bold text-2xl mt-2 mb-3">Lê Công Anh</span>
      </div>

      <div class="flex flex-col gap-4">
        <router-link :to="{ name: 'author.profile' }">
          <MenuAuthorItem :isActive="true" icon-left="userCircle" icon-right="arrowRight">
            Author Profile
          </MenuAuthorItem>
        </router-link>
        <router-link :to="{ name: 'author.book' }">
          <MenuAuthorItem icon-left="userCircle" icon-right="arrowRight"> My Books </MenuAuthorItem>
        </router-link>
        <MenuAuthorItem icon-left="userCircle" icon-right="arrowRight"> Logout </MenuAuthorItem>
      </div>
    </div>
    <div class="flex-[3]">
      <router-view v-slot="{ Component }" :stories="stories" :chapters="chapters">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import defaultAvatar from '@/assets/images/default_avatar.png'
import { useAuthorStore } from '@/stores/modules/author'
import type { Story, Chapter } from '@/api/modules/author/types'

const authorStore = useAuthorStore()
const stories = ref<Story[]>([])
const chapters = ref<Chapter[]>([])

onMounted(async () => {
  getBook()
  getChapter()
})

const getBook = async () => {
  await authorStore.fetchBookPosted()
  stories.value = authorStore.stories
}
const getChapter = async () => {
  await authorStore.fetChapterPosted()
  chapters.value = authorStore.chapters
}
</script>

<style scoped></style>
