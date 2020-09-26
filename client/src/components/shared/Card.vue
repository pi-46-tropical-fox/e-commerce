<template>
  <div class="card overflow-hidden">
    <div v-if="data.ProductImages.length > 0" class="image h-64">
      <img :src="data.ProductImages[0].image_url" :alt="data.ProductImages[0].title">
    </div>
    <div v-else class="bg-gray-600 text-white flex justify-center items-center h-64">
      <h4>No image available</h4>
    </div>
    <!--  -->
    <div class="content">
      <div class="title"><span class="text-2xl text-left">{{ data.name }}</span></div>
      <div class="price"><span class="text-xl text-left">IDR {{ (data.price / 100).toLocaleString('id-ID') }}</span></div>
      <div class="action">
        <button @click.prevent="toggleModal(data.id)" class="details">Details</button>
        <button @click.prevent="addToCart(data.id)" class="cart" v-if="isLoggedIn">
          Add to Cart
        </button>
        <button
          @click.prevent="addToWishlist(data.id)"
          class="wishlist"
          v-if="isLoggedIn"
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    data: Object,
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },

  methods: {
    toggleModal(id){
      this.$emit('toggleModal', id)
    },
    addToCart(id){
      this.$emit('addToCart', id)
    },
    addToWishlist(id){
      this.$emit('addToWishlist', id)
    },
  }
};
</script>

<style scoped>
.card {
  @apply bg-white;
  @apply w-1/4;
  @apply grid gap-4;
  @apply rounded-t-lg;

  @apply shadow-lg;
  width: 400px;
  @apply rounded-lg;

  min-width: min-content;
}

.card .image {
  @apply w-full;
  @apply overflow-y-hidden;
}

.content .title,
.content .price {
  @apply px-4;
  @apply py-2
}

.content .action {
  @apply p-4
}

.content .title {
  @apply text-xl;
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