import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import('../views/Signup.vue'),
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('access_token')) {
                next({ path: from.path });
            } else {
                next();
            }
        },
    },
    {
        path: '/signin',
        name: 'Signin',
        component: () => import('../views/Signin.vue'),
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('access_token')) {
                next({ path: from.path });
            } else {
                next();
            }
        },
    },
    {
        path: '/cart',
        name: 'Carts',
        component: () => import('../views/Carts.vue'),
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('access_token')) {
                next();
            } else {
                next('/signin');
            }
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

// router.beforeEach((to, from, next) => {
//     const isAuthenticated = () => localStorage.getItem('access_token')

//     if (to.path === '/signin' && isAuthenticated()) {
//         next('/login')
//     }else if (to.path !== '/signup' && !isAuthenticated()) {
//         next('/')
//     } else {
//         next()
//     }
// })

export default router;
