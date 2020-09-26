import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Cart from '../views/Cart.vue'
import Wishlist from '../views/Wishlist.vue'
import EditCartItem from '../views/EditCartItem'
import History from '../views/History.vue'
import ProductGroup from '../components/ProductGroup.vue'
import ProductFilter from '../components/ProductFilter.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next('/')
      } else {
        next()
      }
    }
  },

  {
    path: '/Cart',
    name: 'Cart',
    component: Cart,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('access_token')) {
        next('/Login')
      } else {
        next()
      }
    }
  },
  {
    path: '/Wishlist',
    name: 'Wishlist',
    component: Wishlist,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('access_token')) {
        next('/Login')
      } else {
        next()
      }
    }
  },
  {
    path: '/History',
    name: 'History',
    component: History,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('access_token')) {
        next('/Login')
      } else {
        next()
      }
    }
  },
  {
    path: '/EditCartItem/:id',
    name: 'EditCartItem',
    component: EditCartItem
  },
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'Home',
        component: ProductGroup
      },
      {
        path: '/:filter',
        name: 'ProductFilter',
        component: ProductFilter
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
