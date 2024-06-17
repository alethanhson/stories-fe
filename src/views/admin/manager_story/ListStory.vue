<template>
  <div class="w-full">
    <div
      v-for="story in stories"
      :key="story.id"
      class="w-full flex justify-between mt-3 shadow-sm p-2"
      name="row"
    >
      <div class="flex gap-2">
        <img :src="story.cover_image" alt="" class="w-12 h-12 rounded-full" />
        <p>{{ story.title }}</p>
      </div>
      <div class="flex gap-3 items-center me-8">
        <base-icon @click="showDeleteDialog(story.id)" name="del" class="w-8 h-8"></base-icon>
        <router-link :to="{ name: 'admin_edit_story', params: { id: story.id } }">
          <base-icon name="edit" class="w-8 h-8"></base-icon>
        </router-link>
      </div>
    </div>
    <el-pagination
      :page-size="formGetStory.page_size"
      layout="prev, pager, next"
      :total="total"
      v-model:current-page="formGetStory.page"
      @click="getStories"
    />
    <el-dialog v-model="centerDialogVisible" width="500" center>
      <div class="w-full flex justify-center">
        <span> {{ t('story.deletion_warning') }} </span>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false"> {{ t('story.cancel') }} </el-button>
          <el-button type="primary" @click="confirmDelete"> {{ t('story.delete') }} </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import i18n from '@/i18n'
import { admin } from '@/api/modules/admin'
import { formGetStory } from './manager_story.common'
import type { Story } from '@/api/modules/admin/types'

const { t } = i18n.global
const centerDialogVisible = ref(false)
const stories = ref<Story[]>([])
const total = ref<number>(0)
const currentDeletingStoryId = ref<number>()
const getStories = async () => {
  try {
    const response = await admin.listMyStory(formGetStory)
    stories.value = response.data
    total.value = response.meta.total
  } catch (error) {
    console.log(error)
  }
}
const showDeleteDialog = (id: number) => {
  centerDialogVisible.value = true
  currentDeletingStoryId.value = id
}
const confirmDelete = async () => {
  try {
    centerDialogVisible.value = false
    await admin.deleteStorry(currentDeletingStoryId.value as number)
    getStories()
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getStories()
})
</script>
<style scope>
.el-pagination li {
  background: transparent !important;
}
.el-pagination button {
  background: transparent !important;
}
</style>
