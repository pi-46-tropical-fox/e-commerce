<template>
  <div>
    <Navbar></Navbar>
    <div class="container pt-5 mb-5">
      <div class="row">
        <div class="col-4 mt-5">
          <div class="card" style="width: 18rem;">
            <img src="https://m.media-amazon.com/images/I/61wLbRLshAL._AC_UY327_FMwebp_QL65_.jpg" class="card-img-top" alt="product">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" class="btn btn-sm btn-dark mr-2">+ Cart</a>
              <a href="#" class="btn btn-sm btn-dark">Remove</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
export default {
  name: 'Wishlists',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>

</style>
