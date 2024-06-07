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
              v-if="item == 'ATM Card'"
              class="ps-10 grid grid-cols-4 gap-2 cursor-pointer transition-all duration-300 ease-in overflow-hidden"
              :class="[paymentType == item ? 'max-h-[2500px] py-5' : 'max-h-0 py-0']"
            >
              <BankLabel v-for="bank in bankList" :key="bank" :bank="bank" />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-pink-500 flex-[3]">
        <div class="w-full bg-blue-400">
          Payment Info
          <table class="table-auto w-full ">
            <tbody>
              <tr class="">
                <td>Package</td>
                <td>oke</td>
              </tr>
              <tr>
                <td>Package</td>
                <td>oke</td>
              </tr>
              <tr>
                <td>Package</td>
                <td>oke</td>
              </tr>
              <tr>
                <td>Package</td>
                <td>oke</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchBankList } from '@/api/modules/common'

const items = ['Oke', 'ATM Card', 'XYZZZZ']
const active = ref(0)
const bankList = ref([])
const paymentType = ref('')

onMounted(async () => {
  await loadBankList()
})

const loadBankList = async () => {
  const response: any = await fetchBankList()
  bankList.value = response.data.data
}
</script>

<style></style>
