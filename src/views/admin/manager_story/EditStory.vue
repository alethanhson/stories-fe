<template>
  <div class="block">
    <div class="">
      <el-form :model="formUpdateStory" label-width="auto" style="max-width: 600px">
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
              :src="formUpdateStory.cover_image as unknown as string"
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
          <el-input v-model="formUpdateStory.title" />
          <p v-show="submitClicked && errors.title" class="text-status-error text-body-xs">
            {{ errors.title }}
          </p>
        </el-form-item>
        <el-form-item :label="t('story.update.choose_author')">
          <el-select v-model="formUpdateStory.author_id">
            <el-option
              v-for="(author, index) in authors"
              :key="index"
              :label="author.author_name"
              :value="author.id"
            />
          </el-select>
          <p v-show="submitClicked && errors.author_id" class="text-status-error text-body-xs">
            {{ errors.author_id }}
          </p>
        </el-form-item>
        <el-form-item :label="t('story.update.choose_genre')">
          <el-select v-model="formUpdateStory.genre_id">
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
          <el-radio-group v-model="formUpdateStory.package_type">
            <el-radio :label="t('story.story_reader.free')" :value="PackageType.FREE" />
            <el-radio :label="t('story.story_reader.base')" :value="PackageType.BASE" />
            <el-radio :label="t('story.story_reader.premium')" :value="PackageType.PREMIUM" />
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="t('story.desc')">
          <el-input v-model="formUpdateStory.description" type="textarea" />
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
import { formUpdateStory } from './manager_story.common'
import i18n from '@/i18n'
import { MAX_TEXT_INPUT, PackageType } from '@/constants'
import type { AuthorData } from '@/api/modules/author/types'
import { admin } from '@/api/modules/admin'
import { useField, useForm } from 'vee-validate'
import { showToast } from '@/utils'
import { ToastType } from '@/types'
import type { Genre } from '@/api/modules/admin/types'

const { t } = i18n.global
const router = useRouter()
const submitClicked = ref(false)
const authors = reactive<AuthorData[]>([])
const genres = reactive<Genre[]>([])
const imagePreview = ref<string | null>(null)
const { errors, validate } = useForm()
const book_id = useRoute().params.id as unknown as number
const { value: title } = useField('title', `required|max:${MAX_TEXT_INPUT}`)
const { value: author_id } = useField('author_id', 'required')
const { value: genre_id } = useField('genre_id', 'required')
const { value: package_type } = useField('package_type', 'required')
const { value: description } = useField('description', 'required')

const getAuthor = async () => {
  try {
    Object.assign(authors, await admin.listAuthor())
  } catch (error) {
    console.log(error)
  }
}
const getGenre = async () => {
  try {
    Object.assign(genres, await admin.listGenre())
  } catch (error) {
    console.log(error)
  }
}
const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    formUpdateStory.cover_image = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}
const getStory = async () => {
  try {
    const response = await admin.detailStory(book_id)
    Object.assign(formUpdateStory, response)
    formUpdateStory.package_type = parseInt(formUpdateStory.package_type as unknown as string)
  } catch (error) {
    console.log(error)
  }
}
const updateStory = async () => {
  try {
    submitClicked.value = true
    if (!(await validate()).valid) return

    if (!formUpdateStory.cover_image?.type?.startsWith('image/')) {
      delete formUpdateStory.cover_image
    }
    await admin.updateStory(book_id, formUpdateStory)
    showToast(t('story.update.success'), ToastType.SUCCESS)
    router.push({ name: 'admin_list_story' })
  } catch (error) {
    showToast(t('story.update.failed'), ToastType.ERROR)
    console.log(error)
  }
}

watchEffect(() => {
  title.value = formUpdateStory.title
  author_id.value = formUpdateStory.author_id
  package_type.value = formUpdateStory.package_type
  description.value = formUpdateStory.description
  genre_id.value = formUpdateStory.genre_id
})
onMounted(() => {
  getAuthor()
  getGenre()
  getStory()
})
</script>
