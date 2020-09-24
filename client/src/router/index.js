import Vue from 'vue'
import VueRouter from 'vue-router'
import Swal from 'sweetalert2'
import Product from '../views/Product.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/products',
    name: 'Product',
    component: Product
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Product' && !localStorage.access_token) {
    Swal.fire({
      title: 'Forbidden access',
      text: 'Only registered account allowed or try logging in',
      icon: 'warning',
      showConfirmButton: false,
      timer: 2000
    })
    next({ name: 'Login' })
  } else if (to.name === 'Login' && localStorage.access_token) {
    Swal.fire({
      title: 'Change Account?',
      text: 'Logging out is required',
      icon: 'info',
      showConfirmButton: false,
      timer: 2000
    })
    next({ name: 'Product' })
  } else {
    next()
  }
})

export default router
