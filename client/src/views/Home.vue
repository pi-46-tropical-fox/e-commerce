<template>
  <div>
    <Header></Header>

    <!-- Baner Section Begin -->
    <div id="slider">
      <figure>
        <Banner v-for="banner in filteredBanners" :key="banner.id" :banner="banner"></Banner>
        <Banner v-for="(banner, i) in filteredBanners" :key="i" :banner="banner"></Banner>
      </figure>
    </div>
    <!-- Baner Section End -->

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
          <CardProduct
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            :id="product.id"
          ></CardProduct>
        </div>
      </div>
    </section>
    <!-- Product Section End -->

    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import CardProduct from "../components/CardProduct";
import Banner from "../components/Banner";
export default {
  name: "Home",
  components: {
    Header,
    Footer,
    CardProduct,
    Banner,
  },
  data() {
    return {
      source: "",
      i: 100
    };
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    filteredProducts() {
      // FILTERING STOCK > 0
      const result = [];
      this.products.forEach((element) => {
        if (element.stock > 0) {
          result.push(element);
        }
      });

      return result;
    },
    banners() {
      return this.$store.state.banners;
    },
    filteredBanners() {
      // FILTERING ACTIVE BANNERS
      const result = [];
      this.banners.forEach((element) => {
        if (element.status == "active") {
          result.push(element);
        }
      });

      return result;
    },
  },
  created() {
    this.$store.dispatch("fetchProducts").then(() => {
      this.$store.dispatch("fetchBanners");
    });
  },
};
</script>

<style>
@keyframes slidy {
  0% {
    left: 0%;
  }
  20% {
    left: 0%;
  }
  25% {
    left: -100%;
  }
  45% {
    left: -100%;
  }
  50% {
    left: -200%;
  }
  70% {
    left: -200%;
  }
  75% {
    left: -300%;
  }
  95% {
    left: -300%;
  }
  100% {
    left: -400%;
  }
}

body {
  margin: 0;
}
div#slider {
  overflow: hidden;
}
div#slider figure img {
  width: 20%;
  float: left;
}
div#slider figure {
  position: relative;
  width: 500%;
  margin: 0;
  left: 0;
  text-align: left;
  font-size: 0;
  animation: 20s slidy infinite;
}
</style>
