import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

// const url = 'http://localhost:3000'
const url = 'https://server-ecommerce-syukur.herokuapp.com'

export default new Vuex.Store({
  state: {
    allProducts: [],
    storedData: {}
  },
  mutations: {
    getProductMutation (state, payload) {
      // console.log('Masuk di store', payload)
      state.allProducts = payload
    },
    deleteProductMutation (state, payload) {
      state.allProducts = payload
    },
    getStoredDataMutation (state, payload) {
      state.storedData = state.allProducts[payload]
      // console.log('payload >>>', payload)
      // console.log('allproduct >>>', state.allproducts)
      // console.log('pSTORedData >>>', state.storedData)
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
    getStoredProduct (context, payload) {
      // console.log('masuk getstored action')
      context.commit('getStoredDataMutation', payload)
    },
    addProduct (context, payload) {
      axios({
        url: `${url}/products`,
        method: 'POST',
        data: {
          name: payload.name,
          img_url: payload.img_url,
          price: payload.price,
          stock: payload.stock,
          category: payload.category,
          description: payload.description
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then((response) => {
          // console.log('Success add store', response)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Added product successfully',
            showConfirmButton: false,
            timer: 1500
          })
          this.dispatch('getProduct')
        })
        .catch((err) => {
          console.log('Fail add store', err)
        })
    },
    deleteProduct (context, payload) {
      Swal.fire({
        title: 'Are you sure to delete this product?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then((result) => {
          if (result.value) {
            axios({
              url: `${url}/products/${payload}`,
              method: 'DELETE',
              headers: { access_token: localStorage.access_token }
            })
              .then(() => {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'deleted!',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.dispatch('getProduct')
              })
              .catch((err) => {
                console.log('unable to delete product', err.message)
              })
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            console.log('delete canceled')
          }
        })
    },
    editProduct (context, payload) {
      axios({
        url: `${url}/products/${payload.id}`,
        method: 'PUT',
        data: {
          name: payload.name,
          img_url: payload.img_url,
          price: payload.price,
          stock: payload.stock,
          category: payload.category,
          description: payload.description
        },
        headers: { access_token: localStorage.access_token }
      })
        .then(() => {
          // console.log('Masuk axios edit', payload, payload.id)
          this.dispatch('getProduct')
        })
        .catch((err) => {
          console.log(err.response)
        })
    }

  },
  modules: {
  }
})
