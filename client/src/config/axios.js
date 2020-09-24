import axios from 'axios'

const host = 'http://localhost:3457'
const port = null

const instance = axios.create({
    baseURL: `${host}${port ? `:${port}` : ''}`
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