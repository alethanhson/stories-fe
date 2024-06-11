<script setup lang="ts">
import i18n from '@/i18n'
import router from '@/router'
import { useAuthStore } from '@/stores/modules/auth'
import { ToastType } from '@/types'
import { showToast } from '@/utils'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const target = ref(null)
const dropdownOpen = ref(false)
const authStore = useAuthStore()

onClickOutside(target, () => {
  dropdownOpen.value = false
})

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push({ name: 'home' })
    showToast(i18n.global.t('common.logout_success'), ToastType.SUCCESS)
  } catch (error) {
    showToast(i18n.global.t('common.logout_error'), ToastType.ERROR)
  }
}
</script>

<template>
  <div class="relative" ref="target">
    <router-link
      class="flex items-center gap-4"
      to="#"
      @click.prevent="dropdownOpen = !dropdownOpen"
    >
      <span class="text-right block">
        <span class="block text-sm font-medium text-black dark:text-white">{{
          authStore.currentUser.full_name
        }}</span>
      </span>
      <BaseIcon name="chevronDown" class="w-[12px] h-[8px]" :class="dropdownOpen && 'rotate-180'" />
    </router-link>

    <div
      v-show="dropdownOpen"
      class="absolute right-0 mt-4 flex w-[150px] flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-admin-stroke-dark dark:bg-admin-box-dark"
    >
      <ul
        class="flex flex-col gap-5 border-b border-stroke px-2 py-7.5 dark:border-admin-stroke-dark"
      >
        <li>
          <router-link
            to="/profile"
            class="flex items-center gap-3.5 text-xs font-medium duration-300 ease-in-out hover:text-primary lg:text-sm"
          >
            My Profile
          </router-link>
        </li>
        <li>
          <router-link
            to="#"
            class="flex items-center gap-3.5 text-xs font-medium duration-300 ease-in-out hover:text-primary lg:text-sm"
          >
            My Contacts
          </router-link>
        </li>
        <li>
          <router-link
            to="/pages/settings"
            class="flex items-center gap-3.5 text-xs font-medium duration-300 ease-in-out hover:text-primary lg:text-sm"
          >
            Account Settings
          </router-link>
        </li>
      </ul>
      <button
        class="flex items-center gap-3.5 py-4 px-6 text-xs font-medium duration-300 ease-in-out hover:text-primary lg:text-sm"
        @click="handleLogout"
      >
        Log Out
      </button>
    </div>
  </div>
</template>
