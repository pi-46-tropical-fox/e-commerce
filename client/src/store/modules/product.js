import Axios from '@/config/axios';

const products = {
    namespaced: true,
    state: {
        products: [],
    },
    mutations: {
        setProducts(state, payload) {
            state.products = payload;
        },
    },
    actions: {
        fetchProducts({ commit }) {
            Axios({
                method: 'GET',
                url: '/products',
            })
                .then(({ data }) => {
                    commit('setProducts', data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
    },
};

export default products;
