import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: []
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      axios({
        method: 'GET',
        url: '/customers'
      })
        .then(({ data }) => {
          console.log(data, 'ini data kiriman dari server di vuex')
          commit('SET_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    fetchCart (context) {
      axios({
        method: 'GET',
        url: '/customers/cart',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          console.log(data, 'ini data fetchCart kiriman dari server di vuex')
          context.commit('SET_CARTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    login (context, payload) {
      axios({
        method: 'POST',
        url: '/customers/login',
        data: payload
      })
        .then(({ data }) => {
          console.log(data, 'ini response login kiriman dari server di vuex')
          localStorage.setItem('access_token', data.access_token)
        })
        .catch(err => {
          console.log(err, 'ini error login di client')
        })
    },

    register (context, payload) {
      axios({
        method: 'POST',
        url: '/customers/register',
        data: payload
      })
        .then(({ data }) => {
          console.log(data, 'ini response register kiriman dari server di vuex')
        })
        .catch(err => {
          console.log(err, 'ini error register di client')
        })
    },

    addToCart (context, payload) {
      console.log(payload, 'ini  payload di vuex addtocart')
      axios({
        method: 'POST',
        url: `/customers/addcart/${payload.ProductId}`,
        headers: { access_token: localStorage.getItem('access_token') },
        data: payload
      })
        .then(({ data }) => {
          console.log(data, 'sukses menambah cart')
        })
        .catch(err => {
          console.log(err, 'ini error addtocart')
        })
    }
  },
  getters: {
    filteredProducts: (state) => (category) => {
      if (category === '') {
        return state.products
      } else {
        return state.products.filter(product => product.category === category)
      }
    }
  },
  modules: {
  }
})
