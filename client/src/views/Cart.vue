<template>
  <div class="container">
    <div class="row justify-content-center">
      {{ carts }}
      <h3>Shopping Cart</h3>
    </div>
    <CartCard
      v-for="cart in carts"
      :key="cart.id"
      :cartsData="cart">
    </CartCard>
    <div class="card border-success mb-3 mt-3 mw-100" style="max-width: 18rem;">
      <div class="card-header" role="button">Checkout</div>
      <div class="card-body text-success">
        <div class="row" v-for="cart in carts" :key="cart.id">
          <div class="col text-left">
            <p class="card-text">{{ cart.Product.name }}</p>
          </div>
          <div class="col text-right">
            <p class="card-text">Rp. {{ cart.Product.price.toLocaleString('id-ID') }} X {{ cart.quantity }}</p>
          </div>
        </div> <hr>
        <div class="row">
          <div class="col text-left">
            <h5 class="card-text">Grand Total</h5>
          </div>
        <div class="col text-right">
          <h5 class="card-text">Rp. {{ total }}</h5>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import CartCard from '../components/CartCard.vue'
export default {
  name: 'Cart',
  components: { CartCard },
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCart')
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    total () {
      let result = 0
      this.$store.state.carts.forEach(cart => {
        result += (cart.quantity * cart.Product.price)
      })
      return result.toLocaleString('id-ID')
    }
  },
  created () {
    this.fetchCart()
  }
}
</script>

<style>

</style>
