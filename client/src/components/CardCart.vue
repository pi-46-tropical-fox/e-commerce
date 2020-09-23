<template>
  <tr>
    <td class="product__cart__item">
      <div class="product__cart__item__pic">
        <img :src="cart.Product.image_url" alt />
      </div>
      <div class="product__cart__item__text">
        <h5>{{cart.Product.name}}</h5>
        <h5>Rp{{cart.Product.price}}</h5>
      </div>
    </td>
    <td class="quantity__item"></td>
    <td class="quantity__item">
      <div class="quantity">
        <div class="pro-qty-2">
          <input type="text" :value="cart.quantity" />
        </div>
      </div>
    </td>
    <td class="cart__price">Rp {{total}}</td>
    <td class="cart__close">
      <a @click.prevent="deleteCart" href="">
        <i class="fa fa-close"></i>
      </a>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'CardCart',
  props: ['cart'],
  computed: {
    total () {
      return this.cart.Product.price * this.cart.quantity
    }
  },
  methods: {
    deleteCart () {
      // console.log(this.cart.Id)
      this.$store.dispatch('deleteCart', this.cart.Id)
        .then(() => {
          this.$store.dispatch('fetchCarts')
          // return this.$router.push('/cart')
        })
    }
  }
}
</script>

<style>
</style>
