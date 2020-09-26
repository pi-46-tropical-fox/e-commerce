import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginStatus: false,
    products: null,
    selectedProduct: null,
    cart: null
  },
  mutations: {
    CHANGE_LOGIN_STATUS (state, payload) {
      state.loginStatus = payload
    },
    UPDATE_PRODUCTS (state, payload) {
      state.products = payload
    },
    UPDATE_SELECTED_PRODUCT (state, payload) {
      state.selectedProduct = payload
    },
    UPDATE_CART (state, payload) {
      state.cart = payload
    }
  },
  actions: {
    register (context, payload) {
      return axios({
        method: 'post',
        url: 'https://e-commerce-alftirta.herokuapp.com/users/register',
        data: payload
      })
    },
    login (context, payload) {
      return axios({
        method: 'post',
        url: 'https://e-commerce-alftirta.herokuapp.com/users/login',
        data: payload
      })
    },
    fetchProducts (context, payload) {
      return axios({
        method: 'get',
        url: 'https://e-commerce-alftirta.herokuapp.com/products',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          context.commit('UPDATE_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateProducts (context, payload) {
      return axios({
        method: 'put',
        url: `https://e-commerce-alftirta.herokuapp.com/products/${payload.id}`,
        headers: { access_token: localStorage.getItem('access_token') },
        data: payload
      })
    },
    addToCart (context, payload) {
      return axios({
        method: 'post',
        url: 'https://e-commerce-alftirta.herokuapp.com/carts',
        headers: { access_token: localStorage.getItem('access_token') },
        data: payload
      })
    },
    fetchCart (context, payload) {
      return axios({
        method: 'get',
        url: 'https://e-commerce-alftirta.herokuapp.com/carts',
        headers: { access_token: localStorage.getItem('access_token') }
      })
    },
    updateCart (context, payload) {
      return axios({
        method: 'put',
        url: `https://e-commerce-alftirta.herokuapp.com/carts/${payload.id}`,
        headers: { access_token: localStorage.getItem('access_token') },
        data: {
          quantity: payload.quantity,
          status: payload.status
        }
      })
    },
    deleteCart (context, payload) {
      return axios({
        method: 'delete',
        url: `https://e-commerce-alftirta.herokuapp.com/carts/${payload.id}`,
        headers: { access_token: localStorage.getItem('access_token') }
      })
    }
  },
  modules: {
  }
})
