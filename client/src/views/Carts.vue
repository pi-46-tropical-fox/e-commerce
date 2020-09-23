<template>
  <div>
    <Navbar></Navbar>
    <div class="container pt-5 mb-5">
      <div class="row">
        <div class="col-10 ">
          <div class="row">
            <div class="col-4 mt-5" v-for="cart in activeCarts" :key="cart.id">
              <div class="card" style="width: 18rem;">
                <img :src="cart.Product.image_url" class="card-img-top" alt="product">
                <div class="card-body">
                  <h5 class="card-title">{{ cart.Product.name }}</h5>
                  <p class="card-text">Ordered: {{ cart.quantity }}</p>
                  <p class="card-text">Unit price: Rp.{{ Number(cart.Product.price).toLocaleString('de-DE') }}</p>
                  <p class="card-text">Checkout: <span class="lead"><span class="badge badge-danger">Rp.{{ Number(cart.Product.price * cart.quantity).toLocaleString('de-DE') }}</span></span></p>
                  <p class="card-text"><span class="badge badge-warning">{{ cart.Product.stock }}</span> left in stock</p>
                  <div class="btn-group-vertical mr-2">
                  <a href="#" class="btn btn-sm btn-warning" @click.prevent="addOne(cart.Product.id)">+ Qty</a>
                  <a href="#" class="btn btn-sm btn-dark" @click.prevent="subtractOne(cart.id)">- Qty</a>
                  </div>
                  <a href="#" class="btn btn-sm btn-primary mr-2" @click.prevent="checkout(cart.id)">Checkout</a>
                  <a href="#" class="btn btn-sm btn-dark" @click.prevent="deleteCart(cart.id)">Remove</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-2 mt-5" v-if="activeCarts.length > 0">
          <h4 class="card-text">Checkout: <h4 class="badge badge-danger">Rp.{{ Number(totalPrice).toLocaleString('de-DE') }}</h4></h4>
          <a href="#" class="btn btn-lg btn-primary" @click.prevent="checkoutAll">Checkout All</a>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
export default {
  name: 'Carts',
  components: {
    Navbar,
    Footer
  },
  computed: {
    activeCarts () {
      return this.$store.getters.activeCarts
    },
    totalPrice () {
      return this.$store.getters.totalPrice
    }
  },
  created () {
    this.$store.dispatch('getCarts')
  },
  methods: {
    deleteCart (cartId) {
      this.$store.dispatch('deleteCart', cartId)
    },
    checkout (cartId) {
      this.$store.dispatch('checkout', cartId)
    },
    addOne (productId) {
      this.$store.dispatch('addToCart', productId)
    },
    subtractOne (cartId) {
      this.$store.dispatch('subtractFromCart', cartId)
    },
    checkoutAll () {
      this.$store.dispatch('checkoutAll')
    }
  }
}
</script>

<style>

</style>
