<template>
  <div>
    <div class="bill-modal">
      <div class="bill-modal-content">
        <span class="close-modal" @click.prevent="closeBillModal">&times;</span>
        <div class="row no-gutters">
          <div class="col-sm-6 col-md-8">
            <h2>Invoice <font-awesome-icon icon="shopping-cart" /> </h2>
          </div>
          <div class="col-6 col-md-4 text-right">
            <p class="font-weight-bold" style="margin: 0;">Gadget Space <span><font-awesome-icon icon="rocket" /></span></p>
            <p style="margin: 0;">Jakarta</p>
            <p style="margin: 0;">Indonesia</p>
          </div>
        </div>
        <table class="table table-borderless">
          <thead>
            <tr>
              <th scope="col">Items</th>
              <th class="text-center" scope="col">Qty</th>
              <th scope="col">Price</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cart in myCart.carts" :key="cart.ProductId">
              <td>{{ cart.Product.name }} {{ cart.Product.color }} {{ cart.Product.capacity }}</td>
              <td class="text-center">{{ cart.qty }}</td>
              <td>Rp. {{ cart.Product.price.toLocaleString() }}</td>
              <td>Rp. {{ (cart.qty * cart.Product.price).toLocaleString() }}</td>
              <td class="text-danger">{{ cart.status }}</td>
            </tr>
          </tbody>
        </table>
        <hr>
        <div class="row">
          <div class="col">
            <p class="font-weight-bold">Shipping Detail</p>
            <p style="margin: 0;"><span><font-awesome-icon icon="user" /></span> {{ $store.state.currentUser }}</p>
            <p style="margin: 0;"><span><font-awesome-icon icon="home" /></span> {{ $store.state.currentProfile.address }}</p>
            <p style="margin: 0;"><span><font-awesome-icon icon="phone" /></span> {{ $store.state.currentProfile.phone }}</p>
          </div>
          <div class="col text-right">
            <h1>Grand Total</h1>
            <h2>Rp. {{ myCart.grandTotal.price.toLocaleString() }}</h2>
            <button @click.prevent="payNow" class="btn btn-primary" >Pay Now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bill',
  methods: {
    closeBillModal () {
      this.$router.push({ name: 'Cart' })
    },
    payNow () {
      this.$store.dispatch('payNow')
    }
  },
  computed: {
    myCart () {
      return this.$store.state.myCart
    },
    profile () {
      return this.$store.state.currentProfile
    }
  }
}
</script>

<style>

</style>
