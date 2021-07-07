import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from '../config/axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    banners: [],
    carts: [],
    wishlists: []
  },
  mutations: {
    GET_PRODUCTS: (state, payload) => {
      state.products = payload
    },
    GET_BANNERS: (state, payload) => {
      state.banners = payload
    },
    GET_CARTS: (state, payload) => {
      state.carts = payload
    },
    GET_WISHLISTS: (state, payload) => {
      state.wishlists = payload
    }
  },
  actions: {
    login ({ commit }, payload) {
      axios({
        method: 'POST',
        url: '/login',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('user_email', data.email)
          router.push({ name: 'Electronics' })
        })
        .catch((err) => {
          console.log(err.response)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.response.data.errors[0]
          })
        })
    },
    register ({ commit }, payload) {
      axios({
        method: 'POST',
        url: '/register',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('user_email', data.email)
          router.push({ name: 'Electronics' })
        })
        .catch((err) => {
          console.log(err.response)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.response.data.errors[0]
          })
        })
    },
    getProducts ({ commit }, payload) {
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('GET_PRODUCTS', data)
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    getBanners ({ commit }, payload) {
      axios({
        method: 'GET',
        url: '/banners',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('GET_BANNERS', data)
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    addToCart ({ commit }, payload) {
      axios({
        method: 'POST',
        url: `/carts/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'Added to Cart'
          })
          this.dispatch('getCarts')
        })
        .catch((err) => {
          console.log(err.response)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.response.data.errors[0]
          })
        })
    },
    getCarts ({ commit }, payload) {
      axios({
        method: 'GET',
        url: '/carts',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('GET_CARTS', data)
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    deleteCart ({ commit }, payload) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            method: 'DELETE',
            url: `/carts/${payload}`,
            headers: {
              access_token: localStorage.access_token
            }
          })
            .then(({ data }) => {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              Toast.fire({
                icon: 'success',
                title: 'Removed from Cart'
              })
              this.dispatch('getCarts')
            })
            .catch((err) => {
              console.log(err.response)
            })
        }
      })
    },
    checkout ({ commit }, payload) {
      Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2']
      }).queue([
        {
          title: 'Credit Card',
          text: 'Please insert your CC number'
        },
        {
          title: 'Shipping Address',
          text: 'Please insert a valid address'
        }
      ]).then((result) => {
        if (result.value) {
          axios({
            method: 'POST',
            url: `/carts/checkout/${payload}`,
            headers: {
              access_token: localStorage.access_token
            },
            data: {
              totalPrice: this.getters.totalPrice
            }
          })
            .then(({ data }) => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Checkout success!',
                showConfirmButton: false,
                timer: 3000
              })
              this.dispatch('getCarts')
            })
            .catch((err) => {
              console.log(err.response)
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.response.data.errors[0]
              })
            })
        }
      })
    },
    subtractFromCart ({ commit }, payload) {
      axios({
        method: 'PUT',
        url: `/carts/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'Removed 1 from Cart'
          })
          this.dispatch('getCarts')
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    preOrder ({ commit }, payload) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Pre-Order success!',
        showConfirmButton: false,
        timer: 3000
      })
    },
    getWishlists ({ commit }, payload) {
      axios({
        method: 'GET',
        url: '/wishlists',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          commit('GET_WISHLISTS', data)
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
    removeFromWishlist ({ commit }, payload) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            method: 'DELETE',
            url: `/wishlists/${payload}`,
            headers: {
              access_token: localStorage.access_token
            }
          })
            .then(({ data }) => {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              Toast.fire({
                icon: 'success',
                title: 'Removed from Wishlist'
              })
              this.dispatch('getWishlists')
            })
            .catch((err) => {
              console.log(err.response)
            })
        }
      })
    },
    addToWishlist ({ commit }, payload) {
      axios({
        method: 'POST',
        url: `/wishlists/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'Added to Wishlist'
          })
          this.dispatch('getWishlists')
        })
        .catch((err) => {
          console.log(err.response)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.response.data.errors[0]
          })
        })
    },
    checkoutAll ({ commit }, payload) {
      Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2']
      }).queue([
        {
          title: 'Credit Card',
          text: 'Please insert your CC number'
        },
        {
          title: 'Shipping Address',
          text: 'Please insert a valid address'
        }
      ]).then((result) => {
        if (result.value) {
          axios({
            method: 'POST',
            url: 'carts/checkoutall',
            headers: {
              access_token: localStorage.access_token
            },
            data: {
              activeCarts: this.getters.activeCarts,
              totalPrice: this.getters.totalPrice
            }
          })
            .then(({ data }) => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Checkout success!',
                showConfirmButton: false,
                timer: 3000
              })
              this.dispatch('getCarts')
            })
            .catch((err) => {
              console.log(err.response)
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.response.data.errors[0]
              })
            })
        }
      })
    },
    googleLogin ({ commit }, payload) {
      axios({
        method: 'POST',
        url: '/googleLogin',
        headers: {
          google_access_token: payload
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('user_email', data.email)
          console.log(data)
          router.push({ name: 'Electronics' })
        })
        .catch((err) => {
          console.log(err, '<<<< error google login')
        })
    }
  },
  modules: {
  },
  getters: {
    activeBanners: (state) => {
      return state.banners.filter((banner) => banner.status === true)
    },
    totalPrice: (state) => {
      let totalPrice = 0
      state.carts.forEach((cart) => {
        if (cart.status === false) {
          totalPrice += cart.Product.price * cart.quantity
        }
      })
      return totalPrice
    },
    activeCarts: (state) => {
      return state.carts.filter((cart) => cart.status === false)
    },
    histories: (state) => {
      return state.carts.filter((cart) => cart.status === true).sort((a, b) => {
        if (a.updatedAt > b.updatedAt) {
          return 1
        } else {
          return -1
        }
      })
    },
    electronics: (state) => {
      return state.products.filter((product) => product.category === 'Electronics')
    },
    books: (state) => {
      return state.products.filter((product) => product.category === 'Books')
    },
    clothes: (state) => {
      return state.products.filter((product) => product.category === 'Clothes')
    },
    shoes: (state) => {
      return state.products.filter((product) => product.category === 'Shoes')
    }
  }
})
