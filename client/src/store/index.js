import Vue from 'vue';
import Vuex from 'vuex';

// import modules
import products from './modules/product.js';
import auth from './modules/auth.js';
import carts from './modules/carts.js';

Vue.use(Vuex);

export default new Vuex.Store({
    namespaced: true,
    state: {},
    mutations: {},
    actions: {},
    modules: {
        products,
        auth,
        carts,
    },
});
