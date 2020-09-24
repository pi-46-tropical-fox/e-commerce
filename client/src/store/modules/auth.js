import Axios from '@/config/axios.js';

const auth = {
    namespaced: true,
    state: {
        isAuthenticated: false,
    },
    mutations: {
        SET_isAuthenticated(state, payload) {
            state.isAuthenticated = payload;
        },
    },
    actions: {
        signup(context, payload) {
            return Axios({
                url: '/register',
                method: 'POST',
                data: {
                    email: payload.email,
                    password: payload.password,
                },
            });
        },
        signin(context, payload) {
            return Axios({
                url: '/login',
                method: 'POST',
                data: {
                    email: payload.email,
                    password: payload.password,
                },
            });
        },
        checkAuthenticated({ commit }) {
            if (localStorage.getItem('access_token')) {
                commit('SET_isAuthenticated', true);
            } else {
                commit('SET_isAuthenticated', false);
            }
        },
    },
};

export default auth;
