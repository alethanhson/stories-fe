<template>
  <div class="w-full">
    <div class="mx-0 sm:mx-16 lg:m-28 xl:mx-48 bg-white">
      <h1 class="p-4 font-medium text-xl text-slate-500">
        {{ bookChapter.title + `- ${t('story.chap')} ` + currentChapter?.chapter_number }}
      </h1>
      <div class="w-1/3 mx-auto bg-slate-400 p-1 rounded-md flex justify-center mb-2">
        <base-icon
          v-if="chapterIndex > 0"
          name="left"
          class="h-6 fill-slate-600 cursor-pointer"
          @click="changeChap(chapterIndex - 1)"
        ></base-icon>
        <p class="mx-2 sm:mx-4 md:mx-10 xl:mx-16 font-medium text-slate-600">
          {{ t('story.chap') + ': ' + currentChapter?.chapter_number }}
        </p>
        <base-icon
          name="right"
          v-if="chapterIndex < bookChapter.chapters.length - 1"
          class="h-6 fill-slate-600 cursor-pointer"
          @click="changeChap(chapterIndex + 1)"
        ></base-icon>
      </div>
      <div class="mx-10 flex flex-col">
        <img
          v-for="chapterImage in listChapterImage"
          :key="chapterImage.id"
          :src="chapterImage.url"
          alt=""
          class="max-w-full"
        />
        <base-loading :loading="loading" class="mt-32"></base-loading>
      </div>
      <div class="w-1/3 flex justify-center gap-8 mx-auto">
        <button
          v-if="chapterIndex > 0"
          @click="changeChap(chapterIndex - 1)"
          class="flex p-1 px-2 bg-slate-300 rounded-md gap-2 items-center m-4 font-medium text-slate-600"
        >
          <base-icon name="left" class="h-4 fill-slate-600"></base-icon
          ><span>{{ t('story.before') }}</span>
        </button>
        <button
          class="flex p-1 px-2 bg-slate-300 rounded-md gap-2 items-center m-4 font-medium text-slate-600"
          v-if="chapterIndex < bookChapter.chapters.length - 1"
          @click="changeChap(chapterIndex + 1)"
        >
          <span>{{ t('story.after') }}</span>
          <base-icon name="right" class="h-4 fill-slate-600"></base-icon>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { chapter_images } from '@/api/modules/chapter_image'
import type { ChapterImage } from '@/api/modules/chapter_image/type'
import { bookChapter } from './story.common'
import { getBookByChapter } from '@/api/modules/story'
import i18n from '@/i18n'

const { t } = i18n.global
const route = useRoute()
const router = useRouter()
const listChapterImage = reactive<ChapterImage[]>([])
const loading = ref<boolean>(true)
const chapterIndex = ref<number>(0)
const getChapterImage = async () => {
  try {
    Object.assign(
      listChapterImage,
      await chapter_images.list(route.params.id_chapter as unknown as number)
    )
    loading.value = false
  } catch (error) {
    console.log(error)
  }
}
const getBookChap = async () => {
  Object.assign(
    bookChapter,
    (await getBookByChapter(route.params.id_chapter as unknown as number)).data
  )
}
const currentChapter = computed(() => {
  chapterIndex.value = bookChapter.chapters.findIndex(
    (chapter) => chapter.id == (route.params.id_chapter as unknown as number)
  )
  return chapterIndex.value !== -1 ? bookChapter.chapters[chapterIndex.value] : null
})
const changeChap = (index_chap: number) => {
  router.push({
    name: 'reading-story',
    params: { id_chapter: bookChapter.chapters[index_chap].id }
  })
}
onMounted(() => {
  getBookChap()
  getChapterImage()
})
</script>
