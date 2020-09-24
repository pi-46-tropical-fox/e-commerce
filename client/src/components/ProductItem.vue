<template>
  <div class="productItem">
    <div>
      <img class="product" :src="product.image_url" :alt="product.name" srcset="">
    </div>
    <div class="detailProduct">
      <h3>{{product.name}}</h3>
      <span class="mt-3 mb-3">Price : Rp. {{product.price.toLocaleString()}}</span><span class="mt-3 mb-3">Stock : {{product.stock}}</span>
      <div class="mb-4">
        <b-button class="mr-3" variant="info" @click.prevent="addToCart">Add to Cart</b-button>
        <b-button variant="primary" @click.prevent="addToWishList">Wishlist</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cardItem',
  props: ['product'],
  computed: {
    notification: {
      get () {
        return this.$store.state.notification
      }
    },
    color: {
      get () {
        return this.$store.state.color
      }
    }
  },
  methods: {
    addToWishList () {
      setTimeout(() => {
        this.$store.commit('SET_NOTIFICATION', [])
      }, 2000)
      this.$store.dispatch('addWishlist', this.product)
    },
    addToCart () {
      setTimeout(() => {
        this.$store.commit('SET_NOTIFICATION', [])
      }, 2000)
      this.$store.dispatch('findCartByProduct', this.product)
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
          } else {
            this.$store.dispatch('addCart', this.product)
          }
        })
    }
  }
}
</script>

<style>
.productItem {
  display: flex;
  flex-direction: column;
  border:solid grey;
  max-width: 306px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.product {
  height: 300px;
  width: 300px;
}

.detailProduct {
  display: flex;
  flex-direction: column;
  align-items: center;
  width:300px;
}

</style>
