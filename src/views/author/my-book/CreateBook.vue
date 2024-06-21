<template>
  <div class="block">
    <el-form :model="formCreate" label-width="auto" style="max-width: 600px">
      <div class="flex justify-center">
        <label htmlFor="fileUpload" class="flex justify-center relative mb-6">
          <img
            v-if="imagePreview"
            :src="imagePreview"
            alt="Image Preview"
            class="w-36 h-36 mt-4 object-cover rounded-full"
          />
          <base-icon v-else name="img" class="w-36 h-36 mt-4 object-cover"></base-icon>
          <base-icon name="uploadImage" class="self-end absolute"></base-icon>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            id="fileUpload"
            hidden
            @change="onFileChange"
          />
        </label>
        <p v-show="submitClicked && errors.cover_image" class="text-status-error text-body-xs">
          {{ errors.cover_image }}
        </p>
      </div>
      <el-form-item :label="t('story.create.title')">
        <el-input v-model="formCreate.title" />
        <p v-show="submitClicked && errors.title" class="text-status-error text-body-xs">
          {{ errors.title }}
        </p>
      </el-form-item>
      <el-form-item :label="t('story.create.choose_genre')">
        <el-select v-model="formCreate.genre_id">
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
      <el-form-item :label="t('story.create.story_reader')">
        <el-radio-group v-model="formCreate.package_type">
          <el-radio :label="t('story.story_reader.free')" :value="PackageType.FREE" />
          <el-radio :label="t('story.story_reader.base')" :value="PackageType.BASE" />
          <el-radio :label="t('story.story_reader.premium')" :value="PackageType.PREMIUM" />
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="t('story.desc')">
        <el-input v-model="formCreate.description" type="textarea" />
        <p v-show="submitClicked && errors.description" class="text-status-error text-body-xs">
          {{ errors.description }}
        </p>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createBook">{{ t('story.accept') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import i18n from '@/i18n'
import { formCreate } from './my_book.common'
import { ALLOWED_IMAGE_TYPES, MAX_TEXT_INPUT, PackageType } from '@/constants'
import { useField, useForm } from 'vee-validate'
import { authors } from '@/api/modules/author'
import { showToast } from '@/utils'
import { ToastType } from '@/types'
import type { Genre } from '@/api/modules/admin/types'
import { useAuthorStore } from '@/stores/modules/author'
import { getGenre } from '@/api/modules/genre'

const { t } = i18n.global
const genres = reactive<Genre[]>([])
const router = useRouter()
const imagePreview = ref<string>()
const submitClicked = ref<boolean>(false)
const { errors, validate } = useForm()
const { value: title } = useField('title', `required|max:${MAX_TEXT_INPUT}`)
const { value: genre_id } = useField('genre_id', 'required')
const { value: package_type } = useField('package_type', 'required')
const { value: description } = useField('description', 'required')
const { value: cover_image } = useField('cover_image', `required|fileType:${ALLOWED_IMAGE_TYPES}`)

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    formCreate.cover_image = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}
const createBook = async () => {
  try {
    setFormCreate()
    submitClicked.value = true
    if (!(await validate()).valid) return
    const response = await authors.createBook(formCreate)
    showToast(t('story.create.success'), ToastType.SUCCESS)
    router.push({
      name: 'author.chapter.create',
      query: {
        bookId: response.data.id,
        bookName: response.data.title
      }
    })
  } catch (error) {
    showToast(t('story.create.failed'), ToastType.ERROR)
    console.log(error)
  }
}
const getGenres = async () => {
  try {
    Object.assign(genres, (await getGenre()).genres)
  } catch (error) {
    console.log(error)
  }
}
const setFormCreate = () => {
  title.value = formCreate.title
  package_type.value = formCreate.package_type
  description.value = formCreate.description
  genre_id.value = formCreate.genre_id
  cover_image.value = formCreate.cover_image
  formCreate.author_id = useAuthorStore().getInfoAuthor.id
}

onMounted(() => {
  getGenres()
})
</script>
