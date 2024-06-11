<script setup lang="ts">
import { useSidebarStore } from '@/stores/modules/sidebar'
import DropdownUser from '@/components/molecules/admin/DropdownUser.vue'

const { isSidebarOpen, toggleSidebar } = useSidebarStore()
</script>

<template>
  <header class="sticky top-0 z-[999] flex w-full bg-white drop-shadow">
    <div class="flex flex-grow items-center justify-between py-6 px-4 shadow-2 md:px-6 2xl:px-11">
      <div class="flex items-center gap-2 sm:gap-4 lg:hidden">
        <button
          class="z-999 block rounded-sm border border-white bg-white p-1.5 shadow-sm dark:border-admin-stroke-dark dark:bg-admin-box-dark lg:hidden"
          @click="
            () => {
              toggleSidebar()
            }
          "
        >
          <BaseIcon
            name="bars"
            class="fill-current w-[18px] h-[18px]"
            :class="{ '!w-full': !isSidebarOpen }"
          />
        </button>
        <router-link class="block flex-shrink-0 lg:hidden" :to="{ name: 'dashboard_admin' }">
          <div class="text-black text-xl font-bold">Story</div>
        </router-link>
      </div>
      <div class="hidden sm:block">
        <form action="https://formbold.com/s/unique_form_id" method="POST">
          <div class="relative">
            <button class="absolute top-1/2 left-0 -translate-y-1/2">
              <BaseIcon
                name="search"
                class="fill-black hover:fill-primary dark:fill-black dark:hover:fill-primary w-[20px] h-[20px]"
              />
            </button>

            <input
              type="text"
              placeholder="Type to search..."
              class="w-full xl:w-125 bg-transparent pr-4 pl-9 focus:outline-none"
            />
          </div>
        </form>
      </div>

      <div class="flex items-center gap-3 2xsm:gap-7">
        <DropdownUser />
      </div>
    </div>
  </header>
</template>
