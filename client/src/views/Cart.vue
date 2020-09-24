<template>
<section class="projects-section bg-light min-vh-100">
  <div class="container">
      <Loading v-if="$store.state.loadingStatus"/>
      <div class="card">
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total Price</th>
                    <th></th>
                </tr>
            </thead>
                <tbody>
                <CartCard v-for="(cart, index) in data" :key="index"
                    :cart="cart" :number="index"  @removeData="removeItem"> </CartCard>
                </tbody>
        </table>
      </div>
  </div>
    <Checkout :cart="data"> </Checkout>
</section>
</template>

<script>
import Loading from '../components/Loading.vue'
import CartCard from '../components/CartCard.vue'
import Checkout from '../components/Checkout.vue'
export default {
  name: 'Cart',
  components: {
    CartCard,
    Loading,
    Checkout
  },
  computed: {
    data () {
      return this.$store.state.carts
    }
  },
  methods: {
    fetchCarts () {
      this.$store.dispatch('fetchCarts')
    },
    removeItem (id) {
      this.data = this.data.filter(e => e.id !== id)
    }
  },
  created () {
    this.fetchCarts()
  }

}
</script>

<style>

</style>
