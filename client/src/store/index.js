import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: []
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setCarts (state, payload) {
      state.carts = payload
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      axios({
        method: 'GET',
        url: '/products'
      })
        .then(({ data }) => {
          commit('setProducts', data)
        }).catch((err) => {
          console.log(err)
        })
    },
    loginSubmit ({ commit }, payload) {
      axios({
        method: 'POST',
        url: '/login',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          Swal.fire(
            'Success!',
            'Logged In!',
            'success'
          )
          router.push('/')
        }).catch((err) => {
          console.log(err)
        })
    },
    registerSubmit ({ commit }, payload) {
      axios({
        method: 'POST',
        url: '/register',
        data: payload
      })
        .then(({ data }) => {
          Swal.fire(
            'Success!',
            'Created your account!',
            'success'
          )
        }).catch((err) => {
          console.log(err)
        })
    },
    addCart ({ commit }, payload) {
      console.log(payload, '<<<< ini di store')
      axios({
        method: 'POST',
        url: `/carts/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          Swal.fire(
            'Success!',
            'Added product to your cart!',
            'success'
          )
          console.log(data)
        }).catch((err) => {
          console.log(err)
        })
    },
    getCart ({ commit }) {
      axios({
        method: 'GET',
        url: '/carts',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('setCarts', data)
        }).catch((err) => {
          console.log(err)
        })
    },
    deleteCart ({ commit }, payload) {
      axios({
        method: 'DELETE',
        url: `/carts/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          Swal.fire(
            'Success!',
            'Deleted product from your cart!',
            'success'
          )
          this.dispatch('getCart')
        }).catch((err) => {
          console.log(err)
        })
    },
    checkoutCart ({ commit }, payload) {
      axios({
        method: 'POST',
        url: '/checkout',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          Swal.fire(
            'Success!',
            'TRANSACTION SUCCESS!',
            'success'
          )
          this.dispatch('getCart')
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
