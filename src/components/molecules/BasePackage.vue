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
import { formatVND } from '@/utils'

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
    [SERVICE_PACKAGE.BASE]: 'border-green-400',
    [SERVICE_PACKAGE.PRO]: 'border-pro'
  }
}

const pricePerDay = () => {
  const sp = props.servicePackage
  return sp.price / sp.duration
}
const handleBorder = () => {
  const sp = props.servicePackage
  return style.border[sp.type]
}
</script>

<style scoped>
.border-pro {
  border: solid transparent;
  border-image: linear-gradient(to right, #ec4899, #f43f5e, #f59e0b) 1;
}
</style>
