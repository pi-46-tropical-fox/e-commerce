import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'Product',
        component: () => import('../components/products.vue')
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/cart.vue')
      },
      {
        path: '/purchased',
        name: 'purchased',
        component: () => import('../components/purchased.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue'),
    children: [
      {
        path: '/login',
        name: 'loginForm',
        component: () => import('../components/loginForm.vue')
      },
      {
        path: '/register',
        name: 'registerForm',
        component: () => import('../components/registerForm.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Cart' && !localStorage.getItem('access_token'))next('/login')
  else next()
})
router.beforeEach((to, from, next) => {
  if (to.name === 'purchased' && !localStorage.getItem('access_token'))next('/login')
  else next()
})

export default router
