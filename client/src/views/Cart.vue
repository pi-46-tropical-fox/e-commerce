<template>
    <div class="container my-3">
        <CartItem v-for="cartItem in cart" :key="cartItem.id" :data="cartItem" />
        <!-- <ProductItem/> -->
        <!-- <div class=""></div> -->
        <button class="btn btn-primary">Checkout</button>
    </div>
</template>


<script>
import CartItem from '../components/CartItem'

export default {
    components : {
        CartItem
    },
    computed:{
        cart(){
            return this.$store.state.cart
        }
    },
    created(){
        this.$store.dispatch('fetchCart')
    }
}
</script>
