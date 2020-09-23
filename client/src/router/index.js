import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Cart from '../views/Cart.vue'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// LOGIN Validation
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('access_token')) {
    if (to.name == 'Login') {
      next()
    } else if (to.name == 'Register') {
      next()
    } else if (to.name !== 'Login' || to.name !== 'Register') {
      next({ name: 'Login'})
    }
    // next({ name: 'Login' })
  } else if (to.name == 'Login' && localStorage.getItem('access_token')) {
    next({ name: 'Home'})
  } else next()
})

export default router
