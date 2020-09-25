import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'

Vue.use(VueRouter)

const publicRoutes = [
  'Auth', 'Home', 'Products', 'ProductDetails'
]

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: () => import(/* webpackChunkName: "wishlist" */ '../views/Wishlist.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Auth' && localStorage.access_token) next({ name: 'Home' })
  else if (!publicRoutes.includes(to.name) && !localStorage.access_token) next({ name: 'Auth' })
  else next()
})

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

// function checkAuth(to, from, next) {
//   if (!localStorage.access_token) next({ name: 'Auth' })
//   else next()
// }

export default router
