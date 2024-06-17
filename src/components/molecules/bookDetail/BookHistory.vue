<template>
  <div class="border p-2">
    <div class="border-b pb-2 flex justify-between">
      <p class="text-lg font-semibold text-main-primary-300">Reading history</p>
      <p class="text-lg font-semibold">See all</p>
    </div>

    <div class="[&>div:last-child]:border-0 [&>div:last-child]:-mb-2">
      <div class="flex items-center py-2 gap-3 border-b">
        <div class="w-16 aspect-square overflow-hidden flex items-center">
          <img
            src="https://cdnntx.com/nettruyen/thumb/ban-trai-cu-la-quy-hut-mau-dung-treu-toi.jpg"
            alt=""
            class="object-cover w-full h-full"
          />
        </div>

        <div class="flex-1">
          <p class="font-semibold">Đại ma vòng tha mạng</p>
          <p class="text-[#ccc]">Continue reading chapter 123</p>
        </div>

        <div class="flex items-center gap-1">
          <BaseIcon name="eye" class="w-4 h-4 fill-white" />
          <span>123M</span>
        </div>
      </div>
      <div class="flex items-center py-2 gap-3 border-b">
        <div class="w-16 aspect-square overflow-hidden flex items-center">
          <img
            src="https://cdnntx.com/nettruyen/thumb/ban-trai-cu-la-quy-hut-mau-dung-treu-toi.jpg"
            alt=""
            class="object-cover w-full h-full"
          />
        </div>

        <div class="flex-1">
          <p class="font-semibold">Đại ma vòng tha mạng</p>
          <p class="text-[#ccc]">Continue reading chapter 123</p>
        </div>

        <div class="flex items-center gap-1">
          <BaseIcon name="eye" class="w-4 h-4 fill-white" />
          <span>123M</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
