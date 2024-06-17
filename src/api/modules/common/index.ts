import axios from 'axios'

export const fetchBankList = () => {
  return axios.get('https://api.vietqr.io/v2/banks')
}
