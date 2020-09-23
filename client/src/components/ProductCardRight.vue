<template>
<section id="productImage" class="shadow-lg mb-5">
    <div class="row justify-content-center no-gutters">
        <div class="col-lg-6" style="background-image: url(https://image.shutterstock.com/z/stock-vector-tropical-palm-leaves-jungle-leaf-seamless-vector-floral-pattern-background-495523621.jpg)">
            <div class="card m-5 shadow">
            <img class="img-fluid" :src="product.image_url" alt="" />
            </div>
            </div>
        <div class="col-lg-6 order-lg-first card">
            <div class="bg-black text-center h-100 project">
                <div class="d-flex h-100">
                    <div class="project-text w-100 my-auto text-center text-lg-right">
                        <h4 class="text-white">{{product.name}}</h4>
                        <p class="mb-0 text-white-50">{{product}}Another example of a project with its respective description. These sections work well responsively as well, try this theme on a small screen!</p>
                        <hr class="d-none d-lg-block mb-0 mr-0" />
                        <button @click.prevent="gotoProduct(product.id)">More Detail</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="col mb-4" @click.prevent="gotoProduct(product.id)">
        <div class="card">
        <img :src="product.image_url" class="card-img-top" alt="productImage">
        <div class="card-body">
            <h5 class="card-title">{{product.name}}</h5>
            <p class="card-text">{{product.price}}</p>
        </div>
        </div>
    </div> -->
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

</style>
