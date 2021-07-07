import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://ecommerce-cms-ida-bagus.herokuapp.com'
})

export default instance
