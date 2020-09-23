import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Product from '../views/Product.vue'
import Cart from '../views/Cart.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.access_token) {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (localStorage.access_token) {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
    beforeEnter: (to, from, next) => {
      if (!localStorage.access_token) {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    beforeEnter: (to, from, next) => {
      if (!localStorage.access_token) {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login' && !localStorage.access_token) next({ name: 'Login' })
//   else if (to.name === 'Login' && localStorage.access_token) next({ name: 'Home' })
//   else next()
// })

export default router
