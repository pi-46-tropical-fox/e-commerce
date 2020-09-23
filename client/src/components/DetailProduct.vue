<template>
<section class="projects-section bg-light" id="projects" style="background: linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0.9) 75%, rgba(0, 0, 0, 0.8) 100%);">
      <Loading v-if="$store.state.loadingStatus"/>
        <div class="container" >

          <section id="productImage" class="shadow-lg mb-5">
    <div class="row justify-content-center no-gutters mb-5 mb-lg-0">
    <div class="col-lg-6">
        <div class="card m-5 shadow">
        <img class="img-fluid" :src="selectedProduct.image_url" alt="" /></div>
        </div>
      <div class="col-lg-6 card">
          <div class="bg-black text-center h-100 project">
              <div class="d-flex h-100">
                  <div class="project-text w-100 my-auto text-center text-lg-left">
                      <h4 class="text-white">{{selectedProduct.name}}</h4>
                      <p class="mb-0 text-white-50">{{selectedProduct}} An example of where you can put an image of a project, or anything else, along with a description.</p>
                      <hr class="d-none d-lg-block mb-0 ml-0" />
                      <h4 class="card-text">{{selectedProduct.price}}</h4>
                  <button type="button" @click="addToCart(selectedProduct.id)" class="btn btn-primary">Add To Cart</button>
                  </div>
              </div>
          </div>
      </div>
    </div>
    </section>

          </div>
        </section>

            <!-- <div class="container"> -->
                <!-- Featured Project Row-->
                <!-- <div class="row align-items-center no-gutters mb-4 mb-lg-5 shadow">
                    <div class="col-xl-8 col-lg-7 card"><img class="img-fluid mb-3 mb-lg-0" :src="selectedProduct.image_url" alt="" /></div>
                    <div class="col-xl-4 col-lg-5" >
                        <div class="featured-text text-center text-lg-left card" >
                            <h4>Shoreline</h4>
                            <p class="text-black-50 mb-0">Grayscale is open source and MIT licensed. This means you can use it for any project - even commercial projects! Download it, customize it, and publish your website!</p>
                        </div>
                    </div>
                </div> -->

  <!-- <div class="container">
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
                <img src="../assets/logowebsite.png" class="card-img-top" alt="Login Image" style="width: 40%; height:auto;">
            </div>
          </div>
      </div> -->
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
    }
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

#backgroundDetail {
  background-image: url("https://c2.peakpx.com/wallpaper/884/781/244/4k-black-and-white-male-man-tattoo-wallpaper-preview.jpg");
  /* background-repeat: no-repeat; */
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: auto 100%;

}
</style>
