import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: []
  },
  mutations: {
    SET_LOGIN (state, data) {
      state.isLogin = data
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    }
  },
  actions: {
    register (context, payload) {
      axios({
        method: 'POST',
        url: 'http://localhost:3001/register',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          console.log(data, "<register di vuex ni")
        })
        .catch(err => {
          console.log(err)
        })
    },

    login (context, payload) {
      axios({
        method: 'POST',
        url: 'http://localhost:3001/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then(({ data }) => {
          console.log(data.role, "<di vuex ni")
          localStorage.setItem('access_token', data.access_token)
          context.commit('SET_LOGIN', true)
        })
        .catch(err => {
          console.log(err)
        })
    },

    logout (context) {
      localStorage.clear()
      context.commit('SET_LOGIN', false)
      context.commit('SET_PRODUCTS', '')
    },

    fetchProducts (context) {
      axios({
        method: 'GET',
        url: 'http://localhost:3001/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },


  }
})
