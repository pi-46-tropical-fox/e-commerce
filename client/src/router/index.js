import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Cart from '../views/Cart.vue'
import Purchase from '../views/Purchase.vue'

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
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/purchase',
    name: 'Purchase',
    component: Purchase
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Home' && !localStorage.getItem('access_token'))next('/login')
  else next()
})
router.beforeEach((to, from, next) => {
  if (to.name === 'Cart' && !localStorage.getItem('access_token'))next('/login')
  else next()
})
router.beforeEach((to, from, next) => {
  if (to.name === 'Purchase' && !localStorage.getItem('access_token'))next('/login')
  else next()
})

export default router
