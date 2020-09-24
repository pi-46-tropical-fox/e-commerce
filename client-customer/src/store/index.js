import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios.js'
import router from '../router'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    products: [],
    cartItems: [],
    totalCartQuantity: 0
  },
  mutations: {
    setProduct (state, payload) {
      state.products = payload
    },
    setCartItems (state, payload) {
      state.cartItems = payload
    },
    filterCartItems (state, payload) {
      console.log('udah kefilter')
      state.cartItems = state.cartItems.filter(el => el.id != payload)
    },
    addToTotalQuantity (state, payload) {
      state.totalCartQuantity += 1
      console.log('berhasil menambahkan total quaituty')
    },
    setTotalCartQuantity (state, payload) {
      let temp = 0
      state.cartItems.forEach(el => {
        temp += el.quantity
        console.log(el, '<<< elemtn')
        console.log(el.quantity, '<<< quantity')
      })
      state.totalCartQuantity = temp
    },
    removeFromCart (state, payload) {
      state.totalCartQuantity -= 1
    },
    clearCart (state, payload) {
      state.cartItems = []
    }
  },
  actions: {
    registerClient (context, payload) {
      axios({
        url: '/register',
        method: 'POST',
        data: payload
      })
        .then(response => {
          alertify.dialog('alert').set({ transition: 'flipx', message: 'Register Succeeded' }).show()
          router.push({ path: '/login' })
        })
        .catch(err => {
          console.log(err, '<<error axios')
          alertify.dialog('alert').set({ transition: 'flipx', message: 'This email has been registered.' }).show()
        })
    },
    loginClient (context, payload) {
      axios({
        url: '/login',
        method: 'POST',
        data: payload
      })
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token)
          router.push({ path: '/home' })
        })
        .catch(err => {
          console.log(err, '<<error axios')
          alertify.dialog('alert').set({ transition: 'flipx', message: 'Email or Password is invalid' }).show()
        })
    },
    fetchProducts (context) {
      axios({
        method: 'GET',
        url: '/product',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data, '<<< data dari fetch products')
          context.commit('setProduct', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart (context, payload) {
      axios({
        url: `/item/${payload}`,
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          context.commit('addToTotalQuantity')
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeOne (context, payload) {
      axios({
        url: `/item/${payload}`,
        method: 'PATCH',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          context.commit('removeFromCart', payload)
        })
        .catch(err => {
          alertify.dialog('alert').set({ transition: 'flipx', message: 'Email or Password is invalid' }).show()
        })
    },
    fetchItems (context) {
      axios({
        method: 'GET',
        url: '/item',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setCartItems', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeItems (context, payload) {
      axios({
        method: 'DELETE',
        url: `/item/${payload}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('filterCartItems', payload)
          context.commit('setTotalCartQuantity', payload)
        })
        .catch(err => {
          console.log(err)
        })
    },
    checkout (context, payload) {
      axios({
        url: '/item',
        method: 'PUT',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: payload
      })
        .then(response => {
          console.log(payload, '<< ini checkout')
          context.commit('clearCart')
          context.dispatch('fetchProducts')
        })
        .catch(err => {
          console.log(err, '<< ini checkout err')
        })
    }

  },
  modules: {
  }
})
