<template>
    <div class="container">
        <div class="container my-3">
            <CartItem v-for="cartItem in cart" :key="cartItem.id" :data="cartItem" />
            <!-- <ProductItem/> -->
            <!-- <div class=""></div> -->
        </div>
        <div class="container my-3">
            <h1>Total Rp {{total}}</h1>
            <button class="btn btn-primary" @click.prevent="checkout">Checkout</button>
        </div>
        
    </div>
</template>

<script>
import CartItem from '../components/CartItem'

export default {
    components : {
        CartItem
    },
    computed:{
        total(){
            let total = 0;
            this.cart.forEach(e => {
                total += e.quantity * e.Product.price
            })

            return total
        },
        cart(){
            return this.$store.state.cart
        }
    },
    methods:{
        checkout(){
            this.$store.dispatch('checkout')
        }
    },
    created(){
        this.$store.dispatch('fetchCart')
    }
}
</script>
