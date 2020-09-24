<template>
    <section class="section">
        <section class="hero is-primary">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title">
                        My Cart
                    </h1>
                </div>
            </div>
        </section>
        <div class="container mt-3 carts-container">
            <Cart v-for="cart in carts" :key="cart.id" :cart="cart" />
        </div>
        <template>
            <b-navbar type="is-light" :fixed-bottom="true" :centered="true">
                <template slot="start">
                    <h1 class="title">Total: {{ cartTotal | currency }}</h1>
                </template>
            </b-navbar>
        </template>
    </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Cart from '@/components/Cart.vue';

export default {
    name: 'Carts',
    title: 'My Cart',

    components: {
        Cart,
    },

    computed: {
        ...mapState({
            carts: state => state.carts.carts,
        }),

        cartTotal() {
            let total = 0;

            this.carts.forEach(cart => {
                total = total + cart.quantity * cart.Product.price;
            });

            return total;
        },
    },

    methods: {
        ...mapActions({
            fetchCarts: 'carts/fetchCarts',
        }),
    },

    created() {
        this.fetchCarts();
    },
};
</script>

<style>
.carts-container {
    max-width: 800px;
}
</style>
