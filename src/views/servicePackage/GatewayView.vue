<template>
  <div class="sm:px-10 md:px-20 pt-20 bg-black text-white min-h-[calc(100vh-3.74rem)]">
    <strong class="text-5xl">Choose payment method</strong>
    <p class="font-semibold text-2xl">Safe - Fast - Secure</p>

    <div class="w-full flex gap-80 mt-20 h-full">
      <div class="flex-[2] ps-52 h-64">
        <p class="font-semibold text-xl mb-4">Select a payment method</p>
        <div class="flex flex-col gap-5">
          <template v-for="(item, index) in items" :key="item">
            <BaseSelect :isActive="index == active" @click="active = index">
              {{ item }}
            </BaseSelect>
            <div v-if="item == 'ATM Card'" class="ps-20 grid grid-cols-4 py-5 gap-2 cursor-pointer">
              <BankLabel v-for="bank in bankList" :key="bank" :bank="bank" />
            </div>
          </template>
        </div>
      </div>

      <div class="bg-pink-500 flex-1">b</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchBankList } from '@/api/modules/common'

const items = ['ATM Card', 'ABCCCC', 'XYZZZZ']
const active = ref(0)
let bankList = reactive([])

onMounted(() => {
  loadBankList()
})

const loadBankList = async () => {
  const response: any = await fetchBankList()
  bankList = response.data.data
  console.log('bankList: ', bankList)
}
</script>

<style></style>
