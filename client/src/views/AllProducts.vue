<template>
    <section class="d-flex flex-column">
            <div class="text-center my-5">
                <h1 style="font-family: 'Bungee', cursive;">Products</h1>
            </div>
            <div>
                <div class="container my-3">
                    <div class="row">
                        <Products
                        v-for="(product, idx) in products"
                        :key="idx" :product="product"></Products>
                    </div>
                </div>
            </div>
    </section>
</template>

<script>
import Products from '../components/Products.vue'

export default {
  name: 'AllProducts',
  components: {
    Products
  },
  computed: {
    products () {
      if (this.$route.params.name === 'Fashion') {
        return this.$store.getters.fashionProducts
      } 
      if (this.$route.params.name === 'Game') {
        return this.$store.getters.gameProducts
      } 
      if (this.$route.params.name === 'Electronic & Gadget') {
        return this.$store.getters.electronicProducts
      } 
      if (this.$route.params.name === 'Book') {
        return this.$store.getters.bookProducts
      }
      if (this.$route.params.name === 'Voucher') {
        return this.$store.getters.voucherProducts
      }  
      if (this.$route.params.name === 'Food & Drink') {
        return this.$store.getters.foodProducts
      } 
      if (!isNaN(this.$route.params.name)) {
        return this.$store.state.filteredProducts
      }
      return this.$store.state.products
    }
  },
  created () {
    this.$store.dispatch('showProducts')
  }
}
</script>

<style>

</style>
