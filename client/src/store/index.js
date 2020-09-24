import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/config/axios'
import swal from '@/config/swal'

import router from '@/router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    wishlists: [],
    cart: [],
    userData: {},
    isLoggedIn: false,
    isLoaded: false,

    // other states
    registrationIsSuccessful: false,
  },
  mutations: {
    SET_PRODUCT_DATA(state, payload) {
      //
    },
    SET_WISHLIST_DATA(state, payload) {
      //
    },
    SET_CART_DATA(state, payload) {
      //
    },
    SET_USER_DATA(state, payload) {
      state.userData = payload
    },
    SET_LOGIN_STATE(state, bool) {
      state.isLoggedIn = bool
    },
    SET_REGISTRATION_SUCCESS(state, bool) {
      state.registrationIsSuccessful = bool
    }
  },
  actions: {
    getProducts({ commit }) {
      axios({
        url: '',
        method: '',
        // header
        // headers: {
        //   access_token: localStorage.access_token
        // },
        // data
        data: {
          //
        }
      })
        .then(({ data }) => { })
        .catch()
    },
    getWishlists({ commit }) {
      axios({
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    addToWishlist({ commit }, id) {
      axios({
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    deleteFromWishlist({ commit }) {
      axios({
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    getCart({ commit }) {
      axios({
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    changeQty({ commit }, payload) {
      axios({
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    addToCart({ commit }, id) {
      axios({
        headers: {
          access_token: localStorage.access_token
        }
      })
    },
    deleteFromCart({ commit }, id) {
      axios({
        url: `/cart/${id}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.access_token
        },
      })
        .then(({ data }) => {
          swal.showToastSuccess(data.message)
        })
    },
    clearCart({ commit }) {

    },
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
      axios({
        url: '/auth/login',
        method: 'POST',
        data: payload
      })
        .then(({ data }) => {
          console.log(data);
          Object.keys(data).forEach(key => localStorage.setItem(key, data[key]))
          // localStorage.setItem('access_token', data.access_token)
          delete data.access_token
          commit('SET_USER_DATA', data)
          commit('SET_LOGIN_STATE', true)
          router.push({ name: 'Home' })
        })
    },
    googleLogin({ commit }, payload) {
      if (!localStorage.access_token) {
        const g_access_token = payload.getAuthResponse().id_token;

        axios({
          url: "/auth/login/g",
          method: "POST",
          headers: {
            g_access_token,
          },
        })
          .then((result) => {

            console.log(result);

            // let { data } = result;

            // Object.keys(data).forEach((key) => {
            //   localStorage.setItem(key, data[key]);
            // });

            commit('SET_LOGIN_STATE', true)
            router.push({ name: 'Home' })

            swal.showToastSuccess("Logged in successfully.");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    register({ commit }, payload) {
      axios({
        url: '/users/register',
        method: 'POST',
        data: payload
      })
        .then(({ data }) => {
          swal.showToastSuccess(data.message)

          commit('SET_REGISTRATION_SUCCESS', true)
        })
        .catch(({ response }) => {
          swal.showSwalError(response.data.join('<br>'))

          commit('SET_REGISTRATION_SUCCESS', false)
        })
    },
    async logout({ commit }) {
      console.log(gapi.auth2);
      let auth2 = gapi.auth2.getAuthInstance();
      if (auth2) await auth2.signOut(auth2);

      localStorage.clear()
      commit('SET_USER_DATA', {})
      commit('SET_LOGIN_STATE', false)

      router.push({ name: 'Home' })
    },
  },
  modules: {
  }
})
