import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://hidden-beyond-78655.herokuapp.com'
})

export default instance
