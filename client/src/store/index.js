import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from '../config/axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    login ({ commit }, payload) {
      axios({
        method: 'POST',
        url: '/login',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('user_email', data.email)
          router.push({ name: 'Products' })
        })
        .catch((err) => {
          console.log(err.response)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.response.data.errors[0]
          })
        })
    },
    register ({ commit }, payload) {
      axios({
        method: 'POST',
        url: '/register',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('user_email', data.email)
          router.push({ name: 'Products' })
        })
        .catch((err) => {
          console.log(err.response)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.response.data.errors[0]
          })
        })
    }
  },
  modules: {
  }
})
