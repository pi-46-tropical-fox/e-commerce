<template>
  <div class="container">
    <!-- <h1>This is a product page</h1> -->
    <div class="category" id="nav">
      <a href="#1" @click.prevent="all">All</a> |
      <a href="#2" @click.prevent="sport">Sport</a> |
      <a href="#3" @click.prevent="casual">Casual</a> |
      <a href="#4" @click.prevent="formal">Formal</a>
    </div>
      <div class="row col-centered">
        <Card v-for="product in productRp" :key="product.id" :product="product"></Card>
      </div>
  </div>
</template>

<script>
import Card from '../components/Card'
export default {
  name: 'Product',
  components: {
    Card
  },
  methods: {
    fetchProduct () {
      // console.log('masuk fetchproduct di product.vue')
      this.$store.dispatch('fetchProduct')
    },
    fetchCart () {
      this.$store.dispatch('fetchCart')
    },
    sport () {
      // console.log('masuk method')
      this.$store.dispatch('sport')
    },
    casual () {
      // console.log('masuk method')
      this.$store.dispatch('casual')
    },
    formal () {
      // console.log('masuk method')
      this.$store.dispatch('formal')
    },
    all () {
      // console.log('masuk method')
      this.$store.dispatch('all')
    }
  },
  created () {
    this.fetchProduct()
    this.fetchCart()
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    productRp () {
      this.products.forEach(el => {
        el.price = el.price.toLocaleString()
      })
      return this.products
    }
  }
}
</script>
<style scoped>
.col-centered{
  display: inline-block;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 20px;
}
.container{
  margin-top: 60px;
}
</style>
