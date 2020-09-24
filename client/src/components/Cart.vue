<template>
    <div class="box">
        <article class="media">
            <figure class="media-left">
                <figure class="image card-image">
                    <img :src="cart.Product.image_url" />
                </figure>
            </figure>
            <div class="media-content">
                <div class="content">
                    <strong>{{ cart.Product.name }}</strong>
                    <p>Price: {{ cart.Product.price | currency }}</p>
                </div>
                <nav class="level is-mobile">
                    <div class="level-left">
                        <b-numberinput
                            v-model="cart.quantity"
                            min="0"
                            :max="cart.Product.stock"
                            controls-position="compact"
                        />
                    </div>
                </nav>
            </div>
            <div class="media-right">
                <a @click.prevent="removeCart(cart.id)">
                    <span class="icon has-text-danger"
                        ><i class="fas fa-trash"></i
                    ></span>
                </a>
            </div>
        </article>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import Swal from 'sweetalert2';

export default {
    name: 'Cart',

    props: ['cart'],

    watch: {
        cart: {
            handler(newVal, oldVal) {
                if (oldVal) {
                    this.updateCart({
                        cartId: newVal.id,
                        quantity: newVal.quantity,
                    });
                }
            },
            deep: true,
            immediate: true,
        },
    },

    methods: {
        ...mapActions({
            deleteCart: 'carts/deleteCart',
            fetchCarts: 'carts/fetchCarts',
            updateCart: 'carts/updateCart',
        }),
        removeCart(cartId) {
            this.deleteCart(cartId)
                .then(() => {
                    this.fetchCarts();
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: err.response.data.errors.message,
                    });
                });
        },
    },
};
</script>

<style>
.card-image {
    max-width: 200px;
}
</style>
