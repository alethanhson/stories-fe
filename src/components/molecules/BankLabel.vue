<template>
  <div class="border border-main-primary-300 py-6 px-2 rounded-md">
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
  }
})
</script>

<style></style>
