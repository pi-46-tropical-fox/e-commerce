<template>
  <div>
    <!-- <Preloader></Preloader> -->
    <Header></Header>
    <!-- Hero Section Begin -->
    <!-- <section class="hero">
      <div class="hero__slider owl-carousel">
        <div class="hero__items set-bg" style="background-image: url(img/hero/hero-1.jpg) no-repeat center center">
          <div class="container">
            <div class="row">
              <div class="col-xl-5 col-lg-7 col-md-8">
                <div class="hero__text">
                  <h6>Summer Collection</h6>
                  <h2>Fall - Winter Collections 2030</h2>
                  <p>
                    A specialist label creating luxury essentials. Ethically crafted with an unwavering
                    commitment to exceptional quality.
                  </p>
                  <a href="#" class="primary-btn">
                    Shop now
                    <span class="arrow_right"></span>
                  </a>
                  <div class="hero__social">
                    <a href="#">
                      <i class="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-pinterest"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hero__items set-bg" style="background-image: url(img/hero/hero-2.jpg)">
          <div class="container">
            <div class="row">
              <div class="col-xl-5 col-lg-7 col-md-8">
                <div class="hero__text">
                  <h6>Summer Collection</h6>
                  <h2>Fall - Winter Collections 2030</h2>
                  <p>
                    A specialist label creating luxury essentials. Ethically crafted with an unwavering
                    commitment to exceptional quality.
                  </p>
                  <a href="#" class="primary-btn">
                    Shop now
                    <span class="arrow_right"></span>
                  </a>
                  <div class="hero__social">
                    <a href="#">
                      <i class="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-pinterest"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>-->

    <!-- Product Section Begin -->
    <section class="product spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <ul class="filter__controls">
              <li class="active" data-filter="*">All Products</li>
            </ul>
          </div>
        </div>
        <div class="row product__filter">
          <CardProduct v-for="product in filteredProducts" :key="product.id" :product="product" :id="product.id"></CardProduct>
        </div>
      </div>
    </section>
    <!-- Product Section End -->

    <Footer></Footer>
  </div>
</template>

<script>
import Preloader from "../components/Preloader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardProduct from "../components/CardProduct";
export default {
  name: "Home",
  components: {
    Preloader,
    Header,
    Footer,
    CardProduct,
  },
  data() {
    return {
      source: ""
    }
  },
  computed: {
    products() {
      return this.$store.state.products
    },
    filteredProducts() {
      //FILTERING STOCK > 0
      let result = []
      this.products.forEach(element => {
        if(element.stock>0) {
          result.push(element)
        }
      });

      return result
    }
  },
  created() {
    this.$store.dispatch('fetchProducts')
  }
};
</script>

<style>
</style>
