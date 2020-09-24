import axios from 'axios'

const instances = axios.create({
  baseURL: 'https://e-commerce-cms-izra.herokuapp.com'
  // baseURL: 'http://localhost:3000'
})

export default instances