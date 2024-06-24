<template>
  <div v-if="authorSearchResults.length > 0">
    <h3>Authors:</h3>
    <ul>
      <li v-for="(author, index) in authorSearchResults" :key="index">
        <p>{{ author.author_name }}</p>
      </li>
    </ul>
  </div>
  <div v-if="bookSearchResults.length > 0">
    <h3>Books:</h3>
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
    <p>{{ t('story.no_find') }} "{{ searchKeyWord }}"</p>
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
