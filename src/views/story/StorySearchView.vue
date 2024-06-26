<template>
  <div v-if="authorSearchResults.length > 0">
    <p class="text-lg font-medium">Authors:</p>
    <ul>
      <li v-for="(author, index) in authorSearchResults" :key="index">
        <p>{{ author.author_name }}</p>
      </li>
    </ul>
  </div>
  <div class="mt-4" v-if="bookSearchResults.length > 0">
    <p class="text-lg font-medium">Books:</p>
    <list-story :stories="bookSearchResults"></list-story>
  </div>
  <div
    v-if="
      searchKeyWord &&
      searchKeyWord.trim() !== '' &&
      bookSearchResults.length == 0 &&
      authorSearchResults.length == 0
    "
  >
    <p>{{ t('story.no_find_for') }} "{{ searchKeyWord }}"</p>
  </div>
</template>

<script setup lang="ts">
import { useStoriesStore } from '@/stores/modules/story'
import i18n from '@/i18n'

const { t } = i18n.global

const store = useStoriesStore()
const bookSearchResults = computed(() => store.bookSearchResults || [])
const authorSearchResults = computed(() => store.authorSearchResults || [])
const searchKeyWord = computed(() => store.searchKeyWord)
</script>
