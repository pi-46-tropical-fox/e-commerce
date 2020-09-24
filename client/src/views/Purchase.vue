<template>
<div>
  <Navbar />
  <div class="container mt-5">
   <div class="container d-flex justify-content-center mb-3">
    <h2>Purchased History</h2>
  </div>
    <div class="row">
      <div class="col">
        <table class="table">
          <thead>
            <tr style="text-align:center;font-weight:bold;">
              <th scope="col">Image</th>
              <th scope="col">Product</th>
              <th scope="col">Amount</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr class="p" v-for="cart in carts" :key="cart.id">
              <td class="image"><img :src="cart.Product.image_url" style="width: 20rem; height: 15rem"/></td>
              <td class="name">{{cart.Product.name}}</td>
              <td class="amount">{{cart.amount}}</td>
              <td class="pricetotal">Rp. {{new Number(cart.Product.price * cart.amount).toLocaleString("id-ID")}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Navbar from '../components/Navbar'
export default {
  name: 'Purchase',
  data () {
    return {}
  },
  computed: {
    carts () {
      return this.$store.state.history
    }
  },
  components: {
    Navbar
  },
  created () {
    this.$store.dispatch('fetchHistory')
  }
}
</script>

<style>

</style>
