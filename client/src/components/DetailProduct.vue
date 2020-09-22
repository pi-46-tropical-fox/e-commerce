<template>
  <div class="container">
      <Loading v-if="$store.state.loadingStatus"/>

      <div class="card shadow">
        <div class="row mt-5">
            <div class="col-7">
                <h1>Image</h1>
                {{selectedProduct}}
                <img :src="selectedProduct.image_url" class="card-img-top" alt="product image">
            </div>

            <div class="col-4 card ">
                <div class="card-body">
                    <h5 class="card-title">{{selectedProduct.name}}</h5>
                    <p class="card-text">{{selectedProduct.price}}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
                <button type="button" @click="addToCart(selectedProduct.id)" class="btn btn-warning">Add To Cart</button>
            </div>
                <!-- <img src="../assets/logowebsite.png" class="card-img-top" alt="Login Image" style="width: 40%; height:auto;"> -->
            </div>
          </div>
      </div>
</template>

<script>
import Loading from '../components/Loading.vue'
export default {
  name: 'DetailProduct',
  components: {
    Loading
  },
  computed: {
    selectedProduct: {
      get () {
        return this.$store.state.selectedProduct
      }
    }
  },
  methods: {
    addToCart (id) {
      this.$store.dispatch('addToCart', id)
    },
    // filterCategories () {
    //   this.data.products = this.data.products.filter(item => item.category === this.category)
    // },
    // goToCreateProduct () {
    //   this.$router.push('/products')
    // }
  },
  created () {
    const id = this.$route.params.id
    this.$store.dispatch('getProduct', id)
  }

}
</script>

<style>
</style>
