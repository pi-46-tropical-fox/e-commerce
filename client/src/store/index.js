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
      router.push('/home')
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
    }
  },
  modules: {
  }
})
