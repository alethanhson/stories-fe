<template>
  <el-card class="m-[20px]">
    <template #header>
      <div class="card-header text-main-color">
        <span>{{ title }}</span>
      </div>
    </template>
    <el-menu-item
      :index="indexPrefix + story.id"
      v-for="story in stories"
      :key="indexPrefix + story.id"
      :title="story.title"
      class="!px-0 md:!px-[20px]"
    >
      <div :class="['justify-between', 'w-full', 'flex', 'items-center']">
        <span class="overflow-hidden text-ellipsis">{{ story.title }}</span>
        <span v-if="story.views" class="text-gray-500">
          <el-icon><View /></el-icon> {{ story.views }}
        </span>
      </div>
    </el-menu-item>
  </el-card>
</template>

<script setup lang="ts">
import type { Story } from '@/types'
import { View } from '@element-plus/icons-vue'

defineProps<{
  title: string
  indexPrefix: string
  stories: Story[]
}>()
</script>
<style scoped></style>
