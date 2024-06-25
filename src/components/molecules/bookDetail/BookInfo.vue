<template>
  <main class="flex gap-10 md:flex-row flex-col">
    <div class="flex-1 w-52 mx-auto relative">
      <img :src="book.cover_image" alt="" class="w-full" />

      <div
        class="absolute top-0 right-0 z-10 px-5 py-0.5 text-white font-semibold rounded-bl-xl"
        :class="serviceTag(book.package_type)"
      >
        {{ serviceName(book.package_type) }}
      </div>
    </div>

    <div class="flex-[3] gap-4 flex flex-col">
      <table class="w-full [&>tbody>tr>td]:p-2 [&>tbody>tr>td:first-child]:w-1/4">
        <tbody>
          <tr>
            <td>Author</td>
            <td>{{ book.author.author_name }}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>
              {{ getStatusText(book.status) }}
            </td>
          </tr>
          <tr>
            <td>Genre</td>
            <td>{{ book.genre.genre_name }}</td>
          </tr>
          <tr>
            <td>Likes</td>
            <td>{{ book.likes }}</td>
          </tr>
        </tbody>
      </table>

      <div class="flex gap-5 items-center">
        <el-button
          @click="followBook"
          :disabled="loadBtnFollow"
          class="min-w-24"
          :type="book.is_follow ? 'danger' : 'primary'"
          >{{ book.is_follow ? 'Unfollow' : 'Follow' }}</el-button
        >
        <p>
          <span>{{ book.followers }}</span> Followers
        </p>
      </div>

      <div>
        <el-button
          @click="readingStory(book.first_chapter_id)"
          type="primary"
          class="!bg-main-primary-200 hover:!bg-main-primary-400"
        >
          Read Beginning
        </el-button>
        <el-button
          @click="readingStory(chapters[0].id)"
          type="primary"
          class="!bg-main-primary-200 hover:!bg-main-primary-400"
        >
          Read Latest
        </el-button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { BookDetail, Chapter } from '@/api/modules/story/types'
import { BOOK_STATUS, SERVICE_PACKAGE } from '@/constants'
import { followBookApi } from '@/api/modules/story'

const router = useRouter()
const loadBtnFollow = ref(false)
const emit = defineEmits(['update:book'])
const props = defineProps({
  book: {
    type: Object as PropType<BookDetail>,
    default: () => {}
  },
  chapters: {
    type: Array as PropType<Chapter[]>,
    default: () => []
  }
})

const getStatusText = (status) => {
  switch (Number(status)) {
    case BOOK_STATUS.PENDING:
      return 'Pending'
    case BOOK_STATUS.ACTIVE:
      return 'Active'
    case BOOK_STATUS.BAN:
      return 'Ban'
    default:
      return 'Unknown'
  }
}
const serviceTag = (type) => {
  if (type == SERVICE_PACKAGE.PRO) {
    return 'bg-gradient-to-r-custom'
  } else if (type == SERVICE_PACKAGE.BASE) {
    return 'bg-green-400'
  }
  return 'bg-main-primary-500'
}
const serviceName = (type) => {
  if (type == SERVICE_PACKAGE.PRO) {
    return 'Pro'
  } else if (type == SERVICE_PACKAGE.BASE) {
    return 'Base'
  }
  return 'Free'
}
const readingStory = (id) => {
  router.push({ name: 'reading-story', params: { id_chapter: id } })
}
const followBook = async () => {
  loadBtnFollow.value = true
  try {
    const response = await followBookApi({
      book_id: props.book.id
    })
    emit('update:book', {
      ...props.book,
      is_follow: !props.book.is_follow,
      followers: response.follows
    })
  } catch (error) {
    console.log('error: ', error)
  } finally {
    loadBtnFollow.value = false
  }
}
</script>

<style></style>
