<template>
  <div class="">
    <b-card
        :title="product.name"
        :img-src="product.img_url"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="m-3"
    >

        <small>{{product.category}}</small>
        <b-card-text class="price">{{priceFormat(product.price)}}</b-card-text>
        <b-button href="#" block variant="outline-danger" @click="details(product.id)">Buy</b-button>
    </b-card>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'MenCard',
  props: ['product'],
  methods: {

    priceFormat (value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    details (id) {
      if (localStorage.access_token) {
        this.$store.dispatch('details', id)
        this.$router.push(`/details/${id}`)
      } else {
        Swal.fire({
          title: 'Forbidden',
          text: 'You need to login first',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    }
  }
}
</script>

<style>
.price {
  color: seagreen;
  font-size: 20px;
  font-weight: 700;
}
</style>
