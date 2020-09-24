<template>
  <div>
    <h1 class="justify-content-center">PRODUCTS</h1>
    <div class="container mt-3">
      <div class="justify-content-center">
        <router-link :to="`/products/1`"><img class="mr-4" src="../assets/consumables.png" width="35px"></router-link>
        <router-link :to="`/products/2`"><img class="mr-4" src="../assets/accessories.png" width="35px"></router-link>
        <router-link :to="`/products/3`"><img class="mr-4" src="../assets/support.png" width="35px"></router-link>
        <router-link :to="`/products/4`"><img class="mr-4" src="../assets/magical.png" width="35px"></router-link>
        <router-link :to="`/products/5`"><img class="mr-4" src="../assets/armor.png" width="35px"></router-link>
        <router-link :to="`/products/6`"><img class="mr-4" src="../assets/weapons.png" width="35px"></router-link>
        <router-link :to="`/products/7`"><img src="../assets/artifacts.png" width="35px"></router-link>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
  },
  created () {
    this.$store.dispatch('getProducts')
  }
}
</script>

<style>

</style>