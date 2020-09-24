import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Products from '../views/Products.vue'
import ProductCards from '../components/ProductCard.vue'
import Cart from '../views/Cart.vue'
import CartCard from '../components/CartCard'
import PaidCard from '../components/PaidCard'

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
    path: '/products',
    name: 'Products',
    component: Products,
    children: [
      {
        path: ':categoryId',
        name: 'Product Per Category',
        component: ProductCards
      }
    ]
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    children: [
      {
        path: 'unpaid',
        name: 'Unpaid Products',
        component: CartCard
      },
      {
        path: 'paid',
        name: 'Paid Products',
        component: PaidCard
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
