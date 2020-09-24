<template>
  <div class="row justify-content-center">
    <b-card-group class="col-9 mt-4" deck>
      <b-card header-tag="header" footer-tag="footer">
        <template v-slot:header>
          <h4 class="mb-0"><b>{{ title }}</b></h4>
        </template>
          <b-list-group-item
            flush
            v-for="product in products"
            :key="product.id"
          >
            <div class="row justify-content-center d-inline-block">
              <img :src="product.image_url" alt="" style="border: 2px solid #555" width="100px">
              <b-card-text><b>{{ product.name }}</b></b-card-text>
            </div>
            <div class="row justify-content-center">
              <b-card-text class="col-3">Stock: {{ product.stock }}</b-card-text>
              <b-card-text class="col-3">{{ product.price }}<img src="../assets/Gold_symbol.png" class="ml-1" width="20px"></b-card-text>
            </div>
            <div>
              <b-button class="col-3" v-show="$store.state.isLogged" variant="primary" @click="addToCart(product.id)"><img class="mr-2" src="../assets/shopping-cart.png" width="20px"> Add to cart!</b-button>
            </div>
          </b-list-group-item>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
    }
  },
  methods: {
    async addToCart (productId) {
      const {value: quantity} = await this.$swal({
        title: 'Quantity:',
        input: 'number',
        inputValidator: (value) => {
          if (!value || value <= 0) {
            return 'Invalid quantity'
          }
        }
      })
      
      this.$store.dispatch('addToCart', {productId, quantity})
    }
  },
  computed: {
    title () {
      return this.$store.state.categories[this.$route.params.categoryId - 1]
    },
    products () {
      return this.$store.state.products[this.title]
    }
  }
}
</script>

<style>

</style>
