<template>
<div>
 <Navbar />
 <div class="container mt-5">
   <div class="container d-flex justify-content-center mb-3">
    <h2>Your Shopping Cart</h2>
  </div>
    <div class="row">
      <div class="col">
        <table class="table">
          <thead>
            <tr style="text-align:center;font-weight:bold;">
              <th scope="col">Image</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Amount</th>
              <th scope="col">Total</th>
              <th scope="col">-</th>
            </tr>
          </thead>
          <tbody>
            <CartTable v-for="cart in carts" :key="cart.id" :cart="cart"></CartTable>
            <tr>
              <td> </td>
              <td> </td>
              <td> </td>
              <td>Total:</td>
              <td>Rp. {{ new Number(totalPrice).toLocaleString("id-ID") }}</td>
              <td class="totalpricesubtotal"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="checkout-box">
      <div class="container-fluid col-sm-4 mb-5">
      <div class="card">
        <div class="card-header">Invoice</div>
        <div class="card-body">
          <h4 class="card-title">Total Price</h4>
          <h5 class="card-text">{{ new Number(totalPrice).toLocaleString("id-ID") }}</h5>
          <a href="#" class="btn btn-success mt-3" @click.prevent="checkout">
            <b>Checkout</b>
          </a>
        </div>
      </div>
    </div>
    </div>
  </div>
</div>
</template>

<script>
import CartTable from '../components/CartTable'
import Navbar from '../components/Navbar'
export default {
  name: 'Cart',
  data () {
    return {
      product: [],
      totalPrice: 0
    }
  },
  components: {
    CartTable,
    Navbar
  },
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCart')
    },
    checkout () {
      // console.log(this.product, '<<<')
      this.product.forEach(el => {
        console.log(el, '>>>> el')
        // console.log(el.Cart.ProductId, '<<<<<< cart product id delete')
        this.$store.dispatch('buy', el)
        this.$store.dispatch('deleteCart', el.Cart.ProductId)
        this.$store.dispatch('updateAmount', el.Cart.ProductId)
      })
    }
  },
  computed: {
    carts () {
      const carts = this.$store.state.carts
      let temp = 0
      carts.forEach(el => {
        temp += el.price * el.Cart.amount
      })
      this.totalPrice = temp
      this.product = carts
      return carts
    }
  },
  created () {
    this.fetchCart()
  }
}
</script>

<style>

</style>
