import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'
import swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    history: []
  },
  mutations: {
    SET_PRODUCT (state, data) {
      state.products = data
    },
    SET_CART (state, data) {
      state.carts = data
    },
    SET_HISTORY (state, data) {
      state.history = data
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      axios({
        method: 'GET',
        url: '/products'
      })
        .then(({ data }) => {
          commit('SET_PRODUCT', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    login ({ commit }, payload) {
      axios({
        method: 'POST',
        url: '/login',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          router.push({ name: 'Product' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    register ({ commit }, payload) {
      axios({
        method: 'POST',
        url: '/register',
        data: payload
      })
        .then(({ data }) => {
          router.push('/login')
        })
        .catch(err => {
          console.log(err)
        })
    },
    addCart ({ commit }, id) {
      axios({
        method: 'POST',
        url: `/carts/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          swal.fire('success adding to the cart')
          router.push({ name: 'Product' })
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
    removeCart ({ commit }, id) {
      console.log(`remove`)
      axios({
        method: 'DELETE',
        url: `/carts/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          router.push({ name: 'Product' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    buy ({ commit }, payload) {
      axios({
        method: 'POST',
        url: `/purchase/${payload.ProductId}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: payload
      })
        .then(({ data }) => {
          console.log(data,'buy')
        })
        .then(err => {
          console.log(err)
        })
    },
    changeQuantity ({ commit }, id) {
      console.log('change',id)
      axios({

        method: 'PUT',
        url: `/carts/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log('success')
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchHistory({commit}){
      axios({
        method:'GET',
        url:'/purchase',
        headers:{
          access_token:localStorage.getItem('access_token')
        }
      })
      .then(({data})=>{
        commit('SET_HISTORY',data)
      })
      .catch(err=>{
        console.log(err)
      })
    }
  },
  modules: {
  }
})
