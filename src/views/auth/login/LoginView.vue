<template>
  <div class="flex bg-[#1B1B1B] bg-opacity-60 fixed inset-0 z-10">
    <div
      class="modal w-full h-full md:w-1/3 md:h-[600px] bg-white md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 absolute rounded-lg p-10"
    >
      <div class="form w-full">
        <form @submit.prevent="handleLogin">
          <p class="text-black text-center text-body-l font-bold">Login</p>
          <div class="input mt-8 text-body-s">
            <label class="text-body-s">Email</label>
            <base-input-field
              v-model="state.email"
              id="email"
              type="email"
              field-name="email"
              placeholder="Enter email"
              class="mb-2"
              rules="required|email"
              :error="errorMsg.email"
              :isFocus="hasEmailError"
            />

            <label class="">Password</label>
            <base-input-field
              v-model="state.password"
              id="password"
              type="password"
              field-name="password"
              placeholder="Enter password"
              rules="required|min:8|max:20"
            />
          </div>
          <base-button size="sm" class="w-full mt-8 py-6" type="submit">Login</base-button>
        </form>
      </div>
      <div class="text-center mt-8">
        <p>
          Do not have an account?
          <router-link :to="{ name: 'register' }">Sign In now</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/modules/auth'
import { useLoadingStore } from '@/stores/modules/loading'
import { ToastType } from '@/types'
import { clearObject, isObjectEmpty } from '@/utils/helper'
import { showToast } from '@/utils/toastHelper'
import { useForm } from 'vee-validate'
import { USER_ROLE } from '@/constants/user-status'
import { loginForm, messageErrorLogin } from './login.common'

const authStore = useAuthStore()
const loadingStore = useLoadingStore()
const hasEmailError = ref(false)
const router = useRouter()

const state = reactive({ ...loginForm })
const errorMsg = reactive({ ...messageErrorLogin })

const { validate, errors } = useForm()
const hasErrors = ref(false)

const setLoading = () => loadingStore.setLoading()
const removeLoading = () => loadingStore.removeLoading()

watch(errors, (newErrors) => {
  hasErrors.value = isObjectEmpty(newErrors as Record<string, string>)
})

const handleLogin = async () => {
  const { valid } = await validate()
  if (!valid) {
    return false
  }

  try {
    clearObject(errorMsg)
    await authStore.login(state)
    const currentUser = await authStore.currentUser
    const roleNumber = parseInt(currentUser.role, 10)

    switch (roleNumber) {
      case USER_ROLE.ADMIN:
        router.push({ name: 'dashboard_admin' })
        break
      case USER_ROLE.AUTHOR:
        router.push({ name: 'dashboard_author' })
        break
      case USER_ROLE.USER:
        router.push({ name: 'home' })
        break
      default:
        router.push({ name: 'login' })
    }
  } catch (error: any) {
    if (error.email) {
      errorMsg.email = error.email
      hasEmailError.value = true
    } else {
      showToast(error.message, ToastType.ERROR)
    }
  }
}

onMounted(async () => {
  setLoading()
  removeLoading()
})
</script>
