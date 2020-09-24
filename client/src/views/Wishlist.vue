<template>
  <div>
      <div class="container">
          <div class="row justify-content-center">
              <h3>Wishlist</h3> <br>
          </div>
          <WishlistCard
          v-for="wishlist in wishlists"
          :key="wishlist.id"
          :wlData="wishlist">
          </WishlistCard>>
      </div>
  </div>
</template>

<script>
import WishlistCard from '../components/WishlistCard.vue'
export default {
  name: 'Wishlist',
  components: { WishlistCard },
  methods: {
    fetchWishlist () {
      this.$store.dispatch('fetchWishlist')
    }
  },
  computed: {
    wishlists () {
      return this.$store.state.wishlists
    }
  },
  created () {
    this.fetchWishlist()
  }
}
</script>

<style>

</style>
