import axios from '@/api/axios'
import { PackageType } from '@/constants'
import router from '@/router'
import { useAuthStore } from '@/stores/modules/auth'
import Swal from 'sweetalert2'

export async function checkRoleService(to, from) {
  const authStore = useAuthStore()
  const idChapter = to.params.id_chapter
  const typeServiceOfUser = authStore.isLoggedIn && authStore.currentUser.service_package?.type

  const url = `/check-service/${idChapter}/${typeServiceOfUser || ''}`

  const response = await axios.get(url)

  if (!response.status) {
    if (!authStore.isLoggedIn && response.data.package_type != PackageType.FREE) {
      router.push({ name: 'login' })
      return
    }
    Swal.fire({
      title: 'You need to register for the service to be able to read this story!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Okeeee!'
    }).then((result) => {
      if (result.isConfirmed) {
        router.push({ name: 'service-package' })
      } else if (!from.name) {
        router.push({ name: 'home' })
      }
    })

    return false
  }
}
