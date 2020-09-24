<template>
  <div class="home">
    <div class="container">
      <div class="row" v-for="(products, i) in chunkedProducts" v-bind:key="i">
        <div class="column" v-for="product in products" v-bind:key="product.id" :data="product">
          <ProductItem :data="product"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import chunk from 'chunk'
import ProductItem from '../components/ProductItem'

export default {
  name: 'Home',
  computed : {
    chunkedProducts(){
      return chunk(this.$store.state.products, 3)
    }
  },
  components: {
    ProductItem
  },
  created(){
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchCart')
  }
}
</script>
