<template>
  <div class="">
    <Navbar></Navbar>
    <CartTable></CartTable>

    
  </div>
</template>

<script>

import Navbar from '../components/Navbar'
import CartTable from '../components/CartTable'

export default {
  name: 'CartPage',
  data () {
    return {
      endTotal: 0,
      finalTot: 0
    }
  },
  components: {
    Navbar,
    CartTable
  },
  methods: {
    redirectToLogin () {
      if (!localStorage.access_token) {
        this.$router.push('/login')
      }
    },
    getCart () {
      this.$store.dispatch('getCart')
    }
  },
  computed: {
    price () {
      return this.$store.state.price
    },
    calculate () {
      let arrTot = []
      return this.$store.state.price.map(el => {
        let total = el.quantity * el.Product.price
        arrTot.push(total)
      })
      let finalTot = arrTot.reduce(function(a, b) {
        return a + b
      })
    }
  },
  mounted () {
    this.redirectToLogin()
    this.getCart()
  }

}
</script>

<style>

</style>