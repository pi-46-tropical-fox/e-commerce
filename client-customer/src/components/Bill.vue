<template>
  <div class="bill-container">
      <div class="total">
          <BillPrice
          v-for="(item, i) in items"
          :key="i"
          :item='item'
          ></BillPrice>
      </div>
  </div>
</template>

<script>
import BillPrice from '../components/BillPrice'
export default {
  name: 'Bill',
  components: {
    BillPrice
  },
  methods: {
    calculateBill () {
      let res = 0
      this.$store.state.cartItems.forEach(product => {
        console.log(product)
        const price = product.Product.price
        const quantity = product.quantity
        const output = price * quantity
        res += output
      })
    },
    checkout (payload) {
      console.log(payload, '<<< payload dari cehckout btn')
    }
  },
  computed: {
    items () {
      return this.$store.state.cartItems
    }
  }
}
</script>

<style>
.bill-container {
 padding:5px;
 width: 90%;
 color: antiquewhite;
}
.total {
    max-height: 100%;
    overflow: scroll;
}
</style>
