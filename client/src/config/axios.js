import axios from 'axios'
import Swal from 'sweetalert2'

const instance = axios.create({
  baseURL: 'https://ecommercehacktiv8-imam.herokuapp.com/'
})

instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  Swal.fire({
    icon: 'error',
    title: 'Error!',
    text: error.response.data.errors.join(', ')
  })
  return Promise.reject(error)
})

export default instance
