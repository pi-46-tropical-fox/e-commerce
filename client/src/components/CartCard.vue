<template>
  <div class="row justify-content-center">
    <b-card-group class="col-9 mt-4" deck>
      <b-card header-tag="header" footer-tag="footer">
        <template v-slot:header >
          <b-button v-show="checkRoute === 'Unpaid Products'" variant="success" @click="checkout">Checkout</b-button>
        </template>
          <b-list-group-item
            flush
            v-for="product in data"
            :key="product.id"
            class="container justify-content-center"
          >
            <div class="row justify-content-center d-inline-block">
              <img :src="product.Product.image_url" style="border: 2px solid #555" width="100px">
              <b-card-text><b>{{ product.Product.name }}</b></b-card-text>
            </div>
            <div>
              <b-input-group class="row justify-content-center">
                <b-input-group-prepend>
                  <b-button variant="outline-info" @click="minQ(product.ItemId)">-</b-button>
                </b-input-group-prepend>

                <b-input-group-text>
                  {{product.quantity}}
                </b-input-group-text>

                <b-input-group-append>
                  <b-button variant="outline-primary" @click="addQ(product.ItemId)">+</b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
            <p class="mt-3" style="text-align: center">Subtotal: {{product.quantity * product.Product.price}}<img src="../assets/Gold_symbol.png" class="ml-1" width="20px"></p>
          <b-button variant="danger" @click="removeItem(product.id)">Remove</b-button>
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
    addQ (productId) {
      this.$store.dispatch('plusItem', productId)
    },
    minQ (productId) {
      this.$store.dispatch('minItem', productId)
    },
    removeItem (id) {
      this.$store.dispatch('removeItem', id)
    },
    checkout () {
      this.$store.dispatch('checkout')
    }
  },
  computed: {
    checkRoute () {
      return this.$route.name
    },
    data () {
      return this.$store.state.cart
    }
  }
}
</script>

<style>

</style>
