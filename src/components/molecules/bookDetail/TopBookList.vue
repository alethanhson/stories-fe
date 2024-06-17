<template>
  <div class="border border-t-0 mt-10">
    <ul ref="topTitle" class="flex w-full text-center bg-[#2e2e2e] [&>li]:flex-1 [&>li]:p-2">
      <li
        v-for="(item, index) in tabs"
        :key="index"
        :class="{ 'border-t-2 border-main-primary-400 bg-black': selectedTab === index }"
        @click="selectedTab = index"
        class="top-title cursor-pointer"
      >
        {{ item }}
      </li>
    </ul>

    <div class="px-2">
      <div class="flex items-center py-2 gap-3 border-b">
        <span class="flex items-center gap-1"> 01 </span>
        <div class="w-16 aspect-square overflow-hidden flex items-center">
          <img
            src="https://cdnntx.com/nettruyen/thumb/ban-trai-cu-la-quy-hut-mau-dung-treu-toi.jpg"
            alt=""
            class="object-cover w-full h-full"
          />
        </div>

        <div class="flex-1">
          <p class="font-semibold">Đại ma vòng tha mạng</p>
          <p class="text-[#ccc] text-sm">Continue reading chapter 123</p>
        </div>

        <div class="flex items-center gap-1">
          <BaseIcon name="eye" class="w-4 h-4 fill-white" />
          <span>123M</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const topTitle = ref<HTMLElement | null>(null)
const selectedTab = ref(0)

const tabs = ['Top Month', 'Top Week', 'Top Day']
</script>

<style></style>
