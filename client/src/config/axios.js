import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://mariopetokobaru.herokuapp.com/'
})

export default instance
