<template>
  <div id="app">
    <div id="Header">
      <div id="Logo-wrapper">
        <a href="" @click.prevent="toMain"><img id="Logo" src="https://i.imgur.com/Y2bLKpW.png" alt="Master Race Heaven"></a>
      </div>
      <div id="Searchbox-wrapper">
        <form id="SearchForm" @submit.prevent="getSearch">
          <input id="SearchInput" type="text" placeholder="Search" v-model="search">
          <button type="submit" id="SearchBTN">Search</button>
        </form>
      </div>
      <div id="UserCart-wrapper">
        <a id="CartLink" href="#" @click.prevent="showCart">CART</a>
        <a id="UserLink" href="#" @click.prevent="showUser">{{username}}</a>
      </div>
    </div>
    <div id="spacer">

    </div>
    <router-view />
    <UserOption v-if="toggleUser" />
    <MatchModal v-if="toggleMatch" />
    <RegSuccess v-if="toggleRegSuccess" />
    <AddCartModal v-if="toggleAddCart" />
  </div>
</template>

<script>
import UserOption from './components/UserOption'
import MatchModal from './components/MatchModal'
import RegSuccess from './components/RegSuccess'
import AddCartModal from './components/AddCartModal'

export default {
  components: {
    UserOption,
    MatchModal,
    RegSuccess,
    AddCartModal
  },
  computed: {
    username () {
      return this.$store.state.username
    },
    toggleUser () {
      return this.$store.state.toggleUser
    },
    toggleMatch () {
      return this.$store.state.toggleMatch
    },
    toggleRegSuccess () {
      return this.$store.state.toggleRegSuccess
    },
    toggleAddCart () {
      return this.$store.state.toggleAddCart
    },
    search: {
      get () {
        return this.$store.state.search
      },
      set (val) {
        this.$store.commit('setSearch', val)
      }
    }
  },
  methods: {
    getSearch () {
      this.$store.dispatch('getSearch')
    },
    toMain () {
      this.$store.dispatch('toMain')
    },
    showCart () {
      if(!localStorage.access_token){
        this.$store.dispatch('toLogin')
      } else {
        this.$store.dispatch('toCart')
      }
    },
    showUser () {
      this.$store.commit('toggleUser', true)
    }
  }
}
</script>
<style>
html body{
  margin: 0 !important;
  padding: 0 !important;
  background: rgb(48, 48, 48);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#Header {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  text-align: center;
  background: black;
  border-bottom: solid 5px #e100ff;
  position: fixed;
  width: 100%;
  z-index: 1;
}

#spacer{
  height: 130px;
}

#Logo-wrapper{
  position: relative;
  width: 300px;
  height: 100px;
}

#Logo{
  display: block;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  max-height: 100%;
}

#Searchbox-wrapper{
  position: relative;
  width: 500px;
}

#SearchForm{
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  height: 20px;
  border: none; 
}

#SearchInput{
  width: 300px;
}

#SearchBTN{
  border: none;
  height: 22px;
  color: white;
  background-color: #6100f9;
}

#UserCart-wrapper{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: relative;
  width: 300px;
}

#CartLink{
  font-weight: bold;
  text-decoration: none;
  color: #fff800;
  margin-top: 40px;
}

#UserLink{
  font-weight: bold;
  text-decoration: none;
  color: #e100ff;
  margin-top: 40px;

}
</style>
