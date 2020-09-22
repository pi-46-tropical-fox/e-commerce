<template>

    <div class="col mb-4" @click.prevent="gotoProduct(product.id)">
        <div class="card">
        <img :src="product.image_url" class="card-img-top" alt="productImage">
        <div class="card-body">
            <h5 class="card-title">{{product.name}}</h5>
            <p class="card-text">{{product.price}}</p>
        </div>
        </div>
    </div>

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
