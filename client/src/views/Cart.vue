<template>
  <div class="cart-page">
    <div class="cart-product-list">
          <!-- {{cartsData}} -->
      <ul class="list-group list-group-flush">
        <CartItemCard
          v-for="(cart, index) in cartsData"
          :key="index"
          :cart='cart'
          :index='index'/>
        <li class="list-group-item"><h1>Your cart is empty.</h1></li>
        <!-- <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Morbi leo risus</li>
        <li class="list-group-item">Porta ac consectetur ac</li>
        <li class="list-group-item">Vestibulum at eros</li> -->
      </ul>

    </div>
    <div class="cart-order-summary">
      <div class="cart-order-summary-card">
        <h3>Total Amount:</h3>
        <h5>Rp. {{totalAmount}}</h5>
        <button class="btn btn-secondary">Checkout</button>

      </div>
    </div>
  </div>
</template>

<script>
import CartItemCard from '../components/CartItemCard'
export default {
  name: 'Cart',
  components: {
    CartItemCard
  },
  computed: {
    cartsData: function () {
      return this.$store.state.cartsData
    },
    totalAmount () {
      if (this.cartsData.length > 0) {
        let totalAmount = 0
        this.cartsData.forEach(category => {
          totalAmount += (category.quantity * category.Product.price)
        })
        const price = String(totalAmount).split('')
        const result = []
        let j = price.length
        for (let i = 0; i <= price.length; i++) {
          result.unshift(price[j])
          j -= 1
          if (i % 3 === 0 && i !== 0 && i !== price.length) {
            result.unshift('.')
          }
        }
        totalAmount = result.join('')
        return totalAmount
      }
    }

  },
  created () {
    this.$store.dispatch('fetchCartsData')
  }
}
</script>

<style>

</style>
