<template>
  <div class="modal" :class="showModal ? '' : 'opacity-0 pointer-events-none'">
    <div class="modal-overlay" @click.prevent="toggleModal"></div>
    <div class="modal-container" id="form-wrapper">
      <!-- Close -->
      <div class="modal-close" @click.prevent="toggleModal">
        <svg
          class="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
          />
        </svg>
        <span class="text-sm">(Esc)</span>
      </div>

      <!-- Body -->
      <div class="modal-content">
        <!-- Title -->
        <div class="modal-title">
        </div>

        <!-- Hidden Content(s) -->

        <!-- Content -->
        <div class="grid grid-cols-2 gap-x-4">
          <div class="product-images">
            <div v-if="!Array.isArray(data.image)" 
              class="bg-gray-600 text-white flex justify-center items-center h-64"
            >
              <h4>No image available</h4>
            </div>
            <div v-else class="image h-64">
              <img
                :src="data.image[0].image_url"
                :alt="data.image[0].title"
              />
            </div>
          </div>
          <div class="product-details">

            <h3 class="title">{{ data.name }}</h3>
            <h4 class="text-red-500">IDR {{ (data.price / 100).toLocaleString('id') }}</h4>

            <h4>Stock remaining: {{ data.stock }}</h4>
            <h5>Filled in: {{ data.category }}</h5>
            <!-- {{ data }} -->
          </div>
        </div>
        <hr />

        <!-- Footer -->
        <div class="modal-footer">
          <button v-if="isLoggedIn" @click.prevent="addToCart(data)" class="cart" type="submit">
            Add to cart
          </button>
          <button v-if="isLoggedIn" @click.prevent="addToWishlist(data)" class="wishlist" type="submit">
            Add to wishlist
          </button>
          <button @click.prevent="toggleModal()" class="details">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ProductDetails",

  props: {
    showModal: Boolean,
  },

  components: {},

  computed: {
    data() {
      return this.$store.state.productDetails;
    },

    imageAvailable() {
      let image = !!this.$store.state.productDetails.image
      return image
    },

    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },

  methods: {
    addToCart(payload) {
      this.$emit('addToCart', payload)
    },

    addToWishlist(payload) {
      this.$emit('addToWishlist', payload)
    },

    toggleModal() {
      this.$emit("toggleModal");
    },
  },

  created() {},

  mounted() {
    console.log(this.data);
    console.log(this.imageAvailable);
  },
};
</script>

<style>
</style>