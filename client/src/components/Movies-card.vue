<template>
  <div class="col-4 mt-5 shadow">
    <img class="card-img-top" :src="movie.image_url" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">Title: {{ movie.name }}</h5>
      <p class="card-text">Price: {{ movie.price }}</p>
      <p class="card-text">Stock: {{ movie.stock }}</p>
    </div>
    <div class="card-footer">
      <button type="button" @click.prevent="addCart" class="btn btn-success">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      stock: '1'
    }
  },
  props: ["movie"],
  methods: {
    addCart(){
      const payload = {
        id: this.movie.id,
        name: this.movie.name,
        image_url: this.movie.image_url,
        price: this.movie.price,
        stock: this.stock
      }
      this.$store.dispatch("addCart", payload)
    }
  }
}
</script>

<style>

</style>
