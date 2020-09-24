import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    cartsId: [],
    total: 0
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setCarts (state, payload) {
      state.carts = payload
      state.cartsId = []
      state.total = 0
      for (let i = 0; i < payload.length; i++) {
        state.cartsId.push(payload[i].id)
        state.total += payload[i].product.price * payload[i].quantity
      }
    }
  },
  actions: {
    login ({ commit }, data) {
      return axios({
        method: 'POST',
        url: '/login',
        data: data
      })
    },
    register ({ commit }, data) {
      return axios({
        method: 'POST',
        url: '/register',
        data: data
      })
    },
    fetchProducts ({ commit }) {
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('setProducts', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    fetchCarts ({ commit }) {
      axios({
        method: 'GET',
        url: '/cart',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('setCarts', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addCart ({ commit }, id) {
      axios({
        method: 'POST',
        url: `/cart/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data.message)
        })
        .catch()
    },
    checkout ({ commit }, cartsId) {
      return axios({
        method: 'PUT',
        url: '/cart',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: { cartsId }
      })
    },
    removeCart ({ commit }, id) {
      return axios({
        method: 'DELETE',
        url: `/cart/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    }
  },
  modules: {
  }
})
