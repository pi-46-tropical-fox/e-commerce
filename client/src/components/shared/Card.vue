<template>
  <div class="card">
    <div class="image">
      <img src="" alt="" />
    </div>
    <!--  -->
    <div class="content">
      <div class="title">{{ data.name }}</div>
      <div class="price">{{ (data.price / 100).toLocaleString('id-ID') }}</div>
      <div class="action">
        <button @click.prevent="getDetails(data.id)" class="details">Details</button>
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
    data: Array,
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },

  methods: {
    getDetails(id){
      this.$router.push({ name: "ProductDetails", params: { id } })
    },
    addToCart(id){
      this.$store.dispatch('addToCart', id)
    },
    addToWishlist(id){
      this.$store.dispatch('addToWishlist', id)
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
.content .description,
.content .action {
  @apply p-4;
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