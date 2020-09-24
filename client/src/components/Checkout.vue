<template>
  <div class="checkout">
    <div style="height:10em;overflow-y:scroll;">
      <table style="margin: 0 auto;">
        <thead>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Price</th>
        </thead>
        <tbody style="text-align:center;">
          <tr v-for="cart in carts.cart" :key="cart.id">
            <td>{{ cart.Product.name }}</td>
            <td>{{ cart.quantity }}</td>
            <td>${{ cart.Product.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr style="margin-top:1em;width:15em;" />
    <div class="total">
      <div class="summary">
        <p>Total Price : {{ carts.totalPrice }}</p>
        <p>Total Item : {{ carts.totalItem }}</p>
      </div>
      <md-button v-if="!notEnough" style="margin-top:-0.4em" @click="checkout">Checkout <md-icon>shopping_cart</md-icon> </md-button>
      <md-button v-else>Stock Not Enough</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Checkout",
  props: {
    carts: Object,
    notEnough: Number
  },
  methods: {
    checkout() {
      this.$emit('checkout')
    }
  }
};
</script>

<style>
.checkout {
  margin: 2em 0;
}

.summary {
  display: flex;
  justify-content: space-evenly;
}

.total {
  text-align: center;
}
</style>
