<template>
  <div>
    <!-- Banner -->
    <Banner></Banner>

    <!-- Movies Card -->
    <div class="MovieList">
      <h1>Movies List</h1>
    </div>
    <!-- Looping di class row-->
    <div class="row ml-5 mr-5">
      <MovieCard
      v-for="movie in moviesList"
      :key="movie.id"
      :movie="movie"
      ></MovieCard>
    </div>
    <!-- Show Homecontent -->
    <router-view />
  </div>
</template>

<script>
import Banner from '../components/Banner.vue'
import MovieCard from '../components/Movies-card.vue'
import Navbar from '../components/Navbar'
export default {
  name: 'Home',
  methods: {
    logout(){
      this.$store.dispatch('logout')
    }
  },
  components: {
    Banner,
    MovieCard,
    Navbar
  },
  computed: {
    moviesList(){
      return this.$store.state.moviesList
    }
  },
  created(){
    this.$store.dispatch("getAllMovies")
  }
}
</script>

<style scoped>
  .sidenav {
    height: 50px;
    width: 100vw;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #b33939;
    overflow-x: hidden;
    padding-top: 20px;
  }

  .sidenav a {
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    font-size: 17px;
    color: #fff;
    display: block;
  }

  .sidenav a:hover {
    color: #000000;
  }

  .logout {
    padding-bottom: 20px;
  }

  .MovieList{
    margin-top: 30px;
    text-align: center;
  }
</style>
