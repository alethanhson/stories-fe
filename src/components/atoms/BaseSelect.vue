<template>
  <div
    class="p-5 rounded-xl flex items-center gap-4 cursor-pointer box-content"
    :class="[isActive ? 'outline-2 outline outline-main-primary-300' : '']"
  >
    <div class="w-7">
      <BaseIcon name="bank" :class="[isActive ? 'fill-main-primary-300' : 'fill-white']" />
    </div>
    <div class="flex-1">
      <slot />
    </div>
    <div v-if="isActive" class="w-5">
      <BaseIcon name="check" class="fill-main-primary-300" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})
</script>
<style></style>
