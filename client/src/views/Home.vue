<template>
  <div class="home container">
    <h1 class="text-left m-3">E-Commerce</h1><hr />
    <p class="text-left">Welcome, <mark>{{ username }}</mark>!</p>
    <h3 class="m-2 text-left">Available Products :</h3>
    <div class="row">
      <ProductCard v-for="product in products" :key="product.id" :product="product"></ProductCard>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
export default {
  name: 'Home',
  components: {
    ProductCard
  },
  computed: {
    username () {
      return localStorage.getItem('username')
    },
    products () {
      return this.$store.state.products
    }
  },
  created () {
    if (!localStorage.getItem('access_token')) {
      this.$store.commit('CHANGE_LOGIN_STATUS', false)
    }
    this.$store.commit('CHANGE_LOGIN_STATUS', true)
    this.$store.dispatch('fetchProducts')
    this.$store.dispatch('fetchCart')
      .then(({ data }) => {
        this.$store.commit('UPDATE_CART', data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  beforeRouteEnter (to, from, next) {
    if (!localStorage.getItem('access_token')) {
      return next('/login')
    }
    return next()
  }
}
</script>
