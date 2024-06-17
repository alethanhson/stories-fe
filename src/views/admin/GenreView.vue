<template>
  <BaseButton @click="showAdd = !showAdd" class="ml-auto mb-4">Add</BaseButton>
  <AddGenreModel :show="showAdd" @close-form="closeForm" @reload="reload" />
  <UpdateGenreModel
    :show="showUpdate"
    :genreInfo="genreInfo"
    @close-form="closeForm"
    @reload="reload"
  />

  <div class="max-w-full overflow-x-auto">
    <table class="w-full table-auto border-collapse border border-admin-stroke">
      <thead>
        <tr class="bg-admin-gray-2 text-left dark:bg-meta-4">
          <th class="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
            Name
          </th>
          <th class="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
            Cover image
          </th>
          <th class="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(genre, index) in genreList" :key="index">
          <td class="py-5 px-4 pl-9 xl:pl-11">
            <h5 class="font-medium text-black dark:text-white">{{ genre.genre_name }}</h5>
          </td>
          <td class="py-5 px-4">
            <img v-if="genre.cover_image" :src="genre.cover_image" class="w-[120px]" />
          </td>
          <td class="py-5 px-4">
            <div class="flex items-center space-x-3.5">
              <button @click="toggleUpdate(genre.id)">
                <BaseIcon name="update" class="w-[18px] fill-status-warning"></BaseIcon>
              </button>
              <button @click="handleDelete(genre.id)">
                <BaseIcon name="trash" class="w-[18px] fill-status-error"></BaseIcon>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { deleteGenre, getGenre } from '@/api/modules/genre'
import type { GenreData, GenreResponse } from '@/api/modules/genre/type'
import BaseIcon from '@/components/atoms/BaseIcon.vue'
import AddGenreModel from '@/components/molecules/genre/AddGenreModel.vue'
import { ToastType } from '@/types'
import { showToast } from '@/utils'
import i18n from '@/i18n'

const router = useRouter()
const { t } = i18n.global
const showAdd = ref(false)
const showUpdate = ref(false)
const closeForm = () => {
  showAdd.value = false
  showUpdate.value = false
}

const reload = async () => {
  await fetchGenre()
}

const genreList = ref<GenreData[]>([])

const fetchGenre = async () => {
  const { genres }: GenreResponse = await getGenre()
  genreList.value = genres
}

const handleDelete = async (id) => {
  try {
    await deleteGenre(id)
    router.push({ name: 'genre' })
    reload()
    showToast(t('genre.delete_success'), ToastType.SUCCESS)
  } catch (error) {
    console.log(error)
    showToast(t('genre.delete_fail'), ToastType.ERROR)
  }
}

onMounted(async () => {
  await fetchGenre()
})

const genreInfo = ref()
const toggleUpdate = async (id) => {
  showUpdate.value = !showUpdate.value
  genreInfo.value = genreList.value.find((genre) => genre.id === id)
}
</script>

<style scoped></style>
