import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/Main.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Products from '../views/Products.vue'
import Cart from '../views/Cart.vue'
import Bill from '../components/Bill.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Main
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
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
      if (localStorage.getItem('access_token')) {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
    // beforeEnter: (to, from, next) => {
    //   if (localStorage.getItem('access_token')) {
    //     next()
    //   } else {
    //     next({ name: 'Home' })
    //   }
    // }
  },
  {
    path: '/carts',
    name: 'Cart',
    component: Cart,
    children: [
      {
        path: 'checkout',
        component: Bill
      }
    ]
    // beforeEnter: (to, from, next) => {
    //   if (localStorage.getItem('access_token')) {
    //     next()
    //   } else {
    //     next({ name: 'Home' })
    //   }
    // }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login' && !localStorage.getItem('access_token')) {
//     next({ name: 'Login' })
//   } else if (to.name === 'Login' && localStorage.getItem('access_token')) {
//     next({ name: 'Home' })
//   } else {
//     next()
//   }
// })

export default router
