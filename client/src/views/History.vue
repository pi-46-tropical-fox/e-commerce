<template>
  <div class="invoice">
    <h3>Purchase History</h3>
    <b-table striped hover :items="histories"></b-table>
  </div>
</template>

<script>
export default {
  computed: {
    data: {
      get () {
        return this.$store.state.histories
      }
    },
    histories () {
      const result = []
      this.data.forEach(datum => {
        result.push({
          Invoice: datum.invoice,
          Product: datum.Product.name,
          Quantity: datum.quantity,
          Price: `Rp. ${datum.Product.price.toLocaleString()}`,
          Total: `Rp. ${(datum.quantity * datum.Product.price).toLocaleString()}`
        })
      })
      return result
    }
  },
  created () {
    this.$store.dispatch('fetchHistories')
  }
}
</script>

<style>
.invoice {
  margin: 30px;
}
</style>
