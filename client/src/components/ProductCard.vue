<template>
  <div class="col-3 my-3">
    <div class="card">
      <img :src="product.image_url" :alt="product.name" class="card-img-top" style="max-height: 150px; object-fit: cover;">
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <p>{{ idr }}</p>
        <p>Stock : {{ product.stock }}</p>
        <router-link :to="`/add-to-cart/${product.id}`" class="btn btn-primary stretched-link" style="width: 100%;">Add to Cart</router-link>
        <!--<router-link :to="`/edit-product/${product.id}`" class="btn btn-info m-2">Edit</router-link>
        <button @click="deleteProduct(product.id)" class="btn btn-danger m-2">Delete</button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    deleteProduct (id) {
      this.$store.dispatch('deleteProduct', { id })
        .then(({ data }) => {
          this.$store.dispatch('fetchProducts')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    idr () {
      return this.product.price.toLocaleString('id', { style: 'currency', currency: 'IDR' })
    }
  }
}
</script>
