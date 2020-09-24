import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import Carts from '../components/Carts.vue'
import History from '../components/History.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/carts',
    name: 'Carts',
    component: Carts
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('../components/Login.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../components/Register.vue')
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
