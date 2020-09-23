import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    products: [],
    banners: [],
    carts: [],
    wishlists: []
  },
  mutations: {
    SET_LOGIN (state, data) {
      state.isLogin = data
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_BANNERS (state, payload) {
      state.banners = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    },
    SET_WISHLISTS (state, payload) {
      state.wishlists = payload
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
          console.log(data, '<register di vuex ni')
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
          console.log(data.role, '<di vuex ni')
          localStorage.setItem('access_token', data.access_token),
          localStorage.setItem('UserId', data.id)
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
      return axios({
        method: 'GET',
        url: 'http://localhost:3001/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          return context.commit('SET_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    fetchBanners (context) {
      console.log('di store banner')
      return axios({
        method: 'GET',
        url: 'http://localhost:3001/banners',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_BANNERS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    fetchCarts (context) {
      console.log('fetchCarts di store carts')
      return axios({
        method: 'GET',
        url: 'http://localhost:3001/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          return context.commit('SET_CARTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    addCart (context, id) {
      axios({
        method: 'POST',
        url: `http://localhost:3001/carts/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          return data
        })
        .catch(err => {
          console.log(err.errors)
        })
    },

    deleteCart (context, id) {
      axios({
        method: 'DELETE',
        url: `http://localhost:3001/carts/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data, '<< ini delete cart di store')
        })
        .catch(err => {
          console.log(err)
        })
    },

    checkout (context) {
      axios({
        method: 'GET',
        url: 'http://localhost:3001/carts/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data, '<< ini checkout di store')
        })
        .catch(err => {
          console.log(err)
        })
    },

    fetchWishlists (context) {
      return axios({
        method: 'GET',
        url: 'http://localhost:3001/wishlists',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          return context.commit('SET_WISHLISTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    deleteWishlist (context, id) {
      axios({
        method: 'DELETE',
        url: `http://localhost:3001/wishlists/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data, '<< ini delete wishlist di store')
        })
        .catch(err => {
          console.log(err)
        })
    },

    addWishlist (context, productId) {
      axios({
        method: 'POST',
        url: `http://localhost:3001/wishlists/${productId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          return data
        })
        .catch(err => {
          console.log(err.errors)
        })
    },

  }
})
