<template>
  <div class="text-white">
    <div class="w-full relative">
      <div class="w-full overflow-hidden h-64 flex items-center">
        <img :src="coverImg" class="w-full object-cover h-full" alt="" />
      </div>
      <div
        class="w-full max-w-full h-[99%] bg-[#0000005d] absolute top-0 px-4 sm:px-10 md:px-20 pb-10 flex flex-col-reverse"
      >
        <div>
          <strong class="text-5xl">Service Packages</strong>
          <p class="font-semibold mt-1">
            Listen and read more than 20,000 contents in the member book store (Excluding the Oak
            Store book store and retail books)
          </p>
        </div>
      </div>
    </div>

    <div
      class="bg-gradient-to-r from-purple-500 to-pink-500 w-full min-h-screen py-10 px-4 sm:px-10 md:px-20"
    >
      <div>
        <p class="font-bold text-4xl">Popular packages</p>
        <p class="font-semibold mt-2">Use a bank account, momo wallet or vnpay wallet</p>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 mt-10">
          <template v-for="item in servicePopularList" :key="item.id">
            <BasePackage :servicePackage="item"
          /></template>
        </div>
      </div>

      <div class="mt-10">
        <p class="font-bold text-4xl">Other packages</p>
        <p class="font-semibold mt-2">Use a bank account, momo wallet or vnpay wallet</p>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 mt-10">
          <template v-for="item in servicePackageList" :key="item.id">
            <BasePackage :servicePackage="item"
          /></template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import coverImg from '@/assets/images/cover_img.png'
import { fetchServicePopular } from '@/api/modules/servicePackage'
import type { ServicePackageResponse, ServicePackage } from '@/api/modules/servicePackage/types'
import { useUserServiceStore } from '@/stores/modules/servicePackage'
import { showToast } from '@/utils'
import { ToastType } from '@/types'

const servicePackageList = reactive<ServicePackage[]>([])
const servicePopularList = reactive<ServicePackage[]>([])
const servicePackageStore = useUserServiceStore()

onMounted(async () => {
  fetchServicePackageListPopular()
  await fetchServicePackageList()
})

const fetchServicePackageList = async () => {
  try {
    await servicePackageStore.fetchServicePackage()
    servicePackageList.push(...servicePackageStore.getServicePackage)
  } catch (error) {
    showToast('error', ToastType.ERROR)
  }
}
const fetchServicePackageListPopular = async () => {
  const { data }: ServicePackageResponse = await fetchServicePopular()
  servicePopularList.push(...data)
}
</script>

<style></style>
