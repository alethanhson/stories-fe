<template>
  <div>
    <el-container>
      <el-header class="bg-dark-50 !px-0 fixed w-full z-50 [&>div>a>div>span]:text-main-primary-200">
        <DefaultHeader />
      </el-header>
      <el-main class="!px-0 !py-0 min-h-screen !pt-[60px] !flex [&>div]:w-full bg-black">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import type { ServicePackage } from '@/api/modules/servicePackage/types'
import { useUserServiceStore } from '@/stores/modules/servicePackage'
import { showToast } from '@/utils'
import { ToastType } from '@/types'

const servicePackageList = reactive<ServicePackage[]>([])
const servicePackageStore = useUserServiceStore()

onMounted(async () => {
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
</script>

<style></style>
