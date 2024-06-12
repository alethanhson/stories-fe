<template>
  <div class="p-5 py-8 bg-dark-0 flex items-center rounded-md">
    <div class="bg-main-primary-200 rounded-full w-12 h-12 flex items-center justify-center">
      <div class="w-5">
        <BaseIcon :name="icon" class="fill-white" />
      </div>
    </div>

    <div class="flex flex-col ml-3 flex-1 justify-center items-center">
      <p class="text-3xl font-bold">{{ value }}</p>
      <p>
        <slot></slot>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    default: ''
  },
  value: {
    type: Number,
    default: 0
  }
})
</script>

<style></style>
