<template>
  <div>
      <div class="header text-center p-4 ">
          <h1>List All Product</h1>
      </div>
      <Card
      :products="products">
      </Card>
  </div>
</template>

<script>
import Card from '../components/Card'
export default {
  name: 'Products',
  components: {
    Card
  },
  methods: {
    fetchProduct () {
      this.$store.dispatch('fetchProduct')
    },
    fetchCart () {
      this.$store.dispatch('fetchCart')
    }
  },
  created () {
    this.fetchProduct()
    if (localStorage.getItem('access_token')) {
      this.fetchCart()
    }
  },
  computed: {
    products () {
      for (const el of this.$store.state.products) {
        el.price = `Rp ${el.price.toLocaleString()}`
      }
      return this.$store.state.products
    }
  }
}
</script>

<style>

</style>
