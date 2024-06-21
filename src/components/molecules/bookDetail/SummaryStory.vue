<template>
  <div>
    <p class="mt-3 text-2xl font-semibold uppercase text-main-primary-300">Story content</p>
    <hr class="border-main-primary-300" />
    <p ref="content" :class="{ 'line-clamp-3': !expanded }" class="overflow-hidden mt-3">
      {{ description }}
    </p>
    <button
      v-if="showButton"
      @click="toggleExpand"
      class="text-main-primary-300 -mt-2 hover:underline"
    >
      {{ expanded ? 'See less' : 'See more' }}
    </button>
  </div>
</template>

<script setup lang="ts">
const content = ref<any>(null)
const expanded = ref(false)
const showButton = ref(false)

defineProps({
  description: {
    type: String,
    default: ''
  }
})

onMounted(() => {
  if (content.value.scrollHeight > content.value.clientHeight) {
    showButton.value = true
  }
})

const toggleExpand = () => {
  expanded.value = !expanded.value
}
</script>

<style>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
