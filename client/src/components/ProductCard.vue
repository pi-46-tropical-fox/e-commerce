<template>
  <v-card max-width="250" max-height="410">
    <v-list-item>
      <v-list-item-avatar color="grey"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title id="headline">{{dataProduct.name}}</v-list-item-title>
        <!-- <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle> -->
      </v-list-item-content>
    </v-list-item>
    <v-img :src="dataProduct.image_url"></v-img>
    <v-card-text>IDR {{formatPrice(dataProduct.price)}}</v-card-text>
    <v-card-actions>
      <v-btn @click.prevent="addToCart(dataProduct.id)" text color="deep-purple accent-4">Add to cart</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['dataProduct'],
  methods: {
    formatPrice (value) {
      const val = (value / 1).toFixed().replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    addToCart (id) {
      if (!localStorage.getItem('access_token')) {
        this.$router.push('/login')
      } else {
        return this.$store.dispatch('addToCart', id)
      }
    }
  }
}
</script>

<style>
#headline {
  font-family: 'Nunito', sans-serif;
  font-size: 1.2rem;
}
</style>
