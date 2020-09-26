<template>
  <div class="wishlistItem">
    <div>
      <img class="wishlist" :src="wishlist.Product.image_url" :alt="wishlist.Product.name" srcset="">
    </div>
    <div class="detailwishlist">
      <h3>{{wishlist.Product.name}}</h3>
      <span class="mt-3 mb-3">Price : Rp. {{wishlist.Product.price.toLocaleString()}}</span>
      <div>
        <b-button class="mr-3" variant="danger" @click.prevent="deleteWishlist">Delete</b-button>
        <b-button class="mr-3" variant="info" @click.prevent="addToCart">Add To Cart</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wishlistItem',
  props: ['wishlist'],
  methods: {
    deleteWishlist () {
      this.$store.dispatch('deleteWishlist', this.wishlist.id)
    },
    addToCart () {
      this.$store.dispatch('findCartByProduct', this.wishlist.Product)
        .then((data) => {
          console.log(data, '<<< ini ada datanya')
          if (data) {
            const payload = {
              id: data.id,
              ProductId: data.ProductId,
              UserId: data.UserId,
              quantity: data.quantity + 1
            }
            this.$store.dispatch('updateCart', payload)
            this.$store.dispatch('deleteWishlist', this.wishlist.id)
          } else {
            this.$store.dispatch('addCart', this.wishlist.Product)
            this.$store.dispatch('deleteWishlist', this.wishlist.id)
            this.$router.push('/Cart')
          }
        })
    }
  }
}
</script>

<style>
.wishlistItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border:solid grey;
  margin-bottom: 20px;
  width: 700px;
}

.wishlist {
  height: 300px;
  width: 300px;
}

.detailwishlist {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width:300px;
}

</style>
