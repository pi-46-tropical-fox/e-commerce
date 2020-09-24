import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Men from '../views/Men.vue'
import Women from '../views/Women.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Details from '../views/Details.vue'
import Cart from '../views/Cart.vue'
import Swal from 'sweetalert2'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/men',
    name: 'Men',
    component: Men
  },
  {
    path: '/women',
    name: 'Women',
    component: Women
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: Details
  },
  {
    path: '/cart/',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if ((to.name === 'Login' && localStorage.access_token)) {
    Swal.fire({
      title: 'Change Account?',
      text: 'Logging out is required',
      icon: 'info',
      showConfirmButton: false,
      timer: 2000
    })
    // next({ name: 'Home' })
  } else if (to.name === 'Register' && localStorage.access_token) {
    Swal.fire({
      title: 'Create an Account?',
      text: 'Logging out is required',
      icon: 'info',
      showConfirmButton: false,
      timer: 2000
    })
    // next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
