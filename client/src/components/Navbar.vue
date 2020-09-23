<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top font-weight-bold">
  <a class="navbar-brand" @click.prevent="home">Gadget Space <span><font-awesome-icon icon="rocket" /></span></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" @click.prevent="home">Home</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Products
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <router-link to="/products" class="dropdown-item font-weight-bold">Show All Products</router-link>
        </div>
      </li>
    </ul>
    <div class="mr-2" v-if="$store.state.isLogin">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Account <font-awesome-icon icon="user" />
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item font-weight-bold disabled" >Hi, {{ $store.state.currentUser }}</a>
          <a class="dropdown-item font-weight-bold" @click.prevent="wishlist">My wishlist</a>
          <a class="dropdown-item font-weight-bold" @click.prevent="profil">My profile</a>
          <a class="dropdown-item font-weight-bold" >My transaction</a>
          <a class="dropdown-item font-weight-bold" @click.prevent="logout">Logout</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click.prevent="showMyCart">My Cart <font-awesome-icon icon="shopping-cart" /> <span v-if="$store.state.myCart.grandTotal.qty > 0">{{ $store.state.myCart.grandTotal.qty }}</span></a>
      </li>
    </ul>
    </div>
    <div v-else>
      <button class="btn btn-outline-light my-2 my-sm-2 font-weight-bold" @click.prevent="login">Login</button>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    home () {
      this.$router.push({ name: 'Home' })
    },
    logout () {
      this.$store.dispatch('logoutAccount')
    },
    login () {
      this.$router.push({ name: 'Login' })
    },
    showMyCart () {
      this.$router.push({ name: 'Cart' })
    }
  }
}
</script>

<style>

</style>
