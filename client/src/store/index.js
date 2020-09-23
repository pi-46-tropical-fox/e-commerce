import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    registerAlert: [],
    loginAlert: [],
    categoriesData: [],
    gamesData: [],
    cartsData: []
  },
  mutations: {
    SET_REGISTER_ALERT (state, payload) {
      state.registerAlert = payload
    },

    SET_LOGIN_ALERT (state, payload) {
      console.log(payload)
      state.loginAlert = payload
    },

    SET_IS_LOGIN (state, payload) {
      state.isLogin = payload
    },

    SET_CATEGORIES_DATA (state, payload) {
      state.categoriesData = payload
    },

    SET_CARTS_DATA (state, payload){
      state.cartsData = payload
    },
    SET_GAMES_DATA (state, payload){
      state.gamesData = payload
    }
  },
  actions: {
    register (context, payload) {
      const { email, password, name, address, phone } = payload
      return axios({
        method: 'post',
        url: './users/register',
        data: {
          email,
          password,
          name,
          address,
          phone,
          role: 'customer'
        }
      })
        .then(({ data }) => {
        //  console.log(data);
          context.commit('SET_REGISTER_ALERT', [])
          // const test = 'test'
          return true
        })
        .catch(err => {
        //  console.log(err.response.data.errors);
          context.commit('SET_REGISTER_ALERT', err.response.data.errors)
          return false
        })
    },

    login (context, payload) {
      return axios({
        method: 'POST',
        url: './users/login',
        data: payload
      })
        .then(({ data }) => {
          // console.log(data.id);
          localStorage.access_token = data.access_token
          context.commit('SET_LOGIN_ALERT', [])
          return true
        })
        .catch(err => {
          // console.log(err.response.data.errors)
          context.commit('SET_LOGIN_ALERT', err.response.data.errors)
          return false
        })
    },

    logout (context, payload) {
      localStorage.removeItem('access_token')
    },

    isLogin (context) {
      if (localStorage.access_token) {
        context.commit('SET_IS_LOGIN', true)
      } else {
        context.commit('SET_IS_LOGIN', false)
      }
    },

    fetchGamesData(context){
      return axios({
        method: 'get',
        url: './products',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          // console.log(data);
          context.commit('SET_GAMES_DATA', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    fetchCategories (context) {
      // console.log('jalan');
      return axios({
        method: 'get',
        url: './categories',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          // console.log(data);
          context.commit('SET_CATEGORIES_DATA', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    fetchCartsData (context){
      axios({
        method: 'get',
        url: './carts',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({data}) => {
          // console.log(data.cartsData);
          context.commit('SET_CARTS_DATA', data.cartsData)
        })
        .catch((err) => {
          console.log(err);
        })
    },

    addToCart(context, payload){
      return axios({
        method: 'post',
        url: './carts',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          ProductId: payload.ProductId,
          quantity: payload.quantity,
          status: 'pending'
        }
      })
        .then(({data}) => {
          // console.log(data);
          return data.message
        })
        .catch((err) => {
          console.log(err);
          return err.response.data.errors[0]
        })
    },

    updateCart(context, payload){
      return axios({
        method: 'patch',
        url: `./carts/${payload.id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          quantity: payload.quantity,
        }
      })
        .then(({data}) => {
          // console.log(data);
          return data.message
        })
        .catch((err) => {
          console.log(err);
          return err.response.data.errors[0]
        })
    },

    deleteCart(context, payload){
      return axios({
        method: 'delete',
        url: `./carts/${payload.id}`,
        headers: {
          access_token: localStorage.access_token
        },
      })
        .then(({data}) => {
          // console.log(data);
          return data.message
        })
        .catch((err) => {
          console.log(err);
          return err.response.data.errors[0]
        })
    }

  },
  modules: {
  }
})
