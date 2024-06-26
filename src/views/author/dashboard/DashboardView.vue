<template>
  <div
    class="min-h-[896px] bg-dark-0 text-white flex md:flex-row flex-col 2xl:px-40 lg:px-20 px-5 pt-20 gap-16"
  >
    <div class="flex-1 bg-dark-50 px-10 py-5 h-fit">
      <div class="flex items-center flex-col">
        <div class="w-36 aspect-square overflow-hidden bg-blue-300 rounded-full flex items-center">
          <img
            :src="infoAuthor.avatar ? infoAuthor.avatar + '' : defaultAvatar"
            alt="Author Avatar"
          />
        </div>
        <span class="font-bold text-2xl mt-2 mb-3">{{ infoAuthor.author_name }}</span>
      </div>

      <div class="flex flex-col gap-4">
        <router-link :to="{ name: 'author.profile' }">
          <MenuAuthorItem icon-left="userCircle" icon-right="arrowRight">
            Author Profile
          </MenuAuthorItem>
        </router-link>
        <router-link :to="{ name: 'author.book' }">
          <MenuAuthorItem icon-left="userCircle" icon-right="arrowRight"> My Books </MenuAuthorItem>
        </router-link>
      </div>
    </div>
    <div class="flex-[3]">
      <router-view v-slot="{ Component }">
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

const authorStore = useAuthorStore()
const infoAuthor = computed(() => authorStore.getInfoAuthor)

onMounted(async () => {
  if (!authorStore.getInfoAuthor.id) await authorStore.getData()
})
</script>

<style scoped></style>
