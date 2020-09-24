<template>
  <div id="cart">
    <div class="actions">
      <button class="checkout">Checkout</button>
      <button class="checkout">Clear Cart</button>
    </div>
    <div class="data">
      <Table :cartProducts="cartProducts" />
    </div>
  </div>
</template>

<script>
import Table from '@/components/cart/Table.vue'

export default {
  name: 'Cart',
  components: {
    Table
  },

  computed: {
    cartProducts() {
      return this.$store.state.cart
    }
  },

  created(){
    this.$store.dispatch('getCart')
  }
}
</script>

<style>
button.checkout{
  @apply bg-red-500
}
</style>