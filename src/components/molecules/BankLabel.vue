<template>
  <div
    class="py-6 px-2 rounded-md bg-[#212121]"
    :class="[isActive ? 'outline outline-1 outline-main-primary-300' : '']"
  >
    <div class="bg-white rounded-md min-h-24 flex items-center">
      <img :src="bank.logo" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  bank: {
    type: Object,
    default: () => {}
  },
  isActive: {
    type: Boolean,
    default: false
  }
})
</script>

<style></style>
