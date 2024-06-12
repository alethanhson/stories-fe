<template>
  <div class="p-5 bg-dark-50 flex gap-5 overflow-x-auto">
    <div class="aspect-square w-28 min-w-10 rounded-md overflow-hidden flex items-center">
      <img :src="story.cover_image" alt="" class="w-full object-cover" />
    </div>

    <div class="flex-1 flex flex-col gap-2">
      <p>
        {{ story.title }}
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
            <th>Reads</th>
            <th>Followers</th>
          </tr>
        </thead>
        <tbody>
          <tr class="[&>td]:px-3 [&>*:nth-child(2)]:border-x [&>td]:border-gray-700">
            <td>5</td>
            <td>5</td>
            <td>5</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="min-[1200px]:flex flex-col gap-3 hidden">
      <button
        class="text-main-primary-200 w-full border border-main-primary-200 px-3 py-1 cursor-pointer rounded-2xl hover:bg-main-primary-200 hover:text-white"
      >
        Comment List
      </button>
      <button
        class="text-main-primary-200 w-full border border-main-primary-200 px-3 py-1 cursor-pointer rounded-2xl hover:bg-main-primary-200 hover:text-white"
      >
        Update
      </button>
      <div class="flex gap-3">
        <button
          class="w-full px-10 py-1 cursor-pointer rounded-2xl bg-main-primary-200 text-white text-nowrap hover:bg-main-primary-400"
        >
          + add chapter
        </button>
        <button
          class="text-main-primary-200 w-full border text-nowrap border-main-primary-200 px-10 py-1 cursor-pointer rounded-2xl hover:bg-main-primary-200 hover:text-white"
        >
          Chapter List
        </button>
      </div>
    </div>
    <div class="min-[1200px]:hidden flex-col gap-3 flex">
      <div style="margin: 15px"></div>
      <el-dropdown ref="dropdown1" trigger="contextmenu" style="margin-right: 30px">
        <el-button class="el-dropdown-link" @click="showClick">Event</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Update</el-dropdown-item>
            <el-dropdown-item>Add chapter</el-dropdown-item>
            <el-dropdown-item>Comment list</el-dropdown-item>
            <el-dropdown-item>Chapter List</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Story } from '@/api/modules/author/types'
import { BOOK_STATUS } from '@/constants'
import type { DropdownInstance } from 'element-plus'

const dropdown1 = ref<DropdownInstance>()

function showClick() {
  if (!dropdown1.value) return
  dropdown1.value.handleOpen()
}

defineProps({
  story: {
    type: Object as PropType<Story>,
    default: () => {}
  }
})
</script>

<style></style>
