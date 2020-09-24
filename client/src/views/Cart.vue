<template>
  <v-container>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Product</th>
          <th scope="col">Product Name</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Subtotal</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <!-- {{carts}} -->
        <tr>
          <CartItem :key="cart.id" v-for="(cart, i) in carts" :cart="cart" :index="i"></CartItem>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>Total</td>
          <td>{{new Number(price).toLocaleString("id-ID")}}</td>
          <td><v-btn>Checkout</v-btn></td>
        </tr>
      </tbody>
    </table>
  </v-container>
</template>

<script>
import CartItem from '@/components/CartItem'
export default {
  name: 'Cart',
  components: {
    CartItem
  },
  computed: {
    carts () {
      const carts = this.$store.state.carts
      let temp = 0
      carts.forEach(element => {
        temp += element.price * element.Cart.quantity
      })
      this.price = temp
      this.product = carts
      return carts
    }
  },
  created () {
    this.$store.dispatch('fetchCarts')
  }
}
</script>
<style>

</style>
