<template>
  <div class="sm:px-10 md:px-20 pt-20 text-white flex-1 h-full">
    <strong class="text-5xl">Choose payment method</strong>
    <p class="font-semibold text-2xl">Safe - Fast - Secure</p>

    <div class="w-full flex xl:gap-80 lg:gap-60 md:gap-20 mt-20 h-full gap-5">
      <div class="flex-[5] 2xl:ps-24 ps-0">
        <p class="font-semibold text-xl mb-4">Select a payment method</p>
        <div class="flex flex-col">
          <div v-for="(item, index) in items" :key="item" class="mb-5" @click="paymentType = item">
            <BaseSelect :isActive="index == active" @click="active = index">
              {{ item }}
            </BaseSelect>
            <div
              v-if="item == PAYMENTS.ATM"
              class="xl:ps-10 grid xl:grid-cols-4 sm:grid-cols-2 gap-2 cursor-pointer px-1 transition-all duration-300 ease-in overflow-hidden"
              :class="[paymentType == item ? 'max-h-[2500px] py-5' : 'max-h-0 py-0']"
            >
              <BankLabel
                v-for="(bank, index) in bankList"
                :key="bank"
                :bank="bank"
                :isActive="bankActive == index"
                @click="selectBank(index)"
              />
            </div>
          </div>
        </div>
      </div>

      <BillingInfomation
        :servicePackageList="servicePackageList"
        :paymentType="paymentType"
        :bankList="bankList"
        :items="items"
        :active="active"
        :bankActive="bankActive"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchBankList } from '@/api/modules/common'
import type { ServicePackage } from '@/api/modules/servicePackage/types'
import { useUserServiceStore } from '@/stores/modules/servicePackage'
import { servicePackage } from './service.common'
import { PAYMENTS } from '@/constants'

const items = [PAYMENTS.STRIPE, PAYMENTS.ATM]
const active = ref(0)
const bankActive = ref(0)
const bankList = reactive<any>([])
const paymentType = ref(items[0])
const serviceStore = useUserServiceStore()
const servicePackageList = reactive<ServicePackage[]>([])
const route = useRoute()
const paymentMethod = ref(parseInt(route.params.service_package_id + ''))

onMounted(async () => {
  loadBankList()
  await getServicePackage()
})
watch(
  () => serviceStore.servicePackage,
  (newV) => {
    servicePackageList.splice(0, servicePackageList.length)
    servicePackageList.push(...newV)
  }
)

const loadBankList = async () => {
  const response: any = await fetchBankList()
  bankList.push(...response.data.data)
}
const getServicePackage = async () => {
  try {
    servicePackage.value = await serviceStore.findServicePackage(paymentMethod.value)
  } catch (error) {
    console.log('error: ', error)
  }
}
const selectBank = (index) => {
  bankActive.value = index
  window.scrollTo(0, 0)
}
</script>

<style></style>
