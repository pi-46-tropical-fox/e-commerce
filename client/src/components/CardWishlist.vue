<template>
  <div class="col-lg-4 col-md-6 col-sm-6">
    <div class="product__item">
      <div
        class="product__item__pic set-bg"
        :style="image"
      >
        <ul class="product__hover">
          <li>
            <a @click.prevent="deleteWishlist" href="">
              <img src="img/icon/compare.png" alt />
              <span>Remove from wishlist</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="product__item__text">
        <h6>{{wishlist.Product.name}}</h6>
        <a @click.prevent="addCart" href="" class="add-cart">+ Add To Cart</a>
        <h5>Rp {{wishlist.Product.price}}</h5>
        <h6>stock: {{wishlist.Product.stock}}</h6>
        <div class="product__color__select">
          <h6>{{wishlist.Product.category}}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardWishlist',
  props: ['wishlist'],
  data () {
    return {
      image: ''
    }
  },
  methods: {
    deleteWishlist () {
      this.$store.dispatch('deleteWishlist', this.wishlist.Id)
        .then(() => {
          this.$store.dispatch('fetchWishlists')
        })
    },
    addCart () {
      this.$store.dispatch('addCart', this.wishlist.Product.id)
        .then(() => {
          return this.$router.push('/cart')
        })
    }
  },
  created () {
    return this.image = `background-image: url(${this.wishlist.Product.image_url})`
  }
}
</script>

<style>
</style>
