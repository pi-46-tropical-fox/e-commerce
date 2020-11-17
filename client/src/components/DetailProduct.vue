<template>
<section class="projects-section bg-light" id="projects" style="background: linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0.9) 75%, rgba(0, 0, 0, 0.8) 100%);">
      <Loading v-if="$store.state.loadingStatus"/>
        <div class="container" >

          <section id="productImage" >
    <div class="row justify-content-center no-gutters mb-5 mb-lg-0">
    <div class="col-lg-6">
            <!-- Nantinya 1 produk punya banyak image -->
            <div class="mt-5">
               <carousel :perPage=1 :autoplay="true">
                    <slide>
                       <img class="img-fluid" :src="selectedProduct.image_url" alt="detail product" id="detailProduct"/>
                    </slide>
                     <slide>
                       <img class="img-fluid" :src="selectedProduct.image_url" alt="detail product" id="detailProduct"/>
                    </slide>
                     <slide>
                       <img class="img-fluid" :src="selectedProduct.image_url" alt="detail product" id="detailProduct"/>
                    </slide>
                </carousel>
                </div>
        </div>
      <div class="col-lg-6 card">
          <div class="bg-black text-center h-100 project">
              <div class="d-flex h-100">
                  <div class="project-text w-100 my-auto text-center text-lg-left">
                      <h2 class="text-white" style="text-weight:bold;">{{selectedProduct.name}}</h2>
                      <h5 class="mb-0 text-white-50"> <b>Category : </b>{{selectedProduct.category}}</h5>
                      <hr class="d-none d-lg-block mb-0 ml-0"/>
                      <p class="mb-0 text-white-50">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                      <hr class="d-none d-lg-block mt-0 ml-0" />
                      <h5 class="mb-0 text-white-50"> <b>Price: </b>{{selectedProduct.price}}</h5>
                  <button class="btn btn-primary mt-3" type="button" @click="addToCart(selectedProduct.id)">Add To Cart</button>
                  </div>
              </div>
          </div>
      </div>
    </div>
    </section>

          </div>
        </section>

</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import Loading from '../components/Loading.vue'
export default {
  name: 'DetailProduct',
  components: {
    Loading,
    Carousel,
    Slide
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

#detailProduct {
width: auto;
height:80vh;
-webkit-box-shadow: 0px 0px 66px -8px rgba(255,255,255,0.8);
-moz-box-shadow: 0px 0px 66px -8px rgba(255,255,255,0.8);
box-shadow: 0px 0px 66px -8px rgba(255,255,255,0.8);
}
</style>
