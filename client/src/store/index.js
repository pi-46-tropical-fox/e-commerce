import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index' // Vue router instance

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: localStorage.getItem('access_token') ? true : false,
    products: {},
    cart: {
      cart: []
    },
    user: localStorage.getItem('currentUser'),
    empty: false
  },
  mutations: {
    SET_LOGGEDIN(state, payload) {
      state.loggedIn = payload
    },
    SET_PRODUCT(state, payload) {
      state.products = payload
    },
    SET_CART(state, payload) {
      state.cart = payload
    },
    ADD_CART(state, payload) {
      state.cart.push(payload)
    },
    SET_USER(state, payload) {
      state.user = payload
    },
    SET_EMPTY(state, payload) {
      state.empty = payload
    }
  },
  actions: {
    register(context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: 'http://localhost:3000/auth/register',
          data: payload
        })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: 'http://localhost:3000/auth/login',
          data: payload
        })
          .then(res => {
            localStorage.setItem('access_token', res.data.access_token)
            localStorage.setItem('currentUser', payload.email)
            context.commit('SET_USER', payload.email)
            context.commit('SET_LOGGEDIN', true)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    fetchProduct(context) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: 'http://localhost:3000/product',
        })
          .then(res => {
            console.log(res)
            context.commit('SET_PRODUCT', res.data.data)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    fetchCart(context) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/cart',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(res => {
          let status = res.data.cart.filter(el => el.quantity > el.Product.stock)

          context.commit("SET_EMPTY", status.length);
          context.commit('SET_CART', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart(context, id) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `http://localhost:3000/cart/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    deleteCart(context, id) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'delete',
          url: `http://localhost:3000/cart/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    checkout() {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `http://localhost:3000/cart/checkout`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    editCart(context, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: `http://localhost:3000/cart/${payload.id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: {
            quantity: payload.qty
          }
        })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    logout(context) {
      localStorage.clear()
      context.commit('SET_LOGGEDIN', false)
      router.push('/login')
      Vue.swal.fire({
        icon: "success",
        title: "Logged Out Successfully",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
    }
  },
  modules: {
  }
})
