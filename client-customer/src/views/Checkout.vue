<template>
<div>
    <Navbar></Navbar>
    <div class="checkout">
        <div class="cart-info">
            <CheckoutCard
            v-for="(item, i) in items"
            :key="i"
            :cart="item"
            >
            </CheckoutCard>
        </div>
        <div class="bill">
            <h2 class="p-2 mx-auto">Your Receipt: <hr><hr></h2>
            <Bill class="bill-content"></Bill>
            <!-- <div class="total-bill">

            </div> -->
            <div class="buy p-2 ml-auto">
                <button class="btn btn-primary" @click="checkOut(items)">Buy Now</button>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import Bill from '../components/Bill'
import CheckoutCard from '../components/CheckoutCard'
import Navbar from '../components/Navbar'
export default {
  name: 'Checkout',
  components: {
    Navbar,
    CheckoutCard,
    Bill
  },
  methods: {
    fetchItems () {
      this.$store.dispatch('fetchItems')
    },
    fetchProduct () {

    },
    checkOut (items) {
      //  let self = this
      // //  console.log(this, '<<< outside')
      //   alertify.confirm('Are you sure you want to checkout?')
      //   .set('onok', function (closeEvent) {
      //     // console.log(this, '<<inside')
      //     self.$store.dispatch('checkout', items)
      //     // console.log('Masuk ke checkout, line setelah trigger dispatch')
      //     alertify.success('Cart is now cleared. Thank you for shopping with us!')
      //     self.fetchProduct()
      //     // console.log(self.$store.state.products, '<<< state products dari checkout, seletelah dispatch')
      //     // console.log(items)
      //     });
      this.$store.dispatch('checkout', items)
      alertify.success('Cart is now cleared. Thank you for shopping with us!')
      // this.$store.dispatch('fetchProducts')
      this.$router.push({ path: '/home' })
    }
  },
  created () {
    this.fetchItems()
  },
  computed: {
    items () {
      return this.$store.state.cartItems
    }
  }
}
</script>

<style>
.checkout{
display: grid;
grid-template-areas:
'navbar navbar'
'cart-info bill';
  grid-template-rows: 100px min-content;
  grid-template-columns: 4fr 1fr;
  min-height: 100%;
  height: 100vh;
  width: 100vw;
  gap: 5px;
}
.navbar {
    grid-area: navbar;
}
.cart-info {
    grid-area: cart-info;
}
.bill {
    color: antiquewhite;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    grid-area: bill;
    background-color: #fff;
    border-radius: 10px;
    margin: 10px;
    max-height: auto;
    border-radius: 18px;
    background: #01579b;
    box-shadow:  10px 5px 14px #012e52,
            0px -5px 10px #0180e4;
}
.bill-content {
    height: 60%;
    align-self: center;
}

</style>
