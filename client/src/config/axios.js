import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://e-commerce-cms-faudzan.herokuapp.com'
})

export default instance
