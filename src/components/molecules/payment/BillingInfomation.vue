<template>
  <div class="flex-[3]">
    <div class="w-full bg-[#0f0f0f] p-5 rounded-lg">
      <span class="text-xl">Billing Information</span>
      <table
        class="table-auto w-full [&>tbody>tr>td]:p-3 [&>tbody>tr>td:first-child]:w-[170px] [&>tbody>tr>td:first-child]:text-gray-400"
      >
        <tbody>
          <tr class="">
            <td>Product</td>
            <td>
              <el-select
                v-model="paymentPackage"
                filterable
                remote
                reserve-keyword
                placeholder="Please enter a keyword"
                remote-show-suffix
                :remote-method="remoteMethod"
                :loading="loading"
                class="!w-[240px] !rounded-md [&>div]:!rounded-xl [&>div]:bg-black [&>div>div>div>span]:text-white"
              >
                <el-option
                  v-for="item in options"
                  :key="item.service_package_name"
                  :label="item.service_package_name"
                  :value="item.id"
                  @click="servicePackage = item"
                />
              </el-select>
            </td>
          </tr>
          <tr>
            <td>Price</td>
            <td>{{ formatVND(servicePackage.price) }}</td>
          </tr>
          <tr>
            <td>Payment Methods</td>
            <td>{{ paymentType }}</td>
          </tr>
          <tr>
            <td class="!text-white text-2xl">Total</td>
            <td>{{ formatVND(servicePackage.price) }}</td>
          </tr>
        </tbody>
      </table>
      <el-button
        @click="handlePayment"
        round
        class="w-full !bg-main-primary-500 !border-none !text-white"
        >Pay</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatVND, showToast } from '@/utils'
import { ToastType } from '@/types'
import type {
  ServicePackage,
  paymentForm,
  PaymentResponse
} from '@/api/modules/servicePackage/types'
import { servicePackage } from '@/views/servicePackage/service.common'
import { paymentApi } from '@/api/modules/servicePackage'

const props = defineProps({
  servicePackageList: {
    type: Array as PropType<ServicePackage[]>,
    default: () => []
  },
  paymentType: {
    type: String,
    default: ''
  },
  bankList: {
    type: Array as PropType<any>,
    default: () => []
  },
  items: {
    type: Array as PropType<any>,
    default: () => []
  },
  bankActive: {
    type: Number,
    default: 0
  },
  active: {
    type: Number,
    default: 0
  }
})

const route = useRoute()
const paymentPackage = ref(parseInt(route.params.service_package_id + ''))
const loading = ref(false)
const options = ref<ServicePackage[]>([])

const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      options.value = props.servicePackageList.filter((item) => {
        return item.service_package_name.toLowerCase().includes(query.toLowerCase())
      })
    }, 200)
  } else {
    options.value = []
  }
}
const handlePayment = async () => {
  try {
    const payload: paymentForm = {
      bankCode: props.bankList[props.bankActive].shortName,
      amount: servicePackage.value.price,
      gateway: props.items[props.active],
      id: servicePackage.value.id
    }
    const response: PaymentResponse = await paymentApi(payload)

    if (response.code == 200) {
      window.location.href = response.payment_url
    }
  } catch (error: any) {
    showToast(error.message, ToastType.ERROR)
  }
}
</script>

<style></style>
