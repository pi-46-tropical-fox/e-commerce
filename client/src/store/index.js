import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/config/axios'
import swal from '@/config/swal'

import router from '@/router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // lists
    products: [],
    wishlists: [],
    cart: [],

    // specific data
    productDetails: {},
    userData: {},

    // states
    isLoggedIn: false,
    isLoaded: false,
    registrationIsSuccessful: false,
  },
  mutations: {
    SET_PRODUCT_DATA(state, payload) {
      state.products = payload
    },
    SET_PRODUCT_DETAILS(state, payload) {
      state.productDetails = payload
    },
    SET_WISHLIST_DATA(state, payload) {
      state.wishlists = payload
    },
    SET_CART_DATA(state, payload) {
      state.cart = payload
    },
    SET_USER_DATA(state, payload) {
      state.userData = payload
    },
    SET_LOGIN_STATE(state, bool) {
      state.isLoggedIn = bool
    },
    SET_LOADED_STATE(state, bool) {
      state.isLoaded = bool
    },
    SET_REGISTRATION_SUCCESS(state, bool) {
      state.registrationIsSuccessful = bool
    }
  },
  actions: {
    // Product
    getProducts({ commit }) {
      commit('SET_LOADED_STATE', false)
      axios({
        url: '/products',
        method: 'GET',
        // header
        // headers: {
        //   access_token: localStorage.access_token
        // },
        // data
        data: {
          //
        }
      })
        .then(({ data }) => {
          commit('SET_PRODUCT_DATA', data.data)
          commit('SET_LOADED_STATE', true)
        })
        .catch()
    },

    getProductDetails({ commit }, payload) {
      axios({
        url: `/products/${payload}`,
        method: 'GET',
        // header
        // headers: {
        //   access_token: localStorage.access_token
        // },
        // data
        data: {
          //
        }
      })
        .then(({ data }) => {
          let result = {
            id: data.data.id,
            name: data.data.name,
            price: data.data.price,
            stock: data.data.stock,
            category: data.data.Category.name,
            image: data.data.ProductImages.length > 0 ? data.data.ProductImages[0] : 'No Image available'
          }

          console.log(result);
          commit('SET_PRODUCT_DETAILS', result)
        })
        .catch(({ response }) => {
          swal.showSwalError(response.data.join('<br>'))
        })

    },

    clearProductDetails({ commit }) {
      commit('SET_PRODUCT_DETAILS', {})
    },

    // Wishlist
    getWishlists({ commit }) {
      commit('SET_LOADED_STATE', false)
      axios({
        url: '/wishlists',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('SET_WISHLIST_DATA', data.data)
          commit('SET_LOADED_STATE', true)
        })
    },

    // Cart
    getCart({ commit }) {
      axios({
        url: '/cart',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          // console.log(data.data.cartProducts.length);

          let payload = []

          data.data.CartProducts.forEach(cartProduct => {
            let payloadData = {
              id: cartProduct.id,
              name: cartProduct.Product.name,
              image_url: cartProduct.Product.ProductImages.length === 0 ? 'No image available' : cartProduct.Product.ProductImages[0].image_url,
              price: cartProduct.price,
              qty: cartProduct.qty,
            }

            payload.push(payloadData)
          })

          commit('SET_CART_DATA', payload)
        })
        .catch(({ response }) => {
          swal.showSwalError(response.data.join('<br>'))
        })
    },

    // Auth
    getAuthState({ commit }) {
      if (localStorage.access_token) {
        let data = {
          name: localStorage.name,
          email: localStorage.email,
          picture: localStorage.picture,
        }
        commit('SET_USER_DATA', data)
        commit('SET_LOGIN_STATE', true)
      }
    },

    login({ commit }, payload) {
      Object.keys(payload).forEach((key) =>
        localStorage.setItem(key, payload[key])
      );

      delete payload.access_token;

      commit("SET_USER_DATA", payload);
      commit("SET_LOGIN_STATE", true);
    },

    async logout({ commit }) {
      if (gapi.auth2) {
        let auth2 = gapi.auth2.getAuthInstance();
        if (auth2) await auth2.signOut(auth2);
      }

      localStorage.clear()
      commit('SET_USER_DATA', {})
      commit('SET_LOGIN_STATE', false)

      router.push({ name: 'Home' })

      swal.showToastSuccess(`You've successfully been logged out.`)
    },
  },
  modules: {
  }
})
