import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: [],
    wishlists: []
  },
  mutations: {
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    },
    SET_WISHLISTS (state, payload) {
      state.wishlists = payload
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

    fetchWishlist (context) {
      axios({
        method: 'GET',
        url: '/customers/wishlist',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          console.log(data, 'ini response fetchwishlist dari server di vuex')
          context.commit('SET_WISHLISTS', data)
        })
        .catch(err => {
          console.log(err, 'ini error fetchwishlist di vuex')
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
    },

    addToWishlist (context, payload) {
      axios({
        method: 'POST',
        url: `/customers/addwl/${payload.id}`,
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          if (data.message === 'Successfully added to wishlist') {
            console.log(data, 'sukses menambah wishlist')
            context.dispatch('fetchWishlist')
          } else {
            console.log(data, 'sukses menghapus wishlist')
            context.dispatch('fetchWishlist')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    removeCart (context, id) {
      axios({
        method: 'DELETE',
        url: `customers/deletecart/${id}`,
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          context.dispatch('fetchCart')
        })
        .catch(err => {
          console.log(err)
        })
    },

    removeFromWishlist (context, id) {
      axios({
        method: 'DELETE',
        url: `customers/deletewl/${id}`,
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          context.dispatch('fetchWishlist')
        })
        .catch(err => {
          console.log(err, 'ini error delete wl di vuex')
        })
    },

    editQuantity (context, payload) {
      console.log(payload, 'ini  payload di vuex editQuantity')
      axios({
        method: 'PUT',
        url: '/customers/updatecart',
        data: payload,
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          console.log(data, 'sukses menambah cart')
          context.dispatch('fetchCart')
        })
        .catch(err => {
          console.log(err, 'ini error addtocart')
        })
    },

    checkout (context, payload) {
      console.log(payload, 'ini payload di vuex untuk checkout')
      axios({
        method: 'PUT',
        url: '/customers/checkout',
        data: payload,
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          console.log(data, 'sukses checkout')
          context.dispatch('fetchCart')
        })
        .catch(err => {
          console.log(err, 'error checkout di vuex')
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
