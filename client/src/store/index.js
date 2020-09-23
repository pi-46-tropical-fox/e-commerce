import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    products: [],
    isLogin: false,
    currentUser: '',
    currentProfile: {
      firstName: '',
      lastName: '',
      address: '',
      phone: ''
    },
    myCart: {
      carts: [],
      grandTotal: {
        qty: 0,
        price: 0
      }
    }
  },
  mutations: {
    setLoginStatus (state, data) {
      state.isLogin = true
      const { firstName, lastName } = data
      state.currentUser = `${firstName} ${lastName}`
      console.log(state.currentUser)
      router.push({ name: 'Products' })
    },
    setProfile (state, data) {
      const { firstName, lastName } = data
      state.currentUser = `${firstName} ${lastName}`
      state.currentProfile = data
    },
    setLogoutStatus (state, data) {
      state.categories = []
      state.products = []
      state.isLogin = false
      state.currentUser = ''
      state.currentProfile = {}
      state.myCart = {
        carts: [],
        grandTotal: {
          qty: 0,
          price: 0
        }
      }
      state.currentProfile = {
        firstName: '',
        lastName: '',
        address: '',
        phone: ''
      }
      router.push({ name: 'Home' })
    },
    setCategories (state, data) {
      state.categories = data
    },
    setProducts (state, data) {
      state.products = data
    },
    setMyCart (state, data) {
      console.log(data, '<<< cart fetched in mutation')
      state.myCart = data
    },
    updateCartQty (state, data) {
      if (data.increment) {
        state.myCart.grandTotal.qty++
        for (const cart of state.myCart.carts) {
          if (cart.ProductId === data.productId) {
            cart.qty++
            state.myCart.grandTotal.price += cart.Product.price
            break
          }
        }
      } else {
        state.myCart.grandTotal.qty--
        for (const cart of state.myCart.carts) {
          if (cart.ProductId === data.productId) {
            cart.qty--
            state.myCart.grandTotal.price -= cart.Product.price
            break
          }
        }
      }
    },
    updateMyCart (state, productId) {
      for (const cart of state.myCart.carts) {
        if (cart.ProductId === productId) {
          state.myCart.grandTotal.qty -= cart.qty
          state.myCart.grandTotal.price -= (cart.qty * cart.Product.price)
          break
        }
      }
      state.myCart.carts = state.myCart.carts.filter(cart => cart.ProductId !== productId)
    },
    clearMyCart (state, data) {
      state.myCart = {
        carts: [],
        grandTotal: {
          qty: 0,
          price: 0
        }
      }
      router.push({ name: 'Products' })
    }
  },
  actions: {
    loginAccount ({ commit }, payload) {
      axios({
        url: '/login',
        method: 'POST',
        data: payload
      })
        .then(({ data }) => {
          Swal.fire(
            'Login success!',
            `Welcome ${data.firstName} ${data.lastName}!`,
            'success'
          )
          localStorage.setItem('access_token', data.access_token)
          console.log(data)
          commit('setLoginStatus', data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.errors.join(', ')}`
          })
        })
    },
    registerAccount ({ commit }, payload) {
      axios({
        url: '/register',
        method: 'POST',
        data: payload
      })
        .then(({ data }) => {
          Swal.fire(
            'Register success!',
            `Welcome ${data.firstName} ${data.lastName}!`,
            'success'
          )
          localStorage.setItem('access_token', data.access_token)
          console.log(data)
          commit('setLoginStatus', data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.errors.join(', ')}`
          })
        })
    },
    logoutAccount ({ commit }) {
      Swal.fire(
        'Logout success!',
        '',
        'success'
      )
      localStorage.clear()
      commit('setLogoutStatus')
    },
    fetchCategory ({ commit }) {
      axios({
        method: 'GET',
        url: '/categories',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('setCategories', data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.errors.join(', ')}`
          })
        })
    },
    fetchProduct ({ commit }) {
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('setProducts', data)
          console.log(data, '<<< products fetched')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.errors.join(', ')}`
          })
        })
    },
    fetchCart ({ commit }) {
      axios({
        method: 'GET',
        url: '/carts',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data, '<<< cart fetched in store')
          commit('setMyCart', data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.errors.join(', ')}`
          })
        })
    },
    fetchProfile ({ commit }) {
      axios({
        method: 'GET',
        url: '/profile',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          commit('setProfile', data)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.errors.join(', ')}`
          })
        })
    },
    addToCart ({ commit }, productId) {
      axios({
        method: 'POST',
        url: `/carts/${productId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          Swal.fire(
            `${data.message}`,
            '',
            'success'
          )
          commit('updateCartQty', { productId, increment: true })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.errors.join(', ')}`
          })
        })
    },
    decrementQty ({ commit }, productId) {
      axios({
        method: 'PUT',
        url: `/carts/${productId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          Swal.fire(
            `${data.message}`,
            '',
            'success'
          )
          commit('updateCartQty', { productId, increment: false })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.errors.join(', ')}`
          })
        })
    },
    removeCart ({ commit }, productId) {
      axios({
        method: 'DELETE',
        url: `/carts/${productId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          Swal.fire(
            `${data.message}`,
            '',
            'success'
          )
          commit('updateMyCart', productId)
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.errors.join(', ')}`
          })
        })
    },
    payNow ({ commit }) {
      axios({
        method: 'POST',
        url: '/checkout',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          Swal.fire(
            `${data.message}`,
            '',
            'success'
          )
          commit('clearMyCart')
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data.errors.join(', ')}`
          })
        })
    }
  },
  modules: {
  }
})
