import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Products from '../views/Products.vue'
import Carts from '../views/Carts.vue'
import Wishlists from '../views/Wishlists.vue'
import History from '../views/History.vue'
import Electronics from '../components/Electronics.vue'
import Books from '../components/Books.vue'
import Shoes from '../components/Shoes.vue'
import Clothes from '../components/Clothes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'electronics',
        name: 'Electronics',
        component: Electronics,
        meta: { requiresAuth: true }
      },
      {
        path: 'books',
        name: 'Books',
        component: Books,
        meta: { requiresAuth: true }
      },
      {
        path: 'shoes',
        name: 'Shoes',
        component: Shoes,
        meta: { requiresAuth: true }
      },
      {
        path: 'clothes',
        name: 'Clothes',
        component: Clothes,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/carts',
    name: 'Carts',
    component: Carts,
    meta: { requiresAuth: true }
  },
  {
    path: '/wishlists',
    name: 'Wishlists',
    component: Wishlists,
    meta: { requiresAuth: true }
  },
  {
    path: '/histories',
    name: 'History',
    component: History,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.access_token) {
      next({
        name: 'Login'
      })
    } else {
      next()
    }
  } else {
    if (localStorage.access_token) {
      next({
        name: 'Electronics'
      })
    } else {
      next() // make sure to always call next()!
    }
  }
})

export default router
