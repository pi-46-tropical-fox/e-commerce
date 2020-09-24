<template>
  <!-- Image and text -->
<nav class="navbar navbar-light">
  <a class="navbar-brand" @click="movePage('')" role="button">
    <img src="../assets/icon.png" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy">
    <span class="logo ml-3">ARK Watch Store</span>
  </a>
  <div class="row justify-content-end">
      <a class="navbar-brand" @click="movePage('cart')" role="button">
        <img src="../assets/shoppingcart.png" width="30" height="30" class="mr-2 " alt="" loading="lazy">
      </a>
      <a class="navbar-brand" @click="movePage('wishlist')" role="button">
        <img src="../assets/hearticon.png" width="30" height="30" class="mr-2 " alt="" loading="lazy">
      </a>
      <a class="dropleft">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img src="../assets/accountlogo.png" width="30" height="30" class="mr-2 " alt="" loading="lazy">
      </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" role="button" @click="movePage('register')">Register</a>
            <div class="dropdown-divider" ></div>
            <a class="dropdown-item" role="button" @click="movePage('login')">Login</a>
            <div class="dropdown-divider" ></div>
            <a class="dropdown-item" role="button" @click="logout">Logout</a>
        </div>
      </a>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    movePage (page) {
      this.$router.push({ path: `/${page}` })
    },
    logout () {
      localStorage.removeItem('access_token')
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style>
.navbar {
    background-color: black;
}

.logo {
    color: #f6e58d;
}
</style>
