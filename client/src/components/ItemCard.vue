<template>
<div class="card" style="width: 18rem;" @click.prevent='goToProductPage'>
  <img :src="game.image_url" class="card-img-top" alt="">
  <div class="card-body">
    <!-- <h5 class="card-title">{{game.name}}</h5> -->
    <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
    <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
  </div>
</div>
</template>

<script>
export default {
  name: 'ItemCard',
  props: ['game'],
  methods: {
    goToProductPage () {
      console.log('asdfadsf')
    }
  }
}
</script>

<style>

</style>
