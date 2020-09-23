<template>
  <div class="col-centered animate__animated animate__fadeIn">
    <div class="col">
      <div class="card shadow" style="width: 20rem;">
        <img :src="product.image_url" class="card-img-top" alt />
        <div class="card-body">
          <h5 class="card-title">{{product.name}}</h5>
          <p class="card-text">Price: Rp. {{product.price}}</p>
          <p class="card-text">Stock: {{product.stock}}</p>
          <a href="#" class="btn btn-primary" @click.prevent="addCart">ADD TO CART</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    addCart () {
      this.$store.dispatch('addCart', this.product.id)
    }
  }
}
</script>
