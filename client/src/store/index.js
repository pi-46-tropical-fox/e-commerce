import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    loginStatus: false,
    carts: [],
    history: []
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    LOGIN_STATUS (state, payload) {
      state.loginStatus = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    },
    SET_HISTORY (state, payload) {
      state.history = payload
    },
    SET_REGISTER (state, payload) {
      state.register = payload
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      axios({
        method: 'GET',
        url: 'https://agile-meadow-39887.herokuapp.com/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout ({ commit }) {
      localStorage.clear()
      commit('LOGIN_STATUS', false)
    },
    loginSubmit ({ commit }, payload) {
      axios({
        method: 'POST',
        url: 'https://agile-meadow-39887.herokuapp.com/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          // console.log(data, '<<<<<<')
          localStorage.setItem('access_token', data.access_token)
          commit('LOGIN_STATUS', true)
          router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    addCart ({ commit }, payload) {
      // console.log(payload, '<<<<< payload id')
      axios({
        method: 'POST',
        url: `https://agile-meadow-39887.herokuapp.com/carts/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          swal.fire('Success add product to your cart, please check your cart.')
          // console.log(data, 'Success add product to your cart, please check your cart.')
        })
        .catch(({ response }) => {
          console.log(response.data.message)
        })
    },
    fetchCart ({ commit }) {
      axios({
        method: 'GET',
        url: 'https://agile-meadow-39887.herokuapp.com/carts',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          // console.log(data)
          commit('SET_CARTS', data)
        })
        .catch(({ err }) => {
          console.log(err.data.message)
        })
    },
    deleteCart ({ commit }, payload) {
      // console.log(payload, '<<<<< id deleteCart')
      axios({
        method: 'DELETE',
        url: `https://agile-meadow-39887.herokuapp.com/carts/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.dispatch('fetchCart')
          return data
        })
        .catch(({ err }) => {
          console.log(err.data.message)
        })
    },
    fetchHistory ({ commit }) {
      axios({
        method: 'GET',
        url: 'https://agile-meadow-39887.herokuapp.com/purchase',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('SET_HISTORY', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    buy ({ commit }, payload) {
      // console.log(payload.id, '<<<< payload buy');
      axios({
        method: 'POST',
        url: `https://agile-meadow-39887.herokuapp.com/purchase/${payload.id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: payload
      })
        .then(({ data }) => {
          console.log(data, '<<< from buy function')
        })
        .then(err => {
          console.log(err)
        })
    },
    updateAmount ({ commit }, payload) {
      // console.log(payload, '<<< payload id updateamount')
      axios({
        method: 'PUT',
        url: `https://agile-meadow-39887.herokuapp.com/carts/${payload.id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          amount: payload.amount
        }
      })
        .then(({ data }) => {
          // console.log(data, '<<<<< Success checkout')
        })
        .catch(err => {
          console.log(err)
        })
    },
    registerSubmit ({ commit }, payload) {
      // console.log(payload, '<<<<');
      axios({
        method: 'POST',
        url: 'https://agile-meadow-39887.herokuapp.com/register',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          console.log(data, '<<<<<<')
          commit('SET_REGISTER', data)
          router.push('/login')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
