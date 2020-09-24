<template>
<div class="card product-list-card" style="width: 18rem;" @click.prevent='goToProductPage'>
  <img :src="game.image_url" class="card-img-top" alt="">
  <div class="card-body">
    <h5 class="card-title">{{game.name}}</h5>
    <p class="card-text">Rp. {{priceConverted}}</p>
    <a href="#" class="btn btn-secondary">Order</a>
  </div>
    <!-- {{game}} -->
</div>
</template>

<script>
export default {
  name: 'ItemCardList',
  props: ['game'],
  methods: {
    goToProductPage () {
      this.$router.push(`/product/${this.game.id}`)
    }
  },
  computed: {
    priceConverted () {
      const price = String(this.game.price).split('')
      const result = []
      let j = price.length
      for (let i = 0; i <= price.length; i++) {
        result.unshift(price[j])
        j -= 1
        if (i % 3 === 0 && i !== 0 && i !== price.length) {
          result.unshift('.')
        }
      }
      return result.join('')
    }
  }
}
</script>

<style>

</style>
