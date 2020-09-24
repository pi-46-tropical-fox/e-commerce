import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://cms-hacktiv8.herokuapp.com'
})

export default instance
