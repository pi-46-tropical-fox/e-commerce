<template>
  <div class="row justify-content-center">
    <b-card-group class="col-9 mt-4" deck>
      <b-card header-tag="header" footer-tag="footer">
        <template v-slot:header >
          <h1>Paid Items</h1>
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
            <p class="mt-3" style="text-align: center">Bought on {{product.updatedAt.slice(0, 10)}} at {{getTime(product.updatedAt)}}</p>
            <p class="mt-3" style="text-align: center">Quantity: {{product.quantity}}</p>
            <p class="mt-3" style="text-align: center">Subtotal: {{product.quantity * product.Product.price}}<img src="../assets/Gold_symbol.png" class="ml-1" width="20px"></p>
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
    getTime (date) {
      const time = new Date(date)
      return time.toTimeString()
    }
  },
  computed: {
    data () {
      return this.$store.state.paid
    }
  }
}
</script>

<style>

</style>
