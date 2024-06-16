<template>
  <div class="w-full bg-black pt-10 text-white">
    <div class="flex gap-10 max-w-[1200px] mx-auto">
      <div class="flex-[2] flex-col px-5 md:px-28 min-[1200px]:px-28">
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

      <div class="flex-1 max-[1200px]:hidden">
        <BookHistory />

        <TopBookList />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
