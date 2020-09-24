<template>
  <div class="wishlistGroup">
    <div class="col-6 wishlist">
      <h4 v-if="!wishlists[0]">Sorry, you dont have any wishlist</h4>
      <wishlistItem v-for="wishlist in wishlists" :key="wishlist.id" :wishlist="wishlist"></wishlistItem>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import wishlistItem from '../components/wishlistItem'

export default {
  name: 'Wishlist',
  components: {
    wishlistItem
  },
  computed: {
    wishlists: {
      get () {
        return this.$store.state.wishlists
      }
    }
  },
  created () {
    this.$store.dispatch('fetchWishlists')
  }
}
</script>

<style>
.wishlistGroup {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 70px;
}
.wishlist {
  display: flex;
  flex-direction: column;
}
</style>
