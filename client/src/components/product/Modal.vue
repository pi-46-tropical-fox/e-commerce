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
          <span class="title">{{ data.name }}</span>
        </div>

        <!-- Hidden Content(s) -->

        <!-- Content -->
        <div class="grid grid-cols-2 gap-x-4">
          <div class="product-images">
            <div v-if="typeof data.image == 'String'" 
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
            {{ data }}
          </div>
        </div>
        <hr />

        <!-- Footer -->
        <div class="modal-footer">
          <button @click.prevent="addToCart(data)" class="cart" type="submit">
            Add to cart
          </button>
          <button @click.prevent="addToWishlist(data)" class="wishlist" type="submit">
            Add to wishlist
          </button>
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

  data() {
    return {
      name: "",
      price: "",
      stock: "",
      images: [""],
      CategoryId: "",
    };
  },

  components: {},

  computed: {
    data() {
      return this.$store.state.productDetails;
    },

    imageAvailable() {
      let image = this.$store.state.productDetails
      return image
    }
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
  @apply py-2;
  @apply px-4;
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