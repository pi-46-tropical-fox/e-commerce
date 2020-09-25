<template>
  <div id="home">
    <div
      id="banner"
      class="flex justify-center items-center w-full bg-gray-100 mb-8"
      style="height: 400px"
    >
      <span class="text-2xl text-gray-600">Banner placeholder</span>
    </div>

    <div class="product-list mb-8">
      <h2>Our Products</h2>

      <div v-if="this.isLoaded && products.length > 0">
        <ProductCard
          @addToCart="addToCart(product)"
          @addToWishlist="addToWishlist(product)"
          @toggleModal="toggleModal"
          v-for="product in products"
          :key="product.id"
          :data="product"
        />
      </div>
      <div v-else-if="this.isLoaded && products.length == 0">
        <h3>
          We currently don't have any products just yet. Come back later :)
        </h3>
      </div>
      <div v-else>
        <h3>Please wait...</h3>
      </div>
    </div>

    <ProductModal :showModal="showModal" @addToCart="addToCart" @addToWishlist="addToWishlist" />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import ProductCard from "@/components/shared/Card.vue";
import ProductModal from "@/components/product/Modal.vue";

import swal from "@/config/swal";
import axios from "@/config/axios";

export default {
  name: "Home",

  components: {
    ProductModal,
    ProductCard,
  },

  data() {
    return {
      showModal: false
    }
  },

  methods: {
    addToCart(payload) {
      let { id } = payload

      axios({
        url: '/cart',
        method: 'POST',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          id
        }
      })
        .then(({ data }) => {
          swal.showToastSuccess(data.message)

          this.toggleModal()
        })
        .catch(({response}) => {
          console.log();

          swal.showSwalError(response.data.join('<br>'))
        })
    },

    addToWishlist(id) {
      axios({
        url: "/wishlist",
        method: "POST",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {})
        .catch(({ response }) => {
          swal.showSwalError(response.data.join("<br>"));
        });
    },

    toggleModal(id = '') {
      this.showModal = !this.showModal;

      if (this.showModal) this.$store.dispatch("getProductDetails", id);
      else this.$store.dispatch("clearProductDetails");
    },
  },

  computed: {
    products() {
      return this.$store.state.products;
    },

    isLoaded() {
      return this.$store.state.isLoaded;
    },
  },

  created() {
    this.$store.dispatch("getProducts");
  },
};
</script>
