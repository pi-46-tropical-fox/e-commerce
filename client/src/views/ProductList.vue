<template>
  <div class="product-list-page">
    <ItemCardList
      v-for="game in gamesData"
      :key="game.id"
      :game="game"/>
  </div>
</template>

<script>
import ItemCardList from '../components/ItemCardList'

export default {
  name: 'ProductList',
  data () {
    return {
      gamesData: []
    }
  },
  components: {
    ItemCardList
  },
  methods: {
    filterGamesData () {
      // console.log(this.categoriesData[this.$route.params.id].Products)
      const category = this.categoriesData.filter(category => category.id === Number(this.$route.params.id))
      this.gamesData = category[0].Products
      // console.log(gamesData,'test');
    }
  },
  computed: {
    categoriesData: {
      get () {
        return this.$store.state.categoriesData
      }
    }
  },
  created () {
    this.$store.dispatch('fetchCategories')
      .then(() => {
        this.filterGamesData()
      })
  }
}
</script>

<style>

</style>
