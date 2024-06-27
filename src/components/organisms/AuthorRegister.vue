<template>
  <div
    v-if="props.showAuthorRegis"
    @click="emit('show', false)"
    class="fixed inset-0 bg-gray-25 bg-opacity-60 z-50"
  >
    <div
      @click.stop
      class="w-[400px] shadow-xl mx-auto mt-20 h-fit flex flex-col bg-white p-10 rounded-lg border-dark-50"
    >
      <base-icon name="cancel" @click="emit('show', false)" class="self-end w-8 h-8"></base-icon>
      <label htmlFor="fileUpload" class="flex justify-center relative mb-6">
        <img
          v-if="imagePreview"
          :src="imagePreview"
          alt="Image Preview"
          class="w-24 h-24 mt-4 object-cover rounded-full"
        />
        <base-icon v-else name="person" class="w-16"></base-icon>
        <base-icon name="uploadImage" class="self-end absolute"></base-icon>
        <base-input-field
          class="hidden"
          v-model:="valueFieldFile"
          type="file"
          id="fileUpload"
          field-name="avatar"
          @change="onFileChange"
          :error="errorMessageFile"
        ></base-input-field>
      </label>
      <label class="text-lg text-gray-500 mb-4">{{ i18n.global.t('author.author_name') }}</label>
      <base-input-field
        v-model="valueFieldName"
        placeholder="Author name"
        field-name="author_name"
        id="author"
        :error="errorMessageName"
      >
      </base-input-field>
      <div class="flex gap-6 justify-between mt-6">
        <base-button status="error" @click="emit('show', false)">{{
          t('common.cancel')
        }}</base-button>
        <base-button status="success" @click="createAuthor">{{ t('common.accept') }}</base-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { authors } from '@/api/modules/author'
import type { FormAuthorData } from '@/api/modules/author/types.ts'
import { ALLOWED_IMAGE_TYPES, MAX_TEXT_INPUT } from '@/constants'
import i18n from '@/i18n'
import { useAuthStore } from '@/stores/modules/auth'
import { ToastType } from '@/types'
import { showToast } from '@/utils/toastHelper'
import { useField } from 'vee-validate'
import { ref } from 'vue'
const props = defineProps({
  showAuthorRegis: {
    type: Boolean,
    default: false
  }
})
const router = useRouter()
const emit = defineEmits(['show'])
const authStore = useAuthStore()
const { t } = i18n.global
const imagePreview = ref<string | null>(null)
const author = reactive<FormAuthorData>({
  create_by_user_id: authStore.currentUser?.id,
  author_name: ''
})
const {
  value: valueFieldName,
  errorMessage: errorMessageName,
  validate: validateName
} = useField('author_name', `required|max:${MAX_TEXT_INPUT}`)
const {
  value: valueFieldFile,
  errorMessage: errorMessageFile,
  validate: validateFile
} = useField('avatar', `fileType:${ALLOWED_IMAGE_TYPES}`)
const onFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0] && (await validateFile()).valid) {
    const file = input.files[0]
    author.avatar = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}
const createAuthor = async () => {
  if ((await validateName()).valid) {
    try {
      author.author_name = valueFieldName.value as string
      const response: any = await authors.create(author)
      const user = authStore.currentUser
      user.role = response.role
      authStore.setUserProfile(user)
      showToast(t('author.register_success'), ToastType.SUCCESS)
      emit('show', false)
    } catch (error) {
      showToast(t('author.register_failed'), ToastType.ERROR)
      console.log(error)
    }
  }
}
</script>
