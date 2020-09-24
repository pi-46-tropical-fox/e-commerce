import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/main/Index.vue'
import Dashboard from '../views/main/Dashboard/Dashboard.vue'
import Cart from '../views/main/Cart/Cart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Index,
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: '/cart',
        name: 'Cart',
        component: Cart,
        beforeEnter: (to, from, next) => {
          if(!localStorage.getItem('access_token')) {
            next({
              name : 'Login'
            })
          } else {
            next()
          }
        },
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/Login.vue'),
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('access_token')) {
        next({
          path: '/'
        })
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/Register.vue'),
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('access_token')) {
        next({
          path: '/'
        })
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

export default router
