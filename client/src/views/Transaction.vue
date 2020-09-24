<template>
  <div>
    <div v-if="transactions.length > 0">
      <div class="header text-center p-4">
            <h1>My History Transaction</h1>
      </div>
      <div class="container">
        <table class="table text-center">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Shipping Address</th>
                    <th scope="col">Total</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody class="table-bordered">
                <tr v-for="transaction in transactions" :key="transaction.id" class="mx-auto">
                    <td class="align-middle" >{{ transaction.description }}</td>
                    <td class="align-middle" >{{ transaction.shippingAddress }}</td>
                    <td class="align-middle" >Rp. {{ transaction.total.toLocaleString() }}</td>
                    <td class="align-middle" >{{ transaction.createdAt }}</td>
                    <td class="align-middle text-success" >{{ transaction.status }}</td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <div class="header text-center p-4">
            <h1>Your don't have any transaction</h1>
            <button class="btn btn-dark" @click.prevent="showListProduct">Make one</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Transaction',
  methods: {
    fetchTransaction () {
      this.$store.dispatch('fetchTransaction')
    },
    showListProduct () {
      this.$router.push({ name: 'Products' })
    }
  },
  created () {
    this.fetchTransaction()
  },
  computed: {
    transactions () {
      return this.$store.state.transactions
    }
  }
}
</script>

<style>

</style>
