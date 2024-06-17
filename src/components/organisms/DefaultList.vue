<template>
  <el-menu class="!bg-inherit !border-none" active-text-color="#1ed291">
    <MenuGenre title="Truyện tranh" index-prefix="comic-" :genres="comicGenres"></MenuGenre>
    <MenuGenre title="Truyện chữ" index-prefix="novel-" :genres="novelGenres"></MenuGenre>
    <MenuStory
      title="Truyện được xem nhiều nhất"
      index-prefix="popular-"
      :stories="popularStories"
    ></MenuStory>
    <MenuStory title="Truyện mới phát hành" index-prefix="new-" :stories="newStories"></MenuStory>
  </el-menu>
</template>

<script setup lang="ts">
import { novelGenres, comicGenres } from '@/mock/mock.genre'
import { popularStories, newStories } from '@/mock/mock.story'
</script>
