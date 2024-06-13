<template>
  <div class="w-full">
    <el-form :model="formCrawl" label-width="auto" style="max-width: 600px">
      <el-form-item :label="t('story.create.path')">
        <el-input v-model="formCrawl.url" />
        <p v-show="submitClicked && errors.url" class="text-status-error text-body-xs">
          {{ errors.url }}
        </p>
      </el-form-item>
      <el-form-item :label="t('story.create.choose_author')">
        <el-select v-model="formCrawl.author_id" :placeholder="t('story.create.choose_author')">
          <el-option
            v-for="(author, index) in authors"
            :key="index"
            :label="author.author_name"
            :value="author.id"
          />
        </el-select>
        <p v-show="submitClicked && errors.genre_id" class="text-status-error text-body-xs">
          {{ errors.genre_id }}
        </p>
      </el-form-item>
      <el-form-item :label="t('story.create.choose_genre')">
        <el-select v-model="formCrawl.genre_id" :placeholder="t('story.create.choose_genre')">
          <el-option
            v-for="(genre, index) in genres"
            :key="index"
            :label="genre.genre_name"
            :value="genre.id"
          />
        </el-select>
        <p v-show="submitClicked && errors.author_id" class="text-status-error text-body-xs">
          {{ errors.author_id }}
        </p>
      </el-form-item>
      <el-form-item :label="t('story.create.story_reader')">
        <el-radio-group v-model="formCrawl.package_type">
          <el-radio :value="PackageType.FREE">{{ t('story.story_reader.free') }}</el-radio>
          <el-radio :value="PackageType.BASE">{{ t('story.story_reader.base') }}</el-radio>
          <el-radio :value="PackageType.PREMIUM">{{ t('story.story_reader.premium') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="t('story.desc')">
        <el-input v-model="formCrawl.description" type="textarea" />
        <p v-show="submitClicked && errors.description" class="text-status-error text-body-xs">
          {{ errors.description }}
        </p>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleCreate">{{ t('story.accept') }}</el-button>
      </el-form-item>
    </el-form>
    <base-loading :loading="loading"></base-loading>
  </div>
</template>
<script setup lang="ts">
import i18n from '@/i18n'
import { PackageType } from '@/constants'
import { formCrawl } from './manager_story.common'
import type { AuthorData } from '@/api/modules/author/types'
import { useField, useForm } from 'vee-validate'
import { admin } from '@/api/modules/admin'
import type { Genre } from '@/api/modules/admin/types'
import { ToastType } from '@/types'
import { showToast } from '@/utils'

const { t } = i18n.global
const router = useRouter()
const authors = reactive<AuthorData[]>([])
const genres = reactive<Genre[]>([])
const submitClicked = ref(false)
const loading = ref(false)
const { errors, validate } = useForm()
const { value: url } = useField('url', 'required|url')
const { value: author_id } = useField('author_id', 'required')
const { value: genre_id } = useField('genre_id', 'required')
const { value: package_type } = useField('package_type', 'required')
const { value: description } = useField('description', 'required')

const handleCreate = async () => {
  try {
    submitClicked.value = loading.value = true
    if (!(await validate()).valid) return (loading.value = false)
    const result = await admin.createStory(formCrawl)
    loading.value = true
    if (!result) return showToast(t('story.create.info'), ToastType.INFO)
    showToast(t('story.create.success'), ToastType.SUCCESS)
    router.push({ name: 'admin_list_story' })
  } catch (error) {
    console.error('Create error:', error)
  }
}
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

watchEffect(() => {
  url.value = formCrawl.url
  author_id.value = formCrawl.author_id
  package_type.value = formCrawl.package_type
  description.value = formCrawl.description
  genre_id.value = formCrawl.genre_id
})
onMounted(() => {
  getAuthor()
  getGenre()
})
</script>
