<template>
  <div class="block">
    <div class="">
      <el-form :model="values" label-width="auto" style="max-width: 600px">
        <div class="flex justify-center">
          <label htmlFor="fileUpload" class="flex justify-center relative mb-6">
            <img
              v-if="imagePreview"
              :src="imagePreview"
              alt="Image Preview"
              class="w-36 h-36 mt-4 object-cover rounded-full"
            />
            <img
              v-else
              :src="cover_image as unknown as string"
              alt="Image Preview"
              class="w-36 h-36 mt-4 object-cover rounded-full"
            />
            <base-icon name="uploadImage" class="self-end absolute"></base-icon>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              id="fileUpload"
              hidden
              @change="onFileChange"
            />
          </label>
        </div>
        <el-form-item :label="t('story.update.title')">
          <el-input v-model="title" />
          <p v-show="submitClicked && errors.title" class="text-status-error text-body-xs">
            {{ errors.title }}
          </p>
        </el-form-item>
        <el-form-item :label="t('story.update.choose_genre')">
          <el-select v-model="genre_id">
            <el-option
              v-for="(genre, index) in genres"
              :key="index"
              :label="genre.genre_name"
              :value="genre.id"
            />
          </el-select>
          <p v-show="submitClicked && errors.genre_id" class="text-status-error text-body-xs">
            {{ errors.genre_id }}
          </p>
        </el-form-item>
        <el-form-item :label="t('story.update.story_reader')">
          <el-radio-group v-model="package_type">
            <el-radio :label="t('story.story_reader.free')" :value="PackageType.FREE" />
            <el-radio :label="t('story.story_reader.base')" :value="PackageType.BASE" />
            <el-radio :label="t('story.story_reader.premium')" :value="PackageType.PREMIUM" />
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="t('story.desc')">
          <el-input v-model="description" type="textarea" />
          <p v-show="submitClicked && errors.description" class="text-status-error text-body-xs">
            {{ errors.description }}
          </p>
        </el-form-item>
        <el-form-item>
          <el-button>
            <router-link :to="{ name: 'admin_list_story' }">{{
              t('story.cancel')
            }}</router-link></el-button
          >
          <el-button type="primary" @click="updateStory">{{ t('story.update.update') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import i18n from '@/i18n'
import { MAX_TEXT_INPUT, PackageType } from '@/constants'
import type { FormUpdateBook } from '@/api/modules/author/types'
import { useField, useForm } from 'vee-validate'
import { showToast } from '@/utils'
import { ToastType } from '@/types'
import type { Genre } from '@/api/modules/admin/types'
import { authors } from '@/api/modules/author'
import { getGenre } from '@/api/modules/genre'
import { fetchBookDetailApi } from '@/api/modules/story'

const { t } = i18n.global
const router = useRouter()
const submitClicked = ref(false)
const genres = reactive<Genre[]>([])
const imagePreview = ref<string | null>(null)
const { values, errors, validate, setValues } = useForm<FormUpdateBook>()
const book_id = useRoute().params.id as unknown as number
const { value: title } = useField('title', `required|max:${MAX_TEXT_INPUT}`)
const { value: genre_id } = useField('genre_id', 'required')
const { value: package_type } = useField('package_type', 'required')
const { value: description } = useField('description', 'required')
const { value: cover_image } = useField('cover_image', 'required')

const getGenres = async () => {
  try {
    Object.assign(genres, await getGenre())
  } catch (error) {
    console.log(error)
  }
}
const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    cover_image.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}
const getStory = async () => {
  try {
    const response = await fetchBookDetailApi(book_id)
    setValues(response.data as unknown as FormUpdateBook)
    console.log(errors)

    package_type.value = parseInt(package_type as unknown as string)
  } catch (error) {
    console.log(error)
  }
}
const updateStory = async () => {
  try {
    submitClicked.value = true
    if (!(await validate()).valid) return
    if (!values.cover_image?.type?.startsWith('image/')) {
      delete values.cover_image
    }
    values._method = 'put'
    console.log('🚀 ~ updateStory ~ values:', values._method)

    await authors.updateBook(values, book_id)
    showToast(t('story.update.success'), ToastType.SUCCESS)
    router.push({ name: 'author.book' })
  } catch (error) {
    showToast(t('story.update.failed'), ToastType.ERROR)
    console.log(error)
  }
}
onMounted(() => {
  getGenres()
  getStory()
})
</script>
