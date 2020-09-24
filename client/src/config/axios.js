import axios from 'axios'

const instances = axios.create({
  baseURL: 'https://e-commerce-cms-izra.herokuapp.com'
})

export default instances