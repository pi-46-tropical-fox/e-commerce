<template>
<div>
  <Navbar></Navbar>
  <div class="container mt-4">
    <div class="row">
      <Cart
        v-for="cart in carts"
        :key="cart.id"
        :cart="cart"
      ></Cart>
    </div>
    <div class="container mt-5" style="width: 200px">
      <a @click.prevent="checkout" class="btn btn-info" style="width: 100%">Checkout</a>
    </div>
  </div>
</div>
</template>

<script>
import Cart from './Cart'
import Navbar from './Navbar'
export default {
  components: {
    Cart,
    Navbar
  },
  computed: {
    carts(){
      return this.$store.state.cartList
    }
  },
  methods: {
    checkout(){
      this.$store.dispatch("checkout")
    }
  },
  created(){
    this.$store.dispatch("showCart")
  }
}
</script>

<style>

</style>
