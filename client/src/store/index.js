import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios.js'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: localStorage.email,
    loadingStatus: false,
    products: [],
    selectedProduct: {},
    carts: [],
    banners: [],
    total: 0
  },
  mutations: {
    setLoadingStatus (state, payload) {
      state.loadingStatus = payload
    },
    setProducts (state, payload) {
      state.products = payload
    },
    setUserEmail (state) {
      state.user = localStorage.email
    },
    setSelectedProduct (state, payload) {
      state.selectedProduct = payload
    },
    setCarts (state, payload) {
      state.carts = payload
    },
    setBanners (state, payload) {
      state.banners = payload
    },
    setTotal (state,payload) {
      state.total += payload
    }

  },
  actions: {
    login ({ commit }, payload) {
      commit('setLoadingStatus', true)
      axios({
        url: '/login',
        method: 'POST',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('email', data.email)
          router.push('/')
        })
        .finally(() => {
          commit('setLoadingStatus', false)
        })
    },
    register ({ commit }, payload) {
      payload.role = 'Customer'
      commit('setLoadingStatus', true)
      axios({
        url: '/register',
        method: 'POST',
        data: payload
      })
        .then(({ data }) => {
          Swal.fire(
            'Successfully registered!',
            "Let's shopping!",
            'success'
          )
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('email', data.email)
          router.push('/')
        })
        .finally(() => {
          commit('setLoadingStatus', false)
        })
    },
    fetchProducts ({ commit }) {
      commit('setLoadingStatus', true)
      axios({
        url: '/products',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('setProducts', data.products)
          commit('setUserEmail')
        })
        .finally(() => {
          commit('setLoadingStatus', false)
        })
    },
    getProduct ({ commit }, payload) {
      commit('setLoadingStatus', true)
      axios({
        url: `/products/${payload}`,
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('setSelectedProduct', data)
        })
        .finally(() => {
          commit('setLoadingStatus', false)
        })
    },
    addToCart ({ commit }, payload) {
      axios({
        url: `/products/${payload}/cart`,
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Success Add To Cart!',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .finally(() => {
          commit('setLoadingStatus', false)
        })
    },
    fetchCarts ({ commit }, payload) {
      commit('setLoadingStatus', true)
      axios({
        url: '/carts',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('setCarts', data)
        })
        .finally(() => {
          commit('setLoadingStatus', false)
        })
    },
    deleteCart ({ commit }, payload) {
      axios({
        url: `carts/${payload}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    addOne ({ commit }, payload) {
      axios({
        url: `carts/${payload}/add`,
        method: 'PUT',
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    removeOne ({ commit }, payload) {
      axios({
        url: `carts/${payload}/sub`,
        method: 'PUT',
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    fetchBanners ({ commit }, payload) {
      axios({
        url: '/banners',
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('setBanners', data)
        })
    }
  },
  modules: {
  }
})
