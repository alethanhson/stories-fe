<template>
  <div
    :class="[
      'border-[3px]',
      handleBorder(),
      isBorder ? '' : 'hover:border-main-primary-400 hover:border'
    ]"
    class="relative flex justify-between flex-col items-center z-10 p-8 py-12"
  >
    <p class="text-2xl font-bold">{{ servicePackage.service_package_name }}</p>

    <div class="flex flex-col items-center mt-7 text-xl w-full">
      <p class="font-semibold text-3xl">{{ formatVND(servicePackage.price) }}</p>
      <span class="text-base">{{ formatVND(pricePerDay()) }} / day</span>
      <router-link
        :to="{ name: 'gateway', params: { service_package_id: servicePackage.id } }"
        class="w-full"
      >
        <el-button
          type="primary"
          round
          class="mt-3 font-semibold bg-main-primary-300 px-4 py-2 w-full rounded-3xl hover:bg-main-primary-400"
          >Buy
        </el-button>
      </router-link>
    </div>
    <div
      v-if="tag"
      class="absolute top-0 left-1/2 -translate-x-1/2 px-6 pb-1 rounded-b-lg font-semibold"
      :class="[
        servicePackage.type == SERVICE_PACKAGE.PRO ? 'bg-gradient-to-r-custom' : 'bg-green-400'
      ]"
    >
      {{ tag }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { SERVICE_PACKAGE } from '@/constants'
import { ToastType } from '@/types'
import { showToast } from '@/utils'
import { useUserServiceStore } from '@/stores/modules/servicePackage'
import { useAuthStore } from '@/stores/modules/auth'
import type {
  RegisterServiceForm,
  RegisterServiceResponse
} from '@/api/modules/servicePackage/types'

const userServiceStore = useUserServiceStore()
const userStore = useAuthStore()

const props = defineProps({
  isBorder: {
    type: Boolean,
    default: true
  },
  border: {
    type: String,
    default: 'pro'
  },
  tag: {
    type: String,
    default: 'Popular'
  },
  servicePackage: {
    type: Object,
    default: () => ({})
  }
})

const style = {
  border: {
    base: 'border-green-400',
    pro: 'border-pro'
  }
}

const registerServiceForm = reactive<RegisterServiceForm>({
  // user_id: userStore.currentUser.id,
  user_id: 2,
  service_package_id: props.servicePackage.id
})

const formatVND = (vnd: number) => {
  return vnd.toLocaleString('vi', { style: 'currency', currency: 'VND' })
}
const pricePerDay = () => {
  const sp = props.servicePackage
  return sp.price / sp.duration
}
function handleBorder() {
  const sp = props.servicePackage
  if (sp.type == SERVICE_PACKAGE.BASE) {
    return style.border.base
  } else if (sp.type == SERVICE_PACKAGE.PRO) {
    return style.border.pro
  }
}
async function registerService() {
  try {
    const userService: RegisterServiceResponse =
      await userServiceStore.registerService(registerServiceForm)
    if (userService) showToast(userService.message, ToastType.SUCCESS)
  } catch (error: any) {
    showToast(error.message, ToastType.ERROR)
  }
}
</script>

<style scoped>
.border-pro {
  border: solid transparent;
  border-image: linear-gradient(to right, #ec4899, #f43f5e, #f59e0b) 1;
}
</style>
