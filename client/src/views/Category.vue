<template>
  <div class="product-list-page">
    <ItemCardList
      v-for="game in gamesData"
      :key="game.id"
      :game="game"
      />
    <LoadingAnimation
      v-if="gamesData.length === 0"/>
  </div>
</template>

<script>
import ItemCardList from '../components/ItemCardList'
import LoadingAnimation from '../components/LoadingAnimation'
export default {
  name: 'Category',
  data () {
    return {
      // gamesData: []
    }
  },
  components: {
    ItemCardList,
    LoadingAnimation
  },
  methods: {
    // filterGamesData () {
    //   // console.log(this.categoriesData[this.$route.params.id].Products)
    //   const category = this.categoriesData.filter(category => category.id === Number(this.$route.params.id))
    //   this.gamesData = category[0].Products
    //   // console.log(gamesData,'test');
    // }
  },
  computed: {
    categoriesData: {
      get () {
        return this.$store.state.categoriesData
      }
    },
    gamesData () {
      // console.log(this.categoriesData[this.$route.params.id].Products)
      const categoryId = this.$route.params.id
      // console.log(categoryId);
      if (this.categoriesData.length > 0) {
        const category = this.categoriesData.filter(element => {
          // console.log(element);

          return +element.id === +categoryId
        })

        return category[0].Products
      } else {
        return []
      }
    }
  },
  created () {
    this.$store.dispatch('fetchCategories')
    // .then(() => {
    //   this.filterGamesData()
    // })
  }
}
</script>

<style>

</style>
