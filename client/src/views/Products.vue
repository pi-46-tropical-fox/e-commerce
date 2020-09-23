<template>
  <div>
    <Navbar></Navbar>
    <Banner></Banner>
    <div class="btn-group mt-1" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-dark mr-2" @click.prevent="$router.push({ name: 'Electronics' })">Electronics</button>
      <button type="button" class="btn btn-warning mr-2" @click.prevent="$router.push({ name: 'Books' })">Books</button>
      <button type="button" class="btn btn-primary mr-2" @click.prevent="$router.push({ name: 'Shoes' })">Shoes</button>
      <button type="button" class="btn btn-danger mr-2" @click.prevent="$router.push({ name: 'Clothes' })">Clothes</button>
    </div>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Banner from '../components/Banner.vue'
export default {
  name: 'Products',
  components: {
    Navbar,
    Banner,
    Footer
  }
}
</script>

<style>

</style>
