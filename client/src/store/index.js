import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: '',
    productMaster: [],
    products: [],
    carts: [],
    carts_count: 0,
    qtyAman: true
  },
  mutations: {
    SET_IS_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_PRODUCT_MASTER (state, payload) {
      state.productMaster = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    },
    SET_CARTS_COUNT (state, payload) {
      state.carts_count += payload
    },
    SET_ADD_CART (state, payload) {
      // state.carts.push(payload)
      if (state.carts.length < 1) {
        state.carts.push(payload)
      } else if (!payload.id) {
        console.log('gak nambah')
      } else {
        state.carts.push(payload)
        console.log('nambah')
      }
    },
    SET_ADD_QTY (state, payload) {
      state.carts.forEach(el => {
        if (el.id === +payload) {
          el.qty = el.qty + 1
        }
      })
    },
    SET_REDUCE_QTY (state, payload) {
      state.carts.forEach(el => {
        if (el.id === +payload) {
          el.qty = el.qty - 1
        }
      })
    },
    SET_ADD_PRICE (state, payload) {
      state.carts.forEach(el => {
        if (el.id === +payload) {
          el.price = el.price + el.Product.price
        }
      })
    },
    SET_REDUCE_PRICE (state, payload) {
      state.carts.forEach(el => {
        if (el.id === +payload) {
          el.price = el.price - el.Product.price
        }
      })
    },
    SET_DELETE_CART (state, payload) {
      state.carts = state.carts.filter(cart => cart.id !== payload)
    },
    SET_SPORT (state, payload) {
      console.log('masuk mutation')
      state.products = payload
    },
    SET_CASUAL (state, payload) {
      console.log('masuk mutation')
      state.products = payload
    },
    SET_FORMAL (state, payload) {
      console.log('masuk mutation')
      state.products = payload
    },
    SET_ALL (state, payload) {
      console.log('masuk mutation')
      state.products = payload
    },
    SET_QTY_AMAN (state, payload) {
      state.qtyAman = payload
    }
  },
  actions: {
    fetchProduct ({ commit }) {
      // console.log('masuk fetchproduct di store')
      axios({
        method: 'GET',
        url: '/product',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          // console.log(data, 'data dari database')
          commit('SET_PRODUCT_MASTER', data)
          commit('SET_PRODUCTS', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    login ({ commit }, payload) {
      // console.log('login masuk ke store')
      axios({
        method: 'POST',
        url: '/login',
        data: payload
      })
        .then(({ data }) => {
          // console.log(data)
          localStorage.setItem('access_token', data.access_token)
          commit('SET_IS_LOGIN', true)
          router.push({ path: '/product' })
          Swal.fire({
            icon: 'success',
            title: 'WELCOME',
            text: 'Happy shopping!'
          })
        })
        .catch(({ response }) => {
          const error = response.data.message
          console.log(error)
          Swal.fire(error)
        })
    },
    logout ({ commit }) {
      // console.log('masuk logout di store')
      localStorage.clear()
      commit('SET_IS_LOGIN', false)
      router.push({ path: '/' })
      Swal.fire({
        icon: 'success',
        title: 'SEE YOU',
        text: 'Have a nice day!'
      })
    },
    fetchCart ({ commit }) {
      axios({
        method: 'GET',
        url: '/cart',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_CARTS', data)
          // commit('SET_CARTS_COUNT', data.length)
        })
        .catch(({ response }) => {
          console.log(response.data.message)
        })
    },
    addCart ({ commit }, payload) {
      console.log(payload)
      axios({
        method: 'POST',
        url: `/cart/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_ADD_CART', data)
          // commit('SET_CARTS_COUNT', 1)
          Swal.fire('Success add to your cart, please check your cart.')
        })
        .catch(({ response }) => {
          console.log(response.data.message)
        })
    },
    deleteCart ({ commit }, payload) {
      axios({
        method: 'DELETE',
        url: `/cart/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_DELETE_CART', payload)
        })
        .catch(({ response }) => {
          console.log(response.data.message)
        })
    },
    updateMinCart ({ commit }, payload) {
      axios({
        method: 'PUT',
        url: `/cart/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_REDUCE_QTY', payload)
          commit('SET_REDUCE_PRICE', payload)
        })
        .catch(({ response }) => {
          console.log(response.data.message)
        })
    },
    updateAddCart ({ commit }, payload) {
      axios({
        method: 'PUT',
        url: `/cart/${payload}`,
        headers: {
          access_token: localStorage.access_token,
          add: true
        }
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_ADD_QTY', payload)
          commit('SET_ADD_PRICE', payload)
        })
        .catch(({ response }) => {
          console.log(response.data.message)
        })
    },
    checkout ({ commit }, payload) {
      axios({
        method: 'DELETE',
        url: '/checkout',
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then(({ data }) => {
          console.log(data)
          commit('SET_CARTS', [])
        })
        .catch(({ response }) => {
          console.log(response.data.message)
        })
    },
    sport ({ commit }) {
      console.log('masuk store')
      const payload = this.state.productMaster.filter(product => product.category === 'sport')
      commit('SET_SPORT', payload)
    },
    casual ({ commit }) {
      console.log('masuk store')
      const payload = this.state.productMaster.filter(product => product.category === 'casual')
      commit('SET_CASUAL', payload)
    },
    formal ({ commit }) {
      console.log('masuk store')
      const payload = this.state.productMaster.filter(product => product.category === 'formal')
      commit('SET_FORMAL', payload)
    },
    all ({ commit }) {
      console.log('masuk store')
      const payload = this.state.productMaster
      commit('SET_ALL', payload)
    },
    register ({ commit }, payload) {
      axios({
        method: 'POST',
        url: '/register',
        data: payload
      })
        .then(({ data }) => {
          console.log(data)
          router.push({ path: '/' })
          Swal.fire({
            icon: 'success',
            title: 'CONGRATULATION',
            text: 'Registration was successful!'
          })
        })
        .catch(({ response }) => {
          console.log(response.data)
          Swal.fire(response.data)
        })
    },
    updateStock ({ commit }, payload) {
      axios({
        method: 'PUT',
        url: `/product/${payload.id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock
        }
      })
        .then(({ data }) => {
          console.log('update stock berhasil')
        })
        .catch(({ response }) => {
          console.log('update stok gagal')
        })
    }
  },
  modules: {
  }
})
