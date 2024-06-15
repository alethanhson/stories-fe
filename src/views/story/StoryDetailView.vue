<template>
  <div class="w-full bg-black px-80 pt-10 text-white flex gap-10">
    <div class="flex-[2] flex-col">
      <div class="[&>span]:hover:text-main-primary-200 [&>span]:cursor-pointer mb-2">
        <span>Home</span> / <span>Genre</span> /
        <span>Đại ma vương tha mạng</span>
      </div>

      <div class="w-full text-center mb-4">
        <p class="text-2xl font-semibold uppercase">Đại ma vương tha mạng</p>
        <span class="italic">[Updated at 9999/99/99]</span>
      </div>

      <BookInfo />

      <SummaryStory />

      <ChapterList />
    </div>

    <div class="flex-1">
      <BookHistory />

      <TopBookList />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
