import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    productById: {},
    isLogin: false,
    email: '',
    cart: []
  },
  mutations: {
    GET_PRODUCTS(state,payload) {
      state.products = payload
    },
    GET_BY_ID_PRODUCTS(state,payload) {
      state.productById = payload
    },
    IS_LOGIN(state,payload) {
      state.isLogin = true
      state.email = payload.email
    },
    IS_LOGOUT(state) {
      state.isLogin = false
      state.email = ''
    },
    GET_CART(state,payload) {
      state.cart = payload
    }
  },
  actions: {
    register(context, payload) {
      return axios({
        method: "POST",
        url: "http://localhost:3000/register",
        data: {
          email: payload.email,
          password: payload.password,
        }
      })
      .then(({data}) => {
          console.log('axios register');
          console.log(data);
          // localStorage.setItem('access_token', data.access_token)
          // context.commit('IS_LOGIN', data)
          // return data
      })
      .catch(err => {
        console.log(err);
        return err.response.data
      })
    },
    login(context, payload) {
      return axios({
        method: "POST",
        url: "http://localhost:3000/login",
        data: {
          email: payload.email,
          password: payload.password,
        }
      })
      .then(({data}) => {
          console.log('axios login');
          console.log(data);
          localStorage.setItem('access_token', data.access_token)
          context.commit('IS_LOGIN', data)
          // return data
      })
      .catch(err => {
        console.log(err);
        return err.response.data
      })
    },
    logout(context) {
      localStorage.removeItem('access_token')
      context.commit('IS_LOGOUT')
    },
    getProducts(context) {
      return axios({
        method: "GET",
        url: "http://localhost:3000/products",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
      })
      .then(({data}) => {
          console.log('axios get');
          console.log(data);
          context.commit('GET_PRODUCTS', data)
      })
      .catch(err => {
        console.log(err);
      })
    },
    getCart(context) {
      return axios({
        method: "GET",
        url: "http://localhost:3000/cart",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
      })
      .then(({data}) => {
          console.log('axios get');
          console.log(data);
          context.commit('GET_CART', data)
      })
      .catch(err => {
        console.log(err);
      })
    },
    addToCart(context,payload) {
      return axios({
        method: "POST",
        url: `http://localhost:3000/cart/${payload}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
      })
      .then(({data}) => {
          console.log('axios post');
          console.log(data);
          // context.commit('GET_CART', data)
      })
      .catch(err => {
        console.log(err);
      })
    },
    deleteCartItem(context,payload) {
      return axios({
        method: "DELETE",
        url: `http://localhost:3000/cart/${payload.id}/${payload.productID}/${payload.qty}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
      })
      .then(({data}) => {
          console.log('axios delete cart item');
          console.log(data);
          // context.commit('GET_CART', data)
      })
      .catch(err => {
        console.log(err);
      })
    },
    editCartQty(context,payload) {
      return axios({
        method: "PUT",
        url: `http://localhost:3000/cart/${payload.id}/${payload.operator}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
      })
      .then(({data}) => {
          console.log('axios edit cart qty');
          console.log(data);
          // context.commit('GET_CART', data)
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  modules: {
  }
})
