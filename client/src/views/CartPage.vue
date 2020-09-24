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
  components: {
    Navbar,
    CartTable
  }

}
</script>

<style>

</style>