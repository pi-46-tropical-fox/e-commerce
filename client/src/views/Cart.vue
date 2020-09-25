<template>
    <div class="container">
        <div v-if="cart.length !== 0">
            <div class="container my-3">
                <div >
                    <CartItem v-for="cartItem in cart" :key="cartItem.id" :data="cartItem" />
                </div>
            </div>
            <div class="container my-3">
                <h1>Total Rp {{total}}</h1>
                <button class="btn btn-primary" @click.prevent="checkout">Checkout</button>
            </div>
        </div>
        <div v-else>
            <p>Cart Empty</p>
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
            this.$store.dispatch('checkout').then(() => {
                this.$swal.fire({ icon : 'success', title: 'Checkout Berhasil! Thank you for shopping 😊' })
            })
        }
    },
    created(){
        this.$store.dispatch('fetchCart')
    }
}
</script>
