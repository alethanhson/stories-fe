<template>
  <div
    class="flex items-center cursor-pointer hover:text-main-primary-200 [&>div>svg]:hover:fill-main-primary-200"
    :class="{
      'text-main-primary-200 [&>div>svg]:fill-main-primary-200': isActive
    }"
  >
    <div v-if="iconLeft" class="w-6">
      <BaseIcon name="userCircle" class="fill-white"></BaseIcon>
    </div>
    <span class="flex-1 px-5">
      <slot></slot>
    </span>
    <div v-if="iconRight" class="w-2">
      <BaseIcon name="arrowRight" class="fill-white"></BaseIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  iconLeft: {
    type: String,
    default: ''
  },
  iconRight: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: false
  }
})
</script>

<style></style>
