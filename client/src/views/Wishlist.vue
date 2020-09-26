<template>
  <div id="wishlist"></div>
</template>

<script>
export default {

  methods: {
    addToWishlist({ commit }, id) {
      axios({
        url: '/wishlists',
        method: 'POST',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          ProductId: id
        }
      })
        .then()
        .catch(({ response }) => {
          swal.showSwalError(response.data.join('<br>'))
        })
    },
    deleteFromWishlist({ commit }) {
      axios({
        headers: {
          access_token: localStorage.access_token
        }
      })
        .catch(({ response }) => {
          swal.showSwalError(response.data.join('<br>'))
        })
    },
  },

  computed: {
    //
  }
}
</script>

<style>

</style>