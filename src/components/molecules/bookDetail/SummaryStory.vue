<template>
  <div>
    <p class="mt-3 text-2xl font-semibold uppercase text-main-primary-300">Story content</p>
    <hr class="border-main-primary-300" />
    <p ref="content" :class="{ 'line-clamp-3': !expanded }" class="overflow-hidden mt-3">
      Lorem Ipsum chỉ là văn bản giả của ngành in ấn và sắp chữ. Lorem Ipsum đã là văn bản giả chuẩn
      của ngành từ những năm 1500, khi một nhà in vô danh lấy một tủ sắp chữ và xáo trộn nó để tạo
      ra một cuốn sách mẫu chữ. Nó đã tồn tại không chỉ năm thế kỷ, mà còn nhảy vọt vào sắp chữ điện
      tử, vẫn giữ nguyên bản chất không đổi. Nó trở nên phổ biến vào những năm 1960 với việc phát
      hành các bản Letraset chứa các đoạn Lorem Ipsum, và gần đây hơn với phần mềm xuất bản trên máy
      tính để bàn như Aldus PageMaker bao gồm các phiên bản của Lorem Ipsum.
    </p>
    <button v-if="showButton" @click="toggleExpand" class="text-main-primary-300 mt-2">
      {{ expanded ? 'See less' : 'See more' }}
    </button>
  </div>
</template>

<script setup lang="ts">
const content = ref<any>(null)
const expanded = ref(false)
const showButton = ref(false)

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
