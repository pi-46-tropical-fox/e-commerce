<template>
  <section class="projects-section bg-light" id="projects">

        <Loading v-if="$store.state.loadingStatus"/>

        <BannerCard> </BannerCard>
        <br>
        <div class="d-flex flex-row justify-content-center mb-3">
      <form @submit.prevent ="filterCategories" class="form-inline " style="justify-content: center!important;">
        <select id="inputCategory" class="form-control form-group mx-sm-3 mb-2" v-model="category" style="width:200px;">
          <option value="Kaos">Kaos</option>
          <option value="Kemeja">Kemeja</option>
          <option value="Dress">Dress</option>
          <option value="Celana">Celana</option>
          <option value="Rok">Rok</option>
          <option value="Sepatu">Sepatu</option>
          <option value="Jam Tangan">Jam Tangan</option>
        </select>
        <button type="submit" class="btn btn-primary">Filter</button>
      </form>
    </div>

        <div class="container">
          <div  v-for="(product,index) in products" :key="index">
          <ProductCardLeft v-if="index%2 == 0"
             :product="product" :number="index"> </ProductCardLeft>
          <ProductCardRight v-if="index%2 != 0"
             :product="product" :number="index"> </ProductCardRight>
          </div>
            </div>
        </section>
</template>

<script>
import ProductCardLeft from '../components/ProductCardLeft.vue'
import ProductCardRight from '../components/ProductCardRight.vue'
import Loading from '../components/Loading.vue'
import BannerCard from '../components/BannerCard.vue'
export default {
  name: 'Dashboard',
  components: {
    ProductCardLeft,
    ProductCardRight,
    Loading,
    BannerCard
  },
  data () {
    return {
      category: ''
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    fetchProducts () {
      this.$store.dispatch('fetchProducts')
    },
    filterCategories () {
      this.products = this.products.filter(item => item.category === this.category)
    }
  },
  created () {
    this.fetchProducts()
  }

}
</script>

<style>

</style>
