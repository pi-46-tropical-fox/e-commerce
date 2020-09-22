<template>
  <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
    <div class="product__item">
      <div class="product__item__pic set-bg" :style="image">
        <ul class="product__hover">
          <li>
            <a href="#">
              <img src="img/icon/heart.png" alt />
              <span>Add to wishlist</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="product__item__text">
        <h6>{{product.name}}</h6>
        <a href="#" class="add-cart">+ Add To Cart</a>
        <h5>Rp{{product.price}}</h5> <h6>stock: {{product.stock}}</h6>
        <div class="product__color__select">
          <h6>{{product.category}}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardProduct',
  props: ['product', 'id'],
  data () {
    return {
      source: this.product.image_url,
      image: ''
    }
  },
  created () {
    return (this.image = `background-image: url(${this.source})`)
    
  }
}
</script>

<style>
</style>
