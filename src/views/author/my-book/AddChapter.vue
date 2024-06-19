<template>
  <div class="w-full">
    <h1>{{ t('story.chapter.createChap') }}</h1>
    <div class="w-full flex justify-center mt-4">
      <el-upload
        action="#"
        list-type="picture-card"
        :auto-upload="false"
        :on-change="handleChange"
        v-model:file-list="uploadedFiles"
      >
        <el-icon><Plus /></el-icon>
        <template #file="{ file }">
          <div>
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <el-icon><zoom-in /></el-icon>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <el-icon><Delete /></el-icon>
              </span>
            </span>
          </div>
        </template>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </div>
    <div class="flex justify-center">
      <p v-show="errorMessage" class="text-status-error text-body-xs">
        {{ errorMessage }}
      </p>
    </div>
    <div class="flex justify-center mt-10">
      <input
        type="text"
        :placeholder="t('story.chapter.title')"
        class="p-2 rounded-lg text-slate-800"
        v-model="FormCreateChap.chapter_title"
      />
    </div>
    <div class="flex justify-end gap-4 me-20 mt-10">
      <button class="bg-main-primary-700 p-2 rounded-sm" @click="createChapter">
        {{ t('story.chapter.create') }}
      </button>
      <button class="bg-red-600 p-2 rounded-sm">{{ t('story.chapter.cancel') }}</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile, UploadUserFile } from 'element-plus'
import { FormCreateChap } from './my_book.common'
import { authors } from '@/api/modules/author'
import i18n from '@/i18n'
import { useField } from 'vee-validate'
import { showToast } from '@/utils'
import { ToastType } from '@/types'

const { t } = i18n.global
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const uploadedFiles = ref<UploadUserFile[]>([])
const { value: image, errorMessage, validate } = useField('image', 'required')
const showValidate = ref<boolean>(false)

const handleRemove = (file: UploadFile) => {
  uploadedFiles.value = uploadedFiles.value.filter((f) => f.uid !== file.uid)
}
const handleChange = (file: UploadFile, fileList: UploadUserFile[]) => {
  uploadedFiles.value = fileList
}
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}
const createChapter = async () => {
  try {
    if (!(await validate())) return
    showValidate.value = true
    await authors.createChapter(FormCreateChap)
    showToast(t('story.chapter.success'), ToastType.SUCCESS)
  } catch (error) {
    console.error(error)
    showToast(t('story.chapter.failed'), ToastType.ERROR)
  }
}

onMounted(async () => {
  FormCreateChap.book_id = useRoute().query.bookId as unknown as number
  FormCreateChap.chapter_number = await authors.getNumberChapter(
    useRoute().query.bookId as unknown as number
  )
})
watch(uploadedFiles, async (newValue) => {
  try {
    const files = newValue.map((file) => new File([file.raw] as BlobPart[], file.name))
    image.value = files
    FormCreateChap.image = files
  } catch (error) {
    console.error('Error converting UploadUserFile to File:', error)
  }
})
</script>
