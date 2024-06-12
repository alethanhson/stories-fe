<template>
  <div class="bg-dark-50 p-5 h-fit mb-20">
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-3">
        <div class="w-6">
          <BaseIcon name="infoCircle" class="fill-main-primary-200" />
        </div>
        <strong class="text-2xl">Achievements</strong>
      </div>

      <div class="w-full grid 2xl:grid-cols-3 lg:grid-cols-2 gap-5">
        <AuthorInfoCard icon="search" :value="stories.length">Story posted</AuthorInfoCard>
        <AuthorInfoCard icon="bars" :value="chapters.length">Chaper posted</AuthorInfoCard>
        <AuthorInfoCard icon="person" :value="followers">Followers</AuthorInfoCard>
      </div>

      <div class="flex items-center gap-3">
        <div class="w-6">
          <BaseIcon name="infoCircle" class="fill-main-primary-200" />
        </div>
        <strong class="text-2xl flex-1">Information</strong>
        <el-button
          round
          class="!bg-main-primary-200 !text-white !border-main-primary-300 hover:!bg-main-primary-400 !px-10"
        >
          Update
        </el-button>
      </div>

      <div class="w-full flex flex-col gap-5 text-[#e3e3e3]">
        <p>Fullname:<span class="ms-10">Lê Công Anh</span></p>
        <p>introduce:<span class="ms-10">...</span></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Story, Chapter } from '@/api/modules/author/types'
import { authors } from '@/api/modules/author'

defineProps({
  stories: {
    type: Array as PropType<Story[]>,
    default: () => []
  },
  chapters: {
    type: Array as PropType<Chapter[]>,
    default: () => []
  }
})

const followers = ref(0)

onMounted(async () => {
  getFollower()
})

const getFollower = async () => {
  const res: any = await authors.fetchFollowerApi()
  followers.value = res.data
}
</script>

<style></style>
