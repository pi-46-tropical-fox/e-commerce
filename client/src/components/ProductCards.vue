<template>
  <div class="card col-3">
      <img :src="productData.image_url" class="card-img-top" height="200px" :alt="productData.name">
      <div class="card-body">
        <h5 class="card-title">{{ productData.name }}</h5>
        <p class="card-text">Rp. {{ productData.price }}</p>
        <a @click.prevent="addCart" class="btn btn-info">Add to Cart</a>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['productData'],
  methods: {
    addCart () {
      this.$store.dispatch('addCart', this.productData.id)
    }
  }
}
</script>

<style>

</style>
