<template>
  <!-- Image and text -->
<nav class="navbar navbar-light">
  <a class="navbar-brand" href="#">
    <img src="../assets/icon.png" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy">
    <span class="logo ml-3">ARK Watch Store</span>
  </a>
  <div class="row justify-content-end">
      <a class="dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img src="../assets/shoppingcart.png" width="30" height="30" class="mr-2 " alt="" loading="lazy">
      </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </a>
      <a class="navbar-brand" href="#">
        <img src="../assets/hearticon.png" width="30" height="30" class="mr-2 " alt="" loading="lazy">
      </a>
      <a class="navbar-brand" href="#">
        <img src="../assets/accountlogo.png" width="30" height="30" class="mr-2" alt="" loading="lazy">
      </a>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar'
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
