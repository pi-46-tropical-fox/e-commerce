<template>
  <div>
    <Navbar></Navbar>
    <div class="container pt-5">
      <h4 class="mt-5" v-if="histories.length === 0">There is no shopping history yet.</h4>
      <table class="table table-striped mt-5" v-else>
        <thead class="thead-dark">
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Unit Price</th>
            <th scope="col">Checkout</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(history, index) in histories" :key="history.id">
            <td>{{ index+1 }}</td>
            <td>{{ history.Product.name }}</td>
            <td>{{ history.quantity }}</td>
            <td>Rp.{{ Number(history.Product.price).toLocaleString('de-DE') }}</td>
            <td>Rp.{{ Number(history.Product.price * history.quantity).toLocaleString('de-DE') }}</td>
            <td>{{ new Date (history.updatedAt).toISOString().split('T')[0] }} {{ new Date (history.updatedAt).toISOString().split('T')[1].slice(0,8) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
export default {
  name: 'History',
  components: {
    Navbar,
    Footer
  },
  computed: {
    histories () {
      return this.$store.getters.histories
    }
  },
  created () {
    this.$store.dispatch('getCarts')
  }
}
</script>

<style>

</style>
