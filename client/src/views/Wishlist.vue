<template>
  <div>
    <Preloader></Preloader>
    <Header></Header>

    <!-- Breadcrumb Section Begin -->
    <section class="breadcrumb-option">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb__text">
              <h4>Shop</h4>
              <div class="breadcrumb__links">
                <a href="./index.html">Home</a>
                <span>Wishlist</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Breadcrumb Section End -->

    <!-- Shop Section Begin -->
    <section class="shop spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <div class="shop__sidebar">
              <div class="shop__sidebar__accordion">
                <div class="accordion" id="accordionExample">
                  <div class="card">
                    <div class="card-heading">
                      <a data-toggle="collapse" data-target="#collapseOne">Categories</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-9">
            <div class="shop__product__option">
              <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6">
                  <div class="shop__product__option__left">
                    <p>Showing all wishlist results</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <CardWishlist></CardWishlist>
              <CardWishlist></CardWishlist>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Shop Section End -->

    <Footer></Footer>
  </div>
</template>

<script>
import Preloader from '../components/Preloader'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CardWishlist from '../components/CardWishlist'
export default {
  name: 'Wishlist',
  components: {
    Preloader,
    Header,
    Footer,
    CardWishlist
  }
}
</script>

<style>
</style>
