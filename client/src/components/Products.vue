<template>
  <div class="d-flex flex-row">
    <div class="col-sm-6 col-md-4 col-lg-3" v-for="product in products" :key="product.id">
      <div class="card">
        <img :src="product.image_url" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">{{product.name}}</h5>
          <hr>
          <h6 class="card-subtitle">{{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}}</h6>
          <p class="card-text">Stock: {{product.stock}}</p>
          <a href="#" class="btn btn-primary" @click="addToCart(product.id)">Add to Cart</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    created () {
        this.$store.dispatch('getProducts')
    },
    computed: {
        products () {
            return this.$store.state.products
        }
    },
    methods: {
        addToCart (id) {
            this.$store.dispatch('addToCart', id)
            .then(result => {
                console.log(result);
                // this.$router.reload()
                this.$store.dispatch('getProducts')
            })
        }
    }
};
</script>