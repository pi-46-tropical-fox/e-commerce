<template>
  <div class="container">
      <Loading v-if="$store.state.loadingStatus"/>
      <div class="card">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total Price</th>
                </tr>
            </thead>
                <tbody>
                <CartCard v-for="(cart, index) in data" :key="index"
                    :cart="cart" :number="index"  @removeData="removeItem"> </CartCard>
                </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import Loading from '../components/Loading.vue'
import CartCard from '../components/CartCard.vue'
export default {
    name: 'Cart',
    components: {
        CartCard,
        Loading
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
            console.log(this.data);
            this.data = this.data.filter(e => e.id !== id)
        },
        // filterCategories () {
        //   this.data.products = this.data.products.filter(item => item.category === this.category)
        // },
    },
    created () {
        this.fetchCarts()
    }


}
</script>

<style>

</style>