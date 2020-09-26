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

    <ProductModal :showModal="showModal" @toggleModal="toggleModal" @addToCart="addToCart" @addToWishlist="addToWishlist" />
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

          if(this.showModal) this.toggleModal()
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

<style>

.card {
  @apply shadow-lg;
  /* @apply w-auto; */
  @apply rounded-lg;

  min-width: min-content;
}

.modal {
  @apply fixed;
  @apply w-full h-full;
  @apply top-0 left-0;
  @apply flex;
  @apply items-center justify-center;
  @apply overflow-y-auto;

  @apply transition-opacity duration-200;
}

.modal-overlay {
  @apply fixed;
  @apply w-full h-full;
  @apply bg-gray-900;
  @apply opacity-25;
}

.modal-container {
  @apply bg-white;
  @apply w-11/12;
  @apply mx-auto;
  @apply card;
  @apply shadow-lg;
  @apply z-50;
}

.modal-close {
  top: 3.5em;
  @apply fixed;
  @apply right-0;
  @apply cursor-pointer;
  @apply flex flex-col;
  @apply items-center;
  @apply mt-4 mr-4;
  @apply text-white text-sm;
  @apply z-50;
}

.modal-content {
  @apply py-4 px-6;
  @apply text-left;
}

.modal-title {
  @apply flex;
  @apply justify-between items-center;
  @apply pb-3;
}

.modal-title > .title {
  @apply text-2xl;
  @apply font-bold;
}

.modal-footer {
  @apply flex;
  @apply justify-end;
  @apply pt-2;
}

button {
  @apply py-2 px-4;
  @apply rounded;
  @apply mx-1;
  @apply text-white;
}

button.cart {
  @apply bg-green-500;
}
button.details {
  @apply bg-blue-500;
}
button.wishlist {
  @apply bg-red-500;
}
</style>
