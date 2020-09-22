<template>
  <tr>
    <td class="product__cart__item">
      <div class="product__cart__item__pic">
        <img src="img/shopping-cart/cart-1.jpg" alt />
      </div>
      <div class="product__cart__item__text">
        <h5>T-shirt Contrast Pocket</h5>
        <h5>$98.49</h5>
      </div>
    </td>
    <td class="quantity__item"></td>
    <td class="quantity__item">
      <div class="quantity">
        <div class="pro-qty-2">
          <input type="text" value="1" />
        </div>
      </div>
    </td>
    <td class="cart__price">$ 30.00</td>
    <td class="cart__close">
      <a href="#">
        <i class="fa fa-close"></i>
      </a>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'CardCart'
}
</script>

<style>
</style>
