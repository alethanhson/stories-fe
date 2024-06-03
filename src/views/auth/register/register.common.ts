import type { FormRegister } from '@/api/modules/auth/types'

export const userForm: FormRegister = reactive({
  email: '',
  username: '',
  password: '',
  full_name: ''
})
