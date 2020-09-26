import Vue from 'vue'
import Vuex from 'vuex'
import EcommerceAPI from '../config/EcommerceAPI'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    categories: [],
    products: [],
    productsFilter: [],
    banners: [],
    carts: [],
    cart: {},
    wishlists: [],
    histories: [],
    notification: [],
    color: '',
    genders: [{ gender: 'Men' }, { gender: 'Women' }]
  },
  mutations: {
    SET_IS_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    SET_PRODUCTS_FILTER (state, payload) {
      state.productsFilter = payload
    },
    SET_BANNERS (state, payload) {
      state.banners = payload
    },
    SET_CATEGORIES (state, payload) {
      state.categories = payload
    },
    SET_NOTIFICATION (state, payload) {
      state.notification = payload
    },
    SET_COLOR (state, payload) {
      state.color = payload
    },
    SET_CARTS (state, payload) {
      state.carts = payload
    },
    SET_CART (state, payload) {
      state.cart = payload
    },
    SET_WISHLISTS (state, payload) {
      state.wishlists = payload
    },
    SET_HISTORIES (state, payload) {
      state.histories = payload
    }
  },
  actions: {
    fetchProducts (context) {
      EcommerceAPI({
        url: '/products',
        method: 'GET'
      })
        .then(({ data }) => {
          console.log(data, '<<< ini dr action')
          context.commit('SET_PRODUCTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchProductsFilter (context, payload) {
      if (payload === 'Men' || payload === 'Women') {
        return new Promise((resolve, reject) => {
          EcommerceAPI({
            url: `/products/${payload}`,
            method: 'GET'
          })
            .then(({ data }) => {
              console.log(data, payload, '<<< ini dr action fetch gender')
              context.commit('SET_PRODUCTS_FILTER', data)
              resolve(data)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      } else {
        return new Promise((resolve, reject) => {
          EcommerceAPI({
            url: `/products/category/${payload}`,
            method: 'GET'
          })
            .then(({ data }) => {
              console.log(data, payload, '<<< ini dr action fetch gender')
              context.commit('SET_PRODUCTS_FILTER', data)
              resolve(data)
            })
            .catch(err => {
              console.log(err)
              reject(err)
            })
        })
      }
    },
    fetchCategories (context) {
      EcommerceAPI({
        url: '/categories',
        method: 'GET'
      })
        .then(({ data }) => {
          console.log(data, '<<< ini dr action')
          context.commit('SET_CATEGORIES', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchCarts (context) {
      EcommerceAPI({
        url: '/carts',
        method: 'GET',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          console.log(data, '<<< ini dr action')
          context.commit('SET_CARTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchWishlists (context) {
      EcommerceAPI({
        url: '/wishlists',
        method: 'GET',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          console.log(data, '<<< ini dr action')
          context.commit('SET_WISHLISTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchHistories (context) {
      EcommerceAPI({
        url: '/histories',
        method: 'GET',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          console.log(data, '<<< ini dr action')
          context.commit('SET_HISTORIES', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchBanners (context) {
      EcommerceAPI({
        url: '/banners',
        method: 'GET'
      })
        .then(({ data }) => {
          console.log(data, '<<< ini dr action')
          context.commit('SET_BANNERS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    login (context, payload) {
      return new Promise((resolve, reject) => {
        EcommerceAPI({
          url: '/login',
          method: 'POST',
          data: payload
        })
          .then(({ data }) => {
            console.log(data)
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('id', data.id)
            localStorage.setItem('email', data.email)
            resolve(data)
          })
          .catch(({ response }) => {
            console.log(response.data.errors, '<<< dr err login')
            context.commit('SET_NOTIFICATION', response.data.errors)
            context.commit('SET_COLOR', 'warning')
            reject(response)
          })
      })
    },
    register (context, payload) {
      return new Promise((resolve, reject) => {
        EcommerceAPI({
          url: '/register',
          method: 'POST',
          data: payload
        })
          .then(({ data }) => {
            console.log(data)
            context.commit('SET_NOTIFICATION', [data.message])
            context.commit('SET_COLOR', 'success')
            resolve(data)
          })
          .catch(({ response }) => {
            console.log(response.data.errors)
            context.commit('SET_NOTIFICATION', response.data.errors)
            context.commit('SET_COLOR', 'warning')
            reject(response.data.errors)
          })
      })
    },
    addWishlist (context, payload) {
      return new Promise((resolve, reject) => {
        EcommerceAPI({
          url: '/wishlists',
          method: 'POST',
          headers: { access_token: localStorage.getItem('access_token') },
          data: { UserId: localStorage.getItem('id'), ProductId: payload.id }
        })
          .then(({ data }) => {
            console.log(data, '<<<< ini dr addWishlist')
            context.commit('SET_NOTIFICATION', ['Successfully add to wishlist'])
            context.commit('SET_COLOR', 'success')
            resolve(data)
          })
          .catch(({ response }) => {
            context.commit('SET_NOTIFICATION', ['Please Login first'])
            context.commit('SET_COLOR', 'warning')
            reject(response.data.errors)
          })
      })
    },
    addCart (context, payload) {
      return new Promise((resolve, reject) => {
        EcommerceAPI({
          url: '/carts',
          method: 'POST',
          headers: { access_token: localStorage.getItem('access_token') },
          data: { UserId: localStorage.getItem('id'), ProductId: payload.id, quantity: 1 }
        })
          .then(({ data }) => {
            console.log(data, '<<<< ini dr addCart')
            context.commit('SET_NOTIFICATION', ['Successfully add to cart'])
            context.commit('SET_COLOR', 'success')
            resolve(data)
          })
          .catch(({ response }) => {
            context.commit('SET_NOTIFICATION', ['Please Login first'])
            context.commit('SET_COLOR', 'warning')
            reject(response.data.errors)
          })
      })
    },
    deleteWishlist (context, payload) {
      return new Promise((resolve, reject) => {
        EcommerceAPI({
          url: `/wishlists/${payload}`,
          method: 'DELETE',
          headers: { access_token: localStorage.getItem('access_token') },
          data: { UserId: localStorage.getItem('id'), ProductId: payload.id }
        })
          .then(({ data }) => {
            console.log(data, '<<<< ini dr deleteWishlist')
            context.dispatch('fetchWishlists')
            context.commit('SET_NOTIFICATION', ['Successfully delete item wishlist'])
            context.commit('SET_COLOR', 'success')
            resolve(data)
          })
          .catch(({ response }) => {
            context.commit('SET_NOTIFICATION', ['Please Login first'])
            context.commit('SET_COLOR', 'warning')
            reject(response.data.errors)
          })
      })
    },
    deleteCart (context, payload) {
      return new Promise((resolve, reject) => {
        console.log(payload)
        EcommerceAPI({
          url: `/carts/${payload}`,
          method: 'DELETE',
          headers: { access_token: localStorage.getItem('access_token') },
          data: { UserId: localStorage.getItem('id'), ProductId: payload.id, quantity: 1 }
        })
          .then(({ data }) => {
            console.log(data, '<<<< ini dr deleteCart')
            context.dispatch('fetchCarts')
            context.commit('SET_NOTIFICATION', ['Successfully delete item cart'])
            context.commit('SET_COLOR', 'success')
            resolve(data)
          })
          .catch(({ response }) => {
            context.commit('SET_NOTIFICATION', ['Please Login first'])
            context.commit('SET_COLOR', 'warning')
            reject(response.data.errors)
          })
      })
    },
    findCartByProduct (context, payload) {
      return new Promise((resolve, reject) => {
        console.log(payload)
        EcommerceAPI({
          url: `/carts/product/${payload.id}`,
          method: 'GET',
          headers: { access_token: localStorage.getItem('access_token') },
          data: { UserId: localStorage.getItem('id'), ProductId: payload.id, quantity: 1 }
        })
          .then(({ data }) => {
            console.log(data, '<<<< ini dr findProduct')
            context.commit('SET_CART', data)
            context.commit('SET_NOTIFICATION', ['Successfully delete item cart'])
            context.commit('SET_COLOR', 'success')
            resolve(data)
          })
          .catch(({ response }) => {
            context.commit('SET_NOTIFICATION', ['Please Login first'])
            context.commit('SET_COLOR', 'warning')
            reject(response.data.errors)
          })
      })
    },
    updateCart (context, payload) {
      return new Promise((resolve, reject) => {
        console.log(payload)
        EcommerceAPI({
          url: `/carts/${payload.id}`,
          method: 'PUT',
          headers: { access_token: localStorage.getItem('access_token') },
          data: { quantity: payload.quantity, UserId: payload.UserId, ProductId: payload.ProductId }
        })
          .then(({ data }) => {
            console.log(data, '<<<< ini dr addProduct')
            context.commit('SET_CART', data)
            context.commit('SET_NOTIFICATION', ['Successfully update item cart'])
            context.commit('SET_COLOR', 'success')
            resolve(data)
          })
          .catch(({ response }) => {
            context.commit('SET_NOTIFICATION', ['Please Login first'])
            context.commit('SET_COLOR', 'warning')
            reject(response.data.errors)
          })
      })
    },
    editCart (context, payload) {
      return new Promise((resolve, reject) => {
        EcommerceAPI({
          url: `/carts/${payload}`,
          method: 'GET',
          headers: { access_token: localStorage.getItem('access_token') }
        })
          .then(({ data }) => {
            console.log(data, '<<<ini dr editCart')
            context.commit('SET_CART', data)
            context.commit('SET_NOTIFICATION', [data.message])
            context.commit('SET_COLOR', 'success')
            resolve(data)
          })
          .catch(({ response }) => {
            context.commit('SET_NOTIFICATION', response.data.errors)
            context.commit('SET_COLOR', 'warning')
            reject(response.data.errors)
          })
      })
    },
    createHistory (context, payload) {
      return new Promise((resolve, reject) => {
        EcommerceAPI({
          url: '/histories',
          method: 'POST',
          headers: { access_token: localStorage.getItem('access_token') },
          data: {
            invoice: `${payload.Product.name} ${(new Date()).toLocaleDateString().split('/')}`,
            UserId: localStorage.getItem('id'),
            ProductId: payload.ProductId,
            quantity: payload.quantity,
            status: 'purchase success'
          }
        })
          .then(({ data }) => {
            console.log(data, '<<<< ini dr addProduct')
            context.commit('SET_NOTIFICATION', ['Successfully add to History'])
            context.commit('SET_COLOR', 'success')
            resolve(data)
          })
          .catch(({ response }) => {
            context.commit('SET_NOTIFICATION', ['Please Login first'])
            context.commit('SET_COLOR', 'warning')
            reject(response.data.errors)
          })
      })
    },
    updateProduct (context, payload) {
      return new Promise((resolve, reject) => {
        EcommerceAPI({
          url: `/products/${payload.ProductId}`,
          method: 'PATCH',
          headers: { access_token: localStorage.getItem('access_token') },
          data: {
            stock: payload.stock
          }
        })
          .then(({ data }) => {
            context.commit('SET_NOTIFICATION', [data.message])
            context.commit('SET_COLOR', 'success')
            resolve(data)
          })
          .catch(({ response }) => {
            context.commit('SET_NOTIFICATION', response.data.errors)
            context.commit('SET_COLOR', 'warning')
            reject(response.data.errors)
          })
      })
    }
  },
  modules: {
  }
})
