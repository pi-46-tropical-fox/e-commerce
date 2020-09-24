<template>
    <div class="card">
        <div class="card-image">
            <figure class="image">
                <img :src="itemData.image_url" alt="Placeholder image">
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-6">{{ itemData.name }}</p>
                </div>
            </div>
            <div class="content">
              <p>Price: {{ itemData.price.toLocaleString('id', { style: 'currency', currency: 'IDR' }) }}</p>
              <p>Stock: {{ itemData.stock }}</p>
            </div>
        </div>
        <footer class="card-footer">
          <!-- <p class="card-footer-item">
            <span>
              <a class="button is-danger" type="submit">Add To WishList</a>
            </span>
          </p> -->
          <p class="card-footer-item">
            <span>
              <a class="button is-success" type="submit" @click.prevent="cart(itemData.id)">Add To Cart</a>
            </span>
          </p>
        </footer>
    </div>
</template>

<script>
export default {
  name: 'CardProduct',
  props: ['itemData'],
  methods: {
    cart (id) {
      this.$store.dispatch('addCart', id)
    }
  }
}
</script>

<style>

</style>
