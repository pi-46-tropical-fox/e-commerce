<template>
<section id="productImage" class="shadow-lg mb-5">
    <div class="row justify-content-center no-gutters">
    <div class="col-lg-6" style="background-image: url(https://image.shutterstock.com/z/stock-vector-tropical-palm-leaves-jungle-leaves-seamless-vector-floral-pattern-background-326113889.jpg)">

        <img class="card-img-top shadow my-5" :src="product.image_url" alt="product image" 
         style="width: auto; height:80vh;"/>
        </div>
      <div class="col-lg-6 card">
          <div class="bg-black text-center h-100 project">
              <div class="d-flex h-100">
                  <div class="project-text w-100 my-auto text-center text-lg-left">
                      <h2 class="text-white" style="text-weight:bold;">{{product.name}}</h2>
                      <h5> <b>{{product.price}}</b></h5>
                      <hr class="d-none d-lg-block mb-0 ml-0"/>
                      <p class="mb-0 text-white-50">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                      <hr class="d-none d-lg-block mt-0 ml-0" />
                  <button class="btn btn-primary mt-3" @click.prevent="gotoProduct(product.id)"><i>More Detail</i> </button>
                  </div>
              </div>
          </div>
      </div>
    </div>

    </section>

</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product', 'number'],
  methods: {
    gotoProduct (id) {
      this.$router.push(`/product/${id}`)
    }
  }
}
</script>

<style>
.shadow-lg {
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.75) !important;
}

</style>
