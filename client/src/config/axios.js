import axios from 'axios'

// const host = 'https://rgb-commerce.herokuapp.com'
const host = 'http://localhost:3457'

const instance = axios.create({
    baseURL: host
})

instance.interceptors.request.use(config => {
    NProgress.start()

    return config
})

instance.interceptors.response.use(response => {
    NProgress.done()

    return response
})

export default instance