<template>
  <div class="block min-[1200px]:flex bg-dark-50 justify-center items-center">
    <div class="flex p-5 gap-5 overflow-x-auto">
      <div class="aspect-square w-28 min-w-10 rounded-md overflow-hidden flex items-center">
        <img :src="story.cover_image" alt="" class="w-full object-cover" />
      </div>
      <div class="flex-1 flex flex-col gap-2">
        <p>
          <span class="font-bold">{{ story.title }}</span>
          <span
            v-if="story.status == BOOK_STATUS.ACTIVE"
            class="border border-main-primary-200 rounded-xl text-main-primary-200 px-2 pb-[2px] ms-3 text-[0.75rem]"
          >
            published
          </span>
          <span
            v-if="story.status == BOOK_STATUS.PENDING"
            class="border border-status-warning rounded-xl text-status-warning px-2 pb-[2px] ms-3 text-[0.75rem]"
          >
            pending
          </span>
          <span
            v-if="story.status == BOOK_STATUS.BAN"
            class="border border-red-600 rounded-xl text-red-600 px-2 pb-[2px] ms-3 text-[0.75rem]"
          >
            ban
          </span>
        </p>

        <p>Updated 14:31 June 12, 2024</p>

        <table class="w-fit [&>]">
          <thead>
            <tr class="[&>th]:px-3 [&>*:nth-child(2)]:border-x [&>th]:border-gray-700">
              <th>Chaper</th>
              <th>Likes</th>
              <th>Followers</th>
            </tr>
          </thead>
          <tbody>
            <tr class="[&>td]:px-3 [&>*:nth-child(2)]:border-x [&>td]:border-gray-700">
              <td>{{ story.chapters.length }}</td>
              <td>{{ story.book_likes }}</td>
              <td>{{ story.followers }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex flex-col gap-3 max-w-[360px] p-4">
      <button
        class="text-main-primary-200 w-full border border-main-primary-200 px-3 py-1 cursor-pointer rounded-2xl hover:bg-main-primary-200 hover:text-white"
      >
        Update
      </button>
      <div class="flex gap-3">
        <button
          class="w-full px-10 py-1 cursor-pointer rounded-2xl bg-main-primary-200 text-white text-nowrap hover:bg-main-primary-400"
          @click="
            router.push({
              name: 'author.chapter.create',
              query: {
                bookId: story.id,
                bookName: story.title
              }
            })
          "
        >
          + add chapter
        </button>
        <button
          class="text-red-500 w-full border text-nowrap border-red-500 px-10 py-1 cursor-pointer rounded-2xl hover:bg-red-500 hover:text-white"
          @click="emit('delete', story.id)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Story } from '@/api/modules/author/types'
import { BOOK_STATUS } from '@/constants'

const router = useRouter()

defineProps({
  story: {
    type: Object as PropType<Story>,
    default: () => {}
  }
})
const emit = defineEmits(['delete'])
</script>

<style></style>
