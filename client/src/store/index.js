import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from '../config/axios'

export default new Vuex.Store({
  state: {
    access_token : localStorage.getItem('access_token'),
    products : [],
    cart : []
  },
  mutations: {
    "UPDATE_ACCESS_TOKEN"(state, access_token){
      state.access_token = access_token
      localStorage.setItem('access_token', access_token)
    },
    "UPDATE_PRODUCTS"(state, data){
      state.products = data
    },
    "UPDATE_CART"(state, data){
      state.cart = data
    },
    "REMOVE_ITEM_FROM_CART"(state, id){
      state.cart = state.cart.filter(e => e.id !== id)
    },
    "ADD_ITEM_TO_CART"(state, data){
      state.cart.push(data)
    },
    "EMPTY_CART"(state, data){
      state.cart = []
    },
    "UPDATE_CART_QUANTITY_BY_ID"(state, data){
      let index = state.cart.findIndex(e => e.id === data.id)

      state.cart[index].quantity = data.quantity
    },
    "LOGOUT"(state, data){
      localStorage.clear()
      state.access_token = ''
      state.products = []
      state.cart = []
    }
  },
  actions: {
    login({commit}, data){
      return axios.post('/user/login', data).then(res => {
       commit('UPDATE_ACCESS_TOKEN', res.data.access_token)  
      })
    },
    logout({commit}){
      commit('LOGOUT')
    },
    register({commit}, data){
      return axios.post('/user/register', data)
    },
    fetchProducts({commit,state}){
      return axios.get('/products', { headers : { access_token : state.access_token }}).then(res => {
        commit('UPDATE_PRODUCTS', res.data)
      })
    },
    addToCart({commit, state}, data){
      return axios.post('/cart', { productId : data.id, quantity : data.quantity }, { headers : { access_token : state.access_token } }).then(res => {
        console.log(res.data)
        commit("ADD_ITEM_TO_CART", res.data)
      })
    },
    deleteFromCart({commit, state}, cartId){
      return axios.delete(`/cart/${cartId}`, { headers : { access_token : state.access_token }}).then(() => {
        commit("REMOVE_ITEM_FROM_CART", cartId)
      })
    },
    fetchCart({commit, state}){
      return axios.get('/cart', { headers : { access_token : state.access_token } }).then(res => {
        commit('UPDATE_CART', res.data)
      })
    },
    updateQuantity({commit, state}, data){
      return axios.put(`/cart/${data.id}`, { id : data.id, quantity : data.quantity }, { headers : { access_token : state.access_token }}).then(res => {
        console.log('halo')
        commit("UPDATE_CART_QUANTITY_BY_ID", { quantity : data.quantity, id : data.id })
      })
    },
    checkout({commit, state}){
      return axios.post('/cart/checkout', {}, { headers : { access_token : state.access_token } }).then(res => {
        commit("EMPTY_CART", res.data)
      })
    }
  },
  modules: {
  }
})
