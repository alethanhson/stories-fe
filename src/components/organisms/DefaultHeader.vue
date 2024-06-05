<template>
  <div class="h-full flex items-center px-5 justify-between relative">
    <router-link :to="{ name: 'home' }">
      <div class="flex items-center gap-4 cursor-pointer none text-black">
        <div class="overflow-hidden rounded-full w-10 h-10 flex items-center">
          <img class="object-cover w-full h-full" :src="logo" alt="logo" />
        </div>
        <span class="text-3xl font-bold">Story</span>
      </div>
    </router-link>

    <div class="flex-1 flex-row-reverse me-4 md:flex hidden">
      <div class="relative">
        <el-input
          v-model="search"
          size="large"
          placeholder="Please input"
          class="[&>div>input]:pe-10 input-search"
        />
        <div class="w-4 me-4 cursor-pointer absolute top-1/2 -translate-y-1/2 right-0">
          <BaseIcon name="search" />
        </div>
      </div>
    </div>

    <div class="gap-2 items-center md:flex hidden">
      <el-button type="warning" round plain>Service Package</el-button>
      <el-button v-if="!isLogin" type="primary" round>Login</el-button>
      <router-link v-if="!isLogin" :to="{ name: 'register' }" class="w-full">
        <el-button type="success" round>Register</el-button>
      </router-link>
      <el-dropdown v-if="isLogin" ref="dropdown" trigger="contextmenu">
        <span class="el-dropdown-link">
          <div
            class="w-10 h-10 flex items-center overflow-hidden rounded-full cursor-pointer"
            @click="showClick()"
          >
            <img :src="avatarDefault" alt="avatar" />
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Profile</el-dropdown-item>
            <el-dropdown-item>Register as an author</el-dropdown-item>
            <el-dropdown-item>Manager Service Package</el-dropdown-item>
            <el-dropdown-item>Setting</el-dropdown-item>
            <el-dropdown-item>Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="w-6 md:hidden block cursor-pointer" @click="handleOpenNavbar()">
      <BaseIcon name="bars" />
    </div>
    <div
      ref="navbar"
      :class="{ 'w-1/2 md:w-0 ': isOpen, 'w-0 ': !isOpen }"
      class="h-screen top-0 bg-white text-black pt-5 shadow-lg absolute right-0 transition-all duration-200 ease-in-out overflow-hidden z-50"
    >
      <div v-show="isOpen">
        <div class="w-full px-4 flex items-center flex-row-reverse gap-5 text-nowrap">
          <div class="w-10 h-10 flex items-center overflow-hidden rounded-full cursor-pointer">
            <img :src="avatarDefault" alt="avatar" />
          </div>
          <b class="text-2xl">Lê Công Anh</b>
        </div>

        <div class="relative px-5 mt-3">
          <el-input
            v-model="search"
            size="large"
            placeholder="Please input"
            class="[&>div>input]:pe-6 input-search"
          />
          <div class="w-4 me-4 cursor-pointer absolute top-1/2 -translate-y-1/2 right-4">
            <BaseIcon name="search" />
          </div>
        </div>

        <hr class="my-4" />

        <main class="w-full overflow-y-auto h-[300px]">
          <el-menu class="!bg-inherit !border-none" active-text-color="#1ed291">
            <MenuGenre title="Truyện tranh" index-prefix="comic-" :genres="comicGenres"></MenuGenre>
            <MenuGenre title="Truyện chữ" index-prefix="novel-" :genres="novelGenres"></MenuGenre>
            <MenuStory
              title="Truyện được xem nhiều nhất"
              index-prefix="popular-"
              :stories="popularStories"
            ></MenuStory>
            <MenuStory
              title="Truyện mới phát hành"
              index-prefix="new-"
              :stories="newStories"
            ></MenuStory>
          </el-menu>
        </main>

        <footer class="bottom-0 w-full px-5 py-3 absolute bg-cyan-100 flex gap-3">
          <el-button type="primary" plain class="w-full">Login</el-button>
          <router-link :to="{ name: 'register' }" class="w-full">
            <el-button type="info" class="w-full" plain>Register</el-button>
          </router-link>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import avatarDefault from '@/assets/images/default_avatar.png'
import logo from '@/assets/images/logo.jpg'
import type { DropdownInstance } from 'element-plus'
import { useAuthStore } from '@/stores/modules/auth'

const authStore = useAuthStore()
const search = ref('')
const isLogin = authStore.isLoggedIn
const navbar = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const dropdown = ref<DropdownInstance>()

function showClick() {
  if (!dropdown.value) return

  dropdown.value.handleOpen()
}
function handleOpenNavbar() {
  if (navbar.value) {
    setTimeout(() => {
      isOpen.value = true
    }, 1)
  }
}
const handleClick = (event) => {
  if (navbar.value && !navbar.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClick)
})

import type { Genre } from '@/types'

const genres = ref<Genre[]>([
  { id: 1, name_genre: 'Khoa học' },
  { id: 2, name_genre: 'Lịch sử' },
  { id: 3, name_genre: 'Cổ đại' }
])

const stories = ref([
  { id: 1, title: 'Truyện Khoa học 1', id_genre: 1, type: 'comic' },
  { id: 2, title: 'Truyện Lịch sử 1', id_genre: 2, type: 'comic' },
  { id: 3, title: 'Truyện Cổ đại 1', id_genre: 3, type: 'novel' }
])

const comicGenres = computed(() =>
  genres.value.filter((genre) =>
    stories.value.some((story) => story.id_genre === genre.id && story.type === 'comic')
  )
)

const novelGenres = computed(() =>
  genres.value.filter((genre) =>
    stories.value.some((story) => story.id_genre === genre.id && story.type === 'novel')
  )
)

const popularStories = ref([
  { id: 1, title: 'Truyện Khoa học 1', views: 123 },
  {
    id: 2,
    title: 'Truyện Cổ đại 1',
    views: 186
  }
])

const newStories = ref([
  { id: 1, title: 'Truyện Cổ đại 1' },
  { id: 2, title: 'Truyện Lịch sử 1' }
])
</script>
