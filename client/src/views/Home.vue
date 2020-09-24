<template>
  <div class="home">
    <div class="home-banner">
      <img id="slide-1" src="../assets/ps5_inner_bannner_1.webp" alt="">
      <img id="slide-2" src="../assets/Xbox-One-banner.png" alt="">
    </div>
    <div class="banner-shortcut">
      <a href="#slide-1">1</a> |
      <a href="#slide-2">2</a>
    </div>
    <div>
      <h1>Our's Recommend</h1>
      <div class="showcase-container">
      <ItemCard
      v-for="(game, index) in recommendGameData"
      :key='index'
      :game='game'
      />
     </div>
    </div>

  </div>
</template>

<script>
import ItemCard from '../components/ItemCard'
export default {
  name: 'Home',
  data () {
    return {
      recommendGameData: []
    }
  },
  components: {
    ItemCard
  },
  computed: {
    categoriesData () {
      return this.$store.state.categoriesData
    }
  },
  methods: {
    recommendGame () {
      // console.log(this.categoriesData);
      const result = []
      const allGame = []
      this.categoriesData.forEach(category => {
        category.Products.forEach(game => {
          allGame.push(game)
        })
      })
      for (let i = 0; i < 4; i++) {
        const index = Math.floor(Math.random() * (allGame.length - 1))
        console.log(index)
        result.push(allGame[index])
      }
      // console.log(allGame);
      // console.log(result)
      this.recommendGameData = result
    },

    goToProductPage () {
      // console.log('asdfadsf');
    }
  },
  created () {
    this.$store.dispatch('isLogin', {})
    this.$store.dispatch('fetchCategories')
      .then(() => {
        this.recommendGame()
      })
  }
}
</script>
