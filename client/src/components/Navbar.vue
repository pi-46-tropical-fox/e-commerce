<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <!-- <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"> -->
          <h1 class="title is-4">E-Commerce</h1>
        </a>
        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" @click.prevent="$router.push({name: 'Home'})">
            Home
          </a>
          <a class="navbar-item" @click.prevent="$router.push({name: 'Cart'})">
            Cart
          </a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-danger" @click.prevent="logout">
                <strong>Log Out</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout () {
      localStorage.clear()
      localStorage.removeItem('access_token')
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style>

</style>
