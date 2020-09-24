import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    moviesList: [],
    cartList: [],
    currentStatus: '',
    banners: []
  },
  mutations: {
    SET_MOVIES_LIST(state, payload){
      state.moviesList = payload
    },

    SET_CART_LIST(state, payload){
      state.cartList = payload
    },

    SET_STATUS(state, payload){
      state.currentStatus = payload
    },
    SET_BANNER(state, payload){
      state.banners = payload
    }
  },
  actions: {
    register({commit}, payload){
      axios
        .post('/register', payload)
        .then(({data}) => {
          router.push({ name: 'Login' })
        })
        .catch(err => {
          console.log(err)
        })
    },

    login({commit}, payload){
      axios
        .post('/login', payload)
        .then(({data}) => {
          localStorage.setItem("access_token", data.access_token)
          localStorage.setItem("status", "loggedin")
          commit("SET_STATUS", "loggedin")
          router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
        })
    },

    logout({commit}){
      localStorage.clear()
      commit("SET_STATUS", "")
      router.push({ name: 'Login' })
    },

    getAllMovies({commit}){
      axios
        .get(`/products`)
        .then(({data}) => {
          commit("SET_MOVIES_LIST", data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    addCart({commit}, payload){
      axios
        .post(`/addCart/${payload.id}`, payload, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({data}) => {
          Swal.fire(
            'SUCCESS!',
            'Successfully add product',
            'success'
          )
          this.dispatch("getAllMovies")
        })
        .catch(err => {
          console.log(err)
        })
    },

    showCart({commit}){
      axios
        .get('/getAllCart', {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({data}) => {
          commit("SET_CART_LIST", data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    updateCart({commit}, payload){
      axios
        .patch(`/updateCart/${payload.id}`, {quantity: payload.quantity}, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({data}) => {
          Swal.fire(
            'SUCCESS!',
            'Successfully update Cart',
            'success'
          )
          this.dispatch("showCart")
        })
        .catch(err => {
          console.log(err)
        })
    },

    removeCart({commit, dispatch, getters, state}, id){
      axios
        .delete(`/deleteCart/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({data}) => {
          Swal.fire(
            'SUCCESS!',
            'Successfully delete Cart',
            'success'
          )
          dispatch("showCart")
        })
        .catch(err => {
          console.log(err)
        })
    },

    checkout({commit}){
      axios({
        url: '/checkout',
        method: 'post',
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({data}) => {
        this.dispatch("showCart")
      })
      .catch(err => {
        console.log(err)
      })
    },

    getAllBanners({commit}){
      axios({
        url: '/banners',
        method: 'get',
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
      .then(({data}) => {
        commit("SET_BANNER", data.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  modules: {
  }
})
