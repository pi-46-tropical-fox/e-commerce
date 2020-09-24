<template>
<div>
  <Navbar></Navbar>
  <div class="container mt-4">
    <div class="row">
      <CartHistory
        v-for="history in histories"
        :key="history.id"
        :history="history"
      ></CartHistory>
    </div>
  </div>
</div>
</template>

<script>
import CartHistory from './CartHistory'
import Navbar from './Navbar'
export default {
  components: {
    CartHistory,
    Navbar
  },
  computed: {
    histories(){
      return this.$store.state.histories
    }
  },
  created(){
    this.$store.dispatch("showHistory")
  }
}
</script>

<style>

</style>
