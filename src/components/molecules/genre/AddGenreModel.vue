<template>
  <div v-if="show" class="flex bg-[#1B1B1B] bg-opacity-60 fixed inset-0 z-10">
    <div
      class="modal w-full h-full md:w-[700px] md:h-[500px] bg-white md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 absolute rounded-lg flex"
    >
      <button @click="closeForm" class="hidden md:flex absolute right-2 top-2">✕</button>
      <div
        class="rounded-sm border border-stroke bg-white shadow-default dark:border-admin-stroke-dark dark:bg-admin-box-dark w-full"
      >
        <div class="border-b border-stroke py-4 px-4 dark:border-admin-stroke-dark">
          <h3 class="font-medium text-black dark:text-white">Add genre</h3>
        </div>
        <form @submit.prevent="handleAddGenre">
          <div class="p-4">
            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
              Name genre <span class="text-status-error">*</span>
            </label>
            <BaseInputField
              v-model="genre.genre_name"
              type="text"
              placeholder="Enter name genre"
              rules="required"
              fieldName="genre name"
              :error="errorMsg.genre_name"
            />
            <label class="my-3 block text-sm font-medium text-black dark:text-white">
              Upload cover image
            </label>
            <div class="relative">
              <label for="input-cover-img">
                <div
                  id="FileUpload"
                  class="relative mb-5.5 flex w-full h-[220px] cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5 items-center justify-center"
                >
                  <img
                    :src="URLImage"
                    :class="{ hidden: !URLImage }"
                    class="object-contain w-full h-full"
                    alt=""
                  />
                  <BaseInputField
                    id="input-cover-img"
                    @change="onFileChange"
                    fieldName="cover image"
                    type="file"
                    accept="image/*"
                    class="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  />
                  <div
                    v-if="!URLImage"
                    class="flex flex-col items-center justify-center space-y-3 text-gray-400"
                  >
                    <span
                      class="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-admin-stroke-dark dark:bg-admin-box-dark"
                    >
                      <BaseIcon name="arrowUpFromBracket" class="w-[16px] h-[16px] fill-gray-400" />
                    </span>
                    <p class="text-sm">Click to upload</p>
                  </div>
                </div>
              </label>
              <button
                v-if="URLImage"
                @click="onFileClose"
                class="absolute top-2 right-2 text-status-error"
              >
                ✕
              </button>
            </div>
            <BaseButton
              class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4"
              type="submit"
            >
              Save
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { genre, messageErrorGenre } from './genre.common'
import { addGenre } from '@/api/modules/genre'
import { ToastType } from '@/types'
import { clearObject, showToast } from '@/utils'
import i18n from '@/i18n'

const { t } = i18n.global
const props = defineProps(['show'])
const emit = defineEmits(['close-form', 'reload'])
const closeForm = () => {
  emit('close-form')
}
const reload = () => {
  emit('reload')
}

const errorMsg = messageErrorGenre
const { validate } = useForm()

const URLImage = ref('')
const onFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    URLImage.value = URL.createObjectURL(file)
    genre.cover_image = file
  }
}

const onFileClose = () => {
  URLImage.value = ''
}

watchEffect(() => {
  if (props.show) {
    genre.genre_name = ''
    URLImage.value = ''
  }
})

const handleAddGenre = async () => {
  const { valid } = await validate()
  if (!valid) {
    return false
  }

  try {
    clearObject(errorMsg)
    await addGenre(genre)
    closeForm()
    reload()
    showToast(t('genre.create_success'), ToastType.SUCCESS)
  } catch (error) {
    showToast(t('genre.create_fail'), ToastType.ERROR)
  }
}
</script>

<style scoped></style>
