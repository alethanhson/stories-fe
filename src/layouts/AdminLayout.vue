<script setup lang="ts">
import HeaderAdmin from '@/components/organisms/admin/HeaderAdmin.vue'
import SidebarAdmin from '@/components/organisms/admin/SidebarAdmin.vue'
</script>
<template>
  <div class="flex h-screen overflow-hidden">
    <SidebarAdmin />
    <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <HeaderAdmin />
      <main>
        <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <RouterView></RouterView>
        </div>
      </main>
    </div>
  </div>
</template>
