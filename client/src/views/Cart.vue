<template>
  <div>
    <Header></Header>
    <!-- Breadcrumb Section Begin -->
    <section class="breadcrumb-option">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb__text">
              <h4>Shopping Cart</h4>
              <div class="breadcrumb__links">
                <a @click.prevent="$router.push('/')" href="">Home</a>
                <span>Shopping Cart</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Breadcrumb Section End -->

    <!-- Shopping Cart Section Begin -->
    <section class="shopping-cart spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="shopping__cart__table">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th></th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                    <th>Update Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <CardCart v-for="cart in filteredCarts" :key="cart.id" :cart="cart"></CardCart>
                </tbody>
              </table>
            </div>

            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="continue__btn">
                  <a @click.prevent="$router.push('/')" href="">Continue Shopping</a>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="continue__btn update__btn">
                  <a @click.prevent="checkout" href="">
                    Checkout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Shopping Cart Section End -->

    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import CardCart from '../components/CardCart'
export default {
  name: 'Cart',
  components: {
    Header,
    Footer,
    CardCart
  },
  methods: {
    checkout () {
      this.$store.dispatch('checkout')
        .then(() => {
          this.$store.dispatch('fetchCarts')

          return this.$router.push('/cart')
        })
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    filteredCarts () {
      // FILTERING CARTS OWNED BY USERID AND ACTIVE
      const result = []
      this.carts.forEach(element => {
        if (element.UserId == localStorage.getItem('UserId') && element.status == 'active') {
          result.push(element)
        }
      })

      return result
    }
  },
  created () {
    this.$store.dispatch('fetchCarts')
  }
}
</script>

<style>
</style>
