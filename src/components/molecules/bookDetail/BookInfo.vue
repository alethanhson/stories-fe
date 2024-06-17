<template>
  <main class="flex gap-10 md:flex-row flex-col">
    <div class="flex-1 w-52 mx-auto">
      <img
        :src="book.cover_image"
        alt=""
        class="w-full"
      />
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
            <td>{{ book.status }}</td>
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
        <el-button type="primary">Follow</el-button>
        <p><span>{{ book.followers }}</span> Followers</p>
      </div>

      <div>
        <el-button type="primary" class="!bg-main-primary-200 hover:!bg-main-primary-400">
          Read Beginning
        </el-button>
        <el-button type="primary" class="!bg-main-primary-200 hover:!bg-main-primary-400">
          Read Latest
        </el-button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { BookDetail } from '@/api/modules/story/types'

defineProps({
  book: {
    type: Object as PropType<BookDetail>,
    default: () => {}
  }
})
</script>

<style></style>
