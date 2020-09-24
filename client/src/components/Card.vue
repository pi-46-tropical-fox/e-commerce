<template>
   <md-card>
      <md-card-area>
        <md-card-media>
          <img :src="product.image_url" alt="People">
        </md-card-media>

        <md-card-header>
          <div class="md-title">{{ product.name }} </div>
          <div class="desc">
            <div>
              Price : $. {{ product.price.toLocaleString() }}
            </div>
            <div>
              Stock Left {{ product.stock }}
            </div>
          </div>
        </md-card-header>
      </md-card-area>

      <md-card-actions md-alignment="left" v-if="loggedIn">
        <div v-if="product.stock > 0">
          <md-button @click="addToCart(product.id)">Add To Cart <md-icon>shopping_cart</md-icon> </md-button>
        </div>
        <div v-else>
          <md-button disabled>Empty Stock <md-icon>error_outline</md-icon> </md-button>
        </div>
      </md-card-actions>
    </md-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    product: Object,
    loggedIn: Boolean
  },
  methods: {
    addToCart(id) {
      this.$emit('addToCart', id)
    }
  }
}
</script>

<style>
  .md-card {
    margin: 0 auto;
    margin-bottom: 3em;
    width: 20em;
  }

  .desc {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
</style>