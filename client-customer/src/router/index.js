import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home'
import Checkout from '../views/Checkout'
import FilteredProducts from '../views/FilteredProducts'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('access_token')) {
        next()
      } else {
        next('/home')
      }
    }
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('access_token')) {
        next()
      } else {
        next('/home')
      }
    }
  },
  {
    path:'/home',
    name: 'Home',
    component: Home,
     beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path:'/checkout',
    name: 'Checkout',
    component: Checkout,
     beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/category/:category',
    name: 'Filtered',
    component: FilteredProducts,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/')
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
