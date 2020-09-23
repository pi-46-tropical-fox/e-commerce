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
      <h5>{{cart.quantity}}</h5>
    </td>
    <td class="cart__price">Rp {{total}}</td>
    <td class="cart__close">
    </td>
    <td class="quantity__item">
      <h5>{{cart.updatedAt}}</h5>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'CardHistory',
  props: ['cart'],
  computed: {
    total () {
      return this.cart.Product.price * this.cart.quantity
    }
  }
}
</script>

<style>
</style>
