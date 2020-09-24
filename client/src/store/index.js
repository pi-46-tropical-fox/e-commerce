import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showSidebar: false,
    isLogin: false,
    products: [],
    carts: [],
    cart: {}
  },
  mutations: {
    TOGGLE_SIDEBAR (state) {
      state.showSidebar = !state.showSidebar
    },
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_CART (state, payload) {
      state.carts = payload
    },
    SET_DELETE_CART (state, payload) {
      state.cart = payload
    }
  },
  actions: {
    toggleSidebar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    login ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: '/login',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            localStorage.setItem('access_token', data.access_token)
            commit('SET_LOGIN', true)
            Swal.fire(
              'Nice to see you again!',
              'Welcome!',
              'success'
            )
            resolve()
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      Swal.fire({
        title: 'Are you sure to logout?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, let me logout!'
      }).then((result) => {
        if (result.value) {
          localStorage.clear()
          commit('SET_LOGIN', false)
          Swal.fire('Bye', "You've been signed out", 'success')
        }
      })
    },
    register ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'POST',
          url: '/register',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            console.log(data.email)
            Swal.fire(
              'Successfully Register!',
              'Please click login instead anchor!',
              'success'
            )
            resolve()
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    fetchProducts ({ commit }) {
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log(data, 'ini di store fetch')
          commit('SET_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart ({ commit }, id) {
      console.log(id, 'id di addtocart store')
      axios({
        method: 'POST',
        url: `/carts/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          Swal.fire('Successfully added to cart', 'yeaayy!', 'success')
          console.log(data, 'ini add tocard')
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchCarts ({ commit }) {
      axios({
        method: 'GET',
        url: '/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('SET_CART', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteFromCart ({ commit }, id) {
      Swal.fire({
        title: 'Are you sure want to delete this item?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, let her go :('
      }).then(() => {
        axios({
          method: 'DELETE',
          url: `/carts/${id}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
          .then(({ data }) => {
            console.log(data, 'ini delete di store')
            commit('SET_DELETE_CART', data)
            this.dispatch('fetchCarts')
            Swal.fire('', 'Successfull deleted', 'success')
            return data
          })
          .catch(err => {
            console.log(err)
          })
      })
    }
  },
  modules: {
  }
})
