import Axios from '@/config/axios';

const carts = {
    namespaced: true,
    state: {
        carts: [],
    },
    mutations: {
        setCarts(state, payload) {
            state.carts = payload;
        },
    },
    actions: {
        fetchCarts({ commit }) {
            Axios({
                method: 'GET',
                url: '/carts',
                headers: {
                    access_token: localStorage.getItem('access_token'),
                },
            })
                .then(({ data }) => {
                    commit('setCarts', data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        addToCart(context, productId) {
            return Axios({
                method: 'POST',
                url: `/carts/${productId}`,
                headers: {
                    access_token: localStorage.getItem('access_token'),
                },
            });
        },
        updateCart(context, { cartId, quantity }) {
            return Axios({
                method: 'PUT',
                url: `/carts/${cartId}`,
                headers: {
                    access_token: localStorage.getItem('access_token'),
                },
                data: {
                    quantity: Number(quantity),
                },
            });
        },
        deleteCart(context, cartId) {
            return Axios({
                method: 'DELETE',
                url: `/carts/${cartId}`,
                headers: {
                    access_token: localStorage.getItem('access_token'),
                },
            });
        },
    },
};

export default carts;
