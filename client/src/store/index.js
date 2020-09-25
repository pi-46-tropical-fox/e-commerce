import Vue from 'vue'
import Vuex from 'vuex'
import { Toast } from '../config/toaster'
import axios from '../config/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: [],
    name: [],
    allProduct: [],
    product: [],
    carts: [],
    price: 0
    // oneProduct: []
  },
  mutations: {
    SET_ID (state, payload) {
      state.id = +payload
    },
    SET_NAME (state, payload) {
      state.name = payload
    },
    SET_ID (state, payload) {
      state.id = payload
    },
    SET_ALL_PRODUCT (state, products) {
      state.allProduct = products
    },
    SET_ONE_PRODUCT (state, payload) {
      state.product = payload
    },
    SET_CART (state, payload) {
      state.carts = payload
    },
    SET_PRICE (state, payload) {
      state.price = payload
    }
  },
  actions: {
    register (context, form) {
      const data = {
        name: form.name,
        email: form.email,
        password: form.password
      }
      axios
        .post('/register', data)
        .then(({ data }) => {
          context.commit('SET_NAME', data.name)
          router.push('/login')
          
          Toast.fire({
            icon: 'success',
            title: `You have registered successfully, ${this.state.name}. Please login`
          })
        })
    },
    login (context, form) {
      const data = {
        email: form.email,
        password: form.password
      }
      axios
        .post('/login', data)
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('id', data.id)
          localStorage.setItem('user', data.name)

          context.commit('SET_NAME', data.name)
          context.commit('SET_ID', data.id)
          console.log(this.state.name, this.state.id);
          router.push('/')
          
          Toast.fire({
            icon: 'success',
            title: `You have sign in successfully. Welcome to Bookiepedia, ${this.state.name}!`
          })
        })
    },
    getProduct (context) {
      axios
        .get('/products')
        .then(({ data }) => {
          console.log('HIT');
          console.log(data)
          if (data) {
            context.commit('SET_ALL_PRODUCT', data)
          }
        })
    },
    addToCart (context, input) {
      const data = {
        ProductId: input.ProductId,
        quantity: input.quantity
      }
      console.log(data);
      axios
        .post(`carts/${data.ProductId}`, data, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          console.log('HALO');
          // console.log(data);
          context.commit('SET_ONE_PRODUCT', data.name)
          // console.log(this.state.product);

          Toast.fire({
            icon: 'success',
            title: `You have added product to your shopping bag`
          })
        })
    },
    getCart (context) {
      axios
        .get(`/carts`, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          
          // console.log(data);
          context.commit('SET_PRICE', data.finalTotal)
          context.commit('SET_CART', data.products)
          // const arr = []
          // for (let i = 0; i < data.length; i++) {
          //   arr.push(data.data[i]);
          //   console.log(data.data[i]);
          // }
          // console.log(arr);
          // console.log(data.data[2]);
          // if (data) {
            // for (let i = 0; i < data.length; i++) {
              // if (i == data.length - 1) {
                // context.commit('SET_TOTAL_PRICE', data[i])  
              // } else {
              // }
            // }
          // }
        })
    },
    updateCart(context, inputData) {
      // console.log(inputData);
      const data = {
        ProductId: inputData.ProductId,
        quantity: inputData.quantity
      }
      // console.log(data);
      axios
        .put(`carts/${data.ProductId}`, data, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          console.log(data, 'store');
          context.commit('SET_ONE_PRODUCT', data.name)
          console.log(this.state.product);

          Toast.fire({
            icon: 'success',
            title: `Successfully updated your product`
          })
        })
    },
    deleteCart (context, input) {
      const data = {
        ProductId: input.ProductId
      }
      axios
        .delete(`carts/${data.ProductId}`, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          // this.getCart()
          Toast.fire({
            icon: 'success',
            title: `Successfully removed your product`
          })
        })
    },
    checkOut (context, input) {
      // console.log(inputData);
      const data = {
        data : 'data'
      }
      axios
        .put(`carts/`, data, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          console.log(data, 'store');
          // context.commit('SET_ONE_PRODUCT', data.name)
          // console.log(this.state.product);
          router.push('/')

          Toast.fire({
            icon: 'success',
            title: `Successfully updated your product`
          })
        })
    }
  },
  modules: {
  }
})
