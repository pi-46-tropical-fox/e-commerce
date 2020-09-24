import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import router from '../router'

Vue.use(Vuex)

// const url = 'http://localhost:3000'
const url = 'https://server-ecommerce-syukur.herokuapp.com'

export default new Vuex.Store({
  state: {
    allProducts: [],
    perCategory: [],
    tampungDetail: {},
    cartArr: [],
    isUser: false,
    userName: ''
  },
  mutations: {
    getProductMutation (state, payload) {
      // console.log('Masuk from store', payload)
      state.allProducts = payload
    },
    forPerCategory (state, data) {
      state.perCategory = data
    },
    detailProductMutation (state, payload) {
      state.tampungDetail = payload
    },
    passCartMutation (state, payload) {
      state.cartArr = payload
    },
    emptyMyCartMutation (state, payload) {
      state.cartArr = []
    }
  },
  actions: {
    getProduct (context) {
      axios({
        url: `${url}/products`,
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then((response) => {
          context.commit('getProductMutation', response.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    emptyMyCart (context) {
      context.commit('emptyMyCartMutation')
    },
    getCategory (context, dataNya) {
      const data = dataNya
      axios({
        url: `${url}/user/category/${data}`,
        method: 'GET',
        data: {
          category: data
        }
      })
        .then(response => {
          // console.log(response.data.product)
          context.commit('forPerCategory', response.data.product)
        })
        .catch(err => {
          console.log(err.response, ' <<< error dari getCategory di store')
        })
    },
    details (context, data) {
      // console.log('data >>>>', data)
      axios({
        url: `${url}/products/${data}`,
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then((response) => {
          // console.log('IIsi detailnya >>>', response.data)
          context.commit('detailProductMutation', response.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addToCart (context, data) {
      // console.log('Isis data addToCart STORE', data)
      axios({
        url: `${url}/carts`,
        method: 'POST',
        data: {
          id: data.id,
          quantity: data.quantity
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then((response) => {
          // console.log('berhasil add to cart')
          this.dispatch('getMyCart')
          Swal.fire({
            title: `Successfully added ${response.data.product.name} to your cart`,
            text: 'Check cart list?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#42a35a',
            confirmButtonText: 'Yes',
            cancelButtonText: 'Keep shopping'
          })
            .then((result) => {
              // console.log('RESULT ADD', result)
              if (result.value) {
                router.push({ name: 'Cart' })
              } else {
                router.push({ name: 'Home' })
              }
            })
        })
        .catch(_ => {
          // console.log('error dari addToCart @ store >>>>', err.response)
          Swal.fire('We Are Sorry :(', 'Product is currently out of stock based on your cart list. Please check your cart amount', 'warning')
        })
    },
    getMyCart (context, data) {
      // console.log('Sukses get...')
      axios({
        url: `${url}/carts/myCart`,
        method: 'POST',
        headers: ({
          access_token: localStorage.access_token
        })
      })
        .then((response) => {
          // console.log('Response get myChart', response.data.cart)
          context.commit('passCartMutation', response.data.cart)
        })
        .catch((err) => {
          console.log(err.response, 'error dari getMyCart di store frontend')
        })
    },
    updateProductInCart (context, data) {
      // console.log('DATA >>>>>', data)
      axios({
        url: `${url}/carts/updateCart`,
        method: 'PUT',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          productId: data.id,
          quantity: data.quantity
        }
      })
        .then(data => {
          this.dispatch('getMyCart')
        })
        .catch(err => {
          console.log(err.response, 'eror dari updateProduct @ Store')
        })
    },
    hapus (context, data) {
      axios({
        url: `${url}/carts/deleteCart`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          productId: data
        }
      })
        .then(data => {
          // console.log('Succes add to cart')
          this.dispatch('getMyCart')
        })
        .catch(err => {
          console.log('error dari hapus di store', err.response)
        })
    },
    checkOut (context, data) {
      axios({
        url: `${url}/user/checkOut`,
        method: 'POST',
        headers: {
          access_token: localStorage.access_token
        },
        data: { product: data }
      })
        .then((response) => {
          context.commit('emptyMyCartMutation')
          Swal.fire('You Have Been Checked Out', 'See You!', 'success')
        })
        .catch(err => {
          Swal.fire({
            title: 'Too late! another buyer has bought the last piece!',
            text: `${err.response.data.message}. We are very sorry`,
            icon: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: '#d33'
          })
        })
    }
  },
  modules: {
  }
})
