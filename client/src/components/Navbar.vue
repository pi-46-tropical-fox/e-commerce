<template>
<div class="body-wrap">
  <div class="nav-wrap-left">
    <div class="title-nav">
      <h2 id="shop-name">Bookiepedia</h2>
    </div>

    <ul class="nav">
      <li class="navlink">
        <router-link to="/" class="nav-link"
          id="nav-login" href="#"><b>Home</b></router-link>
      </li>

      <li class="navlink">
        <router-link to="/books" class="nav-link"
          id="nav-login" href="#"><b>Shop</b></router-link>
      </li>

      <li v-if="token" class="navlink"> 
        <a href="#" class="nav-link" @click.prevent="doLogout">
        Logout </a>
      </li>

    </ul>
  </div>
    <div class="nav-wrap-right">
      <div class="icon-wrapper">
        <div class="icons">
          <span v-if="!token" href="#" @click.prevent="redirectToLogin" class="flaticon-avatar"></span> 
        </div>
        <div class="icons">
          <span href="#" @click.prevent="redirectToCart" class="flaticon-shopping-cart"></span>
        </div>
      </div>
    </div>
    <!-- </ul> -->
  
  
</div>
</template>

<script>
export default {
  methods: {
    redirectToLogin () {
      this.$router.push('/login')
    },
    redirectToCart () {
      this.$router.push('/carts')
    },
    doLogout () {
      localStorage.clear()
      this.$store.commit('SET_ID', '')
      this.$store.commit('SET_NAME', '')
      this.$router.push('/books')
    }
  },
  computed: {
    name () {
      return this.$store.state.name
    },
    token () {
      return localStorage.access_token
    }
    
  }

}
</script>

<style scoped>

@import '../font/flaticon.css';

.body-wrap {
  margin: 0;
  padding: 0;
  font-family: 'Quicksand', sans-serif;
  font-size: 22px;
  display: flex;
  justify-content: space-between;
}

.nav-wrap-left {
  width: 80%;
  height: 70px;
  display: flex;
  align-items: center;
  margin: 7px 20px;
}

.nav-wrap-right {
  width: 17%; 
}

.nav-wrap-left h2 {
  display: flex;
  margin: 0 65px 0 10px;
  color: rgb(243, 190, 92)
}
  /* color: #F68A0D; */
  /* color: #44AFF2; */


.nav {
  display: flex;
  justify-content: space-around;
  width: 30%;
}

.nav li {
  list-style: none;
}

.nav li a {
  list-style: none;
  color: black;
  text-decoration: none;
  font-size: 20px;
  font-weight: 100;
}

.nav li a:hover {
  color: rgb(243, 190, 92)
}

.icon-wrapper {
  display: flex;
  flex-direction: row;
  
}

.icons {
  margin: 11px 15px;
  text-decoration: red;
}

.icons:hover {
  color: rgb(243, 190, 92)
}

[class^="flaticon-"]:before, [class*=" flaticon-"]:before,
[class^="flaticon-"]:after, [class*=" flaticon-"]:after {

font-size: 2em;

}



</style>