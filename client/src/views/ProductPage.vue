<template>
  <div class="product-page">
    <div class="product-page-image-container" v-if="game !== undefined">
      <img :src="game.image_url" alt="">
    </div>
    <div class="product-page-right-container" v-if="game !== undefined">
      <!-- {{game}} -->
      <h1>{{game.name}}</h1>
      <p>Rp. {{priceConverted}}</p>
      <p>Stock: {{game.stock}}</p>
      <div class="product-page-right-container-buttons">
        <p>Quantity</p>
        <input v-model="quantity" type="number" min=1 :max='game.stock' >
        <button class="btn btn-secondary" @click.prevent="addToCart"> Add to cart </button>
        <!-- <button class="btn btn-secondary"> Add to wishlist </button> -->
      </div>
    </div>
    <LoadingAnimation v-if="game == undefined"/>
  </div>
</template>

<script>
import swal from 'sweetalert'
import LoadingAnimation from '../components/LoadingAnimation'

export default {
  name: 'ProductPage',
  components: {
    LoadingAnimation
  },
  data (){
    return {
      // game: {}
      quantity: 1
    }
  },
  methods:{
    addToCart(){
      let payload={
        ProductId: this.game.id,
        quantity: this.quantity
      }
      this.$store.dispatch('addToCart', payload)
        .then((data)=> {
          swal(data)
        } )
    }
  },
  computed:{
    gamesData(){
      return this.$store.state.gamesData
    },
    game(){
      if(this.gamesData.length> 0){
        console.log(this.$route.params.id);
        let game = this.gamesData.filter(game => {
          return +game.id === +this.$route.params.id})
        return game[0]
      }
    },
    priceConverted () {
      const price = String(this.game.price).split('')
      const result = []
      let j = price.length
      for (let i = 0; i <= price.length; i++) {
        result.unshift(price[j])
        j -= 1
        if (i % 3 === 0 && i !== 0 && i !== price.length) {
          result.unshift('.')
        }
      }
      return result.join('')
    }
  },
  watch: {

  },
  created(){
    this.$store.dispatch('fetchGamesData')
  }
}
</script>

<style>

</style>