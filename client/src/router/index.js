import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginPage from '../views/LoginPage.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import DetailProduct from '../components/DetailProduct.vue'
import Cart from '../views/Cart.vue'
import Headerboard from '../views/Headerboard.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        component: Headerboard
      },
      {
        path: 'products',
        component: Dashboard
      },
      {
        path: 'cart',
        component: Cart
      },
      {
        path: 'product/:id',
        component: DetailProduct
      }
    ],
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next()
      } else {
        next('/user')
      }
    }
  },
  {
    path: '/user',
    name: 'LoginPage',
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next('/')
      } else {
        next()
      }
    },
    children: [
      {
        path: '',
        component: Login
      },
      {
        path: 'login',
        component: Login
      },
      {
        path: 'register',
        component: Register
      }
    ]
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

export default router
