<template>
    <div class="column is-narrow">
        <div class="card product">
            <div class="card-image">
                <figure class="image product-image">
                    <img :src="product.image_url" />
                </figure>
            </div>
            <div class="card-content">
                <div class="content">
                    <p class="subtitle is-6 mb-5" v-if="!isLoading">
                        {{ product.Category.name }}
                    </p>
                    <h1 class="title is-5" v-if="!isLoading">
                        {{ product.name }}
                    </h1>
                    <p class="price subtitle is-5">
                        {{ product.price | currency }}
                    </p>
                    <b-skeleton
                        size="is-large"
                        :active="isLoading"
                    ></b-skeleton>

                    <b-button
                        @click.prevent="
                            addProductToCart(product.id, product.name)
                        "
                        expanded
                        icon-left="cart-plus"
                        type="is-primary"
                        outlined
                        >Add to cart</b-button
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import Swal from 'sweetalert2';

export default {
    name: 'Card',

    props: ['product', 'isLoading'],

    methods: {
        ...mapActions({
            addToCart: 'carts/addToCart',
        }),

        addProductToCart(productId, productName) {
            this.addToCart(productId)
                .then(() => {
                    this.$buefy.toast.open({
                        duration: 2000,
                        message: `Success added ${productName} to cart`,
                        position: 'is-bottom',
                        type: 'is-success',
                    });
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Please signup/signin',
                    });
                });
        },
    },
};
</script>

<style lang="scss">
.product {
    width: 230px;
    border-radius: 5px;
    overflow: hidden;
}
</style>
