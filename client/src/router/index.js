import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/',
        name: 'Product',
        component:() => import('../components/itemCard.vue')
      },
      // {
      //   path:'/cart',
      //   name: 'Cart',
      //   component:() => import('../views/Cart.vue')
      // }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    children:[
      {
        path: '/login',
        name: 'Login',
        component: () => import('../components/login.vue')
      }
    ]
  },
  {
    path:'/cart',
    name: 'Cart',
    component:() => import('../views/Cart.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../components/checkout.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Cart' && !localStorage.getItem('access_token')) {
    next('/login')
  } else {
    next()
  }
})

export default router
