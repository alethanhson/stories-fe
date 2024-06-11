<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSidebarStore } from '@/stores/modules/sidebar'
import BaseIcon from '@/components/atoms/BaseIcon.vue';

const sidebarStore = useSidebarStore()
const router = useRouter()

const props = defineProps(['item', 'index'])

const handleItemClick = () => {
  const pageName = sidebarStore.page === props.item.route.name ? '' : props.item.route.name
  sidebarStore.page = pageName
  sidebarStore.selected = pageName
}

router.afterEach((to) => {
  const pageName = (to.name as string) || ''
  sidebarStore.page = pageName
  sidebarStore.selected = pageName
})
</script>

<template>
  <li>
    <router-link
      :to="item.route"
      class="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-admin-body-dark1 duration-300 ease-in-out hover:bg-admin-gray-dark dark:hover:bg-admin-meta-4"
      @click.prevent="handleItemClick"
      :class="{
        'bg-admin-gray-dark dark:bg-admin-meta-4': sidebarStore.selected === item.route.name
      }"
    >
      <BaseIcon :name="item.icon" class="w-[18px] h-[18px] fill-current" />
      {{ item.label }}
    </router-link>
  </li>
</template>
