<template>
  <el-menu class="!bg-inherit !border-none !p-5" active-text-color="#1ed291">
    <BookHistory v-if="user" class="[&>div>div>div>svg]:fill-black" />

    <TopBookList
      class="[&>div>div>div>svg]:fill-black [&>ul]:bg-[#e2e2e2] [&>ul>.border-t-2]:bg-white"
    />
  </el-menu>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/modules/auth'

const user = computed(() => useAuthStore().currentUser)
</script>
