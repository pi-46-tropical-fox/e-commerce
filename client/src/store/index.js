import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: {},
    categories: [],
    cart: [],
    paid: [],
    total: 0,
    isLogged: false
  },
  mutations: {
    changeLogged (state) {
      if (localStorage.getItem('access_token')) {
        state.isLogged = true
      } else {
        state.isLogged = false
      }
    },
    setProducts (state, products) {
      state.products = products
      state.categories = Object.keys(state.products)
    },
    setCart (state, products) {
      state.cart = products
    },
    setPaid (state, products) {
      state.paid = products
    },
    setTotal (state) {
      state.total = 0
      state.cart.forEach(item => {
        state.total += item.quantity * item.Product.price
      })
    }
  },
  actions: {
    register (context, payload) {
      axios({
        method: 'POST',
        url: '/register',
        data: {
          email: payload.email,
          password: payload.password
        }
      }).then(res => {
        Vue.swal('Registration done! Please login!')
        router.push('/login')
      }).catch(err => {
        console.log(err);
      })
    },
    login ({ commit }, payload) {
      axios({
        method: 'POST',
        url: '/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      }).then(res => {
        localStorage.setItem('access_token', res.data.access_token)
        commit('changeLogged')
        router.push('/products')
      }).catch(err => {
        console.log(err)
      })
    },
    logout ({ commit }) {
      localStorage.clear()
      commit('changeLogged')
      router.push('/')
    },
    getProducts (context) {
      axios({
        method: 'GET',
        url: '/products'
      }).then(res => {
        context.commit('setProducts', res.data.products)
      }).catch(err => {
        console.log(err)
      })
    },
    getCart(context) {
      Promise.all([
        axios({
          method: 'GET',
          url: '/cart',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        }).then(res => {
          context.commit('setCart', res.data.cart)
          context.commit('setTotal')
        }),
        axios({
          method: 'GET',
          url: '/cart/paid',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        }).then (res => {
          context.commit('setPaid', res.data.paid)
        })
      ])
    },
    addToCart (context, payload) {
      axios({
        method: 'POST',
        url: `/cart/${payload.productId}/add`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          quantity: payload.quantity
        }
      }).then(res => {
        console.log(res.data)
        Vue.swal('Item added successfully!')
      })
    },
    minItem (context, productId) {
      axios({
        method: 'POST',
        url: `/cart/${productId}/min`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(res => {
        context.dispatch('getCart')
      })
    },
    plusItem (context, productId) {
      axios({
        method: 'POST',
        url: `/cart/${productId}/add`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          quantity: 1
        }
      }).then(res => {
        context.dispatch('getCart')
      })
    },
    removeItem(context, id) {
      axios({
        method: 'DELETE',
        url: `/cart/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(res => {
        context.dispatch('getCart')
      })
    },
    checkout (context) {
      axios({
        method: 'DELETE',
        url: `/cart`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(res => {
        Vue.swal('Thank you for your purchase!')
        context.commit('setTotal', 0)
        context.dispatch('getCart')
        console.log(res.data)
        router.push('/cart/paid')
      })
    }
  },
  modules: {
  }
})
