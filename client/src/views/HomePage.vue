<template>
  <div class="page-wrapper">
    <Navbar></Navbar>
    <div class="container" id="cards-wrapper">

          <div class="row" style="margin-left: 150px;" id="">
            <CardBook v-for="product in allProduct" :key="product.id"
            :product="product"></CardBook>
          </div>

      </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import CardBook from '../components/CardBook'
export default {
  name: 'HomePage',
  components: {
    Navbar,
    CardBook
  },
  methods: {
    getProduct () {
      this.$store.dispatch('getProduct')
    }
  },
  computed: {
    allProduct () {
      return this.$store.state.allProduct
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>

<style scoped>
  .page-wrapper
{
  background: white;
  height: 100%;
  font-weight: 100;
  font-family: 'Quicksand', sans-serif;
}

.container
{
  max-width: 85%;
}

#cards-wrapper
{
  text-align: center;
  flex-direction: row;
}
</style>
