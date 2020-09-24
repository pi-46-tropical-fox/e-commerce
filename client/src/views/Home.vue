<template>
    <section class="section">
        <div class="container">
            <b-carousel :interval="3000">
                <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
                    <section :class="`hero is-medium is-${carousel.color}`">
                        <div class="hero-body has-text-centered">
                            <h1 class="title">{{ carousel.text }}</h1>
                        </div>
                    </section>
                </b-carousel-item>
            </b-carousel>
        </div>
        <div class="container">
            <div class="columns products">
                <Card
                    v-for="product in products"
                    :key="product.id"
                    :product="product"
                    :isLoading="isLoading"
                />
            </div>
        </div>
    </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Card from '@/components/Card.vue';

export default {
    name: 'Home',

    title: 'Home',

    components: {
        Card,
    },

    data() {
        return {
            isLoading: true,
            carousels: [
                { text: 'Welcome to bookstore', color: 'primary' },
                {
                    text:
                        'If you don’t like to read, you haven’t found the right book. – J.K. Rowling',
                    color: 'primary',
                },
            ],
        };
    },

    methods: {
        ...mapActions({
            fetchProducts: 'products/fetchProducts',
        }),
    },

    computed: {
        ...mapState({
            products: state => state.products.products,
        }),
    },

    created() {
        this.fetchProducts();
    },

    mounted() {
        this.isLoading = false;
    },
};
</script>

<style lang="scss">
.products {
    margin: 20px !important;
    flex-wrap: wrap;
}
</style>
