<template>
  <div class="container carousel-container shadow">
      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img class="d-block w-100" src="/assets/iklan-1.jpeg" alt="First slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="/assets/iklan-2.jpeg" alt="Second slide">
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="/assets/iklan-2.jpeg" alt="Third slide">
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
  </div>
</template>

<script>
export default {
  computed: {
    banners(){
      return this.$store.state.banners
    }
  },
  created(){
    this.$store.dispatch("getAllBanners")
  }
}
</script>

<style>
  .carousel-item{
    height: 500px;
    overflow: hidden;
  }
  .carousel-container{
    margin-top: 80px;
  }
</style>
