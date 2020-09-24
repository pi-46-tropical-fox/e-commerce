<template>
  <div>
    <Navbar></Navbar>
    <TableCart></TableCart>
  </div>
</template>

<script>
import TableCart from '../components/TableCart'
import Navbar from '../components/Navbar'

export default {
  name: 'Cart',
  components: {
    TableCart,
    Navbar
  }
}
</script>

<style>

</style>
