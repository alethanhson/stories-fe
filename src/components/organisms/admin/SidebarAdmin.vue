<script setup lang="ts">
import BaseIcon from '@/components/atoms/BaseIcon.vue'
import SidebarItem from '@/components/molecules/admin/SidebarItem.vue'
import { useSidebarStore } from '@/stores/modules/sidebar'
import { mockMenuItems } from '@/views/admin/admin.common'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const target = ref(null)

const sidebarStore = useSidebarStore()

onClickOutside(target, () => {
  sidebarStore.isSidebarOpen = false
})

const menuGroups = reactive([
  {
    menuItems: mockMenuItems
  }
])
</script>

<template>
  <aside
    class="absolute left-0 top-0 z-[9999] flex h-screen w-[300px] flex-col overflow-y-hidden bg-admin-black dark:bg-admin-box-dark lg:static lg:translate-x-0"
    :class="{
      'translate-x-0': sidebarStore.isSidebarOpen,
      '-translate-x-full': !sidebarStore.isSidebarOpen
    }"
    ref="target"
  >
    <div class="flex items-center justify-between gap-2 px-6 py-4 lg:py-6">
      <router-link :to="{ name: 'dashboard_admin' }">
        <div class="text-white text-2xl font-bold">Story</div>
      </router-link>

      <button class="block lg:hidden" @click="sidebarStore.isSidebarOpen = false">
        <BaseIcon name="arrowLeft" class="fill-white w-[18px] h-[18px]" />
      </button>
    </div>
    <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
      <nav class="px-4 lg:px-6">
        <template v-for="menuGroup in menuGroups" :key="menuGroup.name">
          <div>
            <ul class="mb-6 flex flex-col gap-1.5">
              <SidebarItem
                v-for="(menuItem, index) in menuGroup.menuItems"
                :item="menuItem"
                :key="index"
                :index="index"
              />
            </ul>
          </div>
        </template>
      </nav>
    </div>
  </aside>
</template>
