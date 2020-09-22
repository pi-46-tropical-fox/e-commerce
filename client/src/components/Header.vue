<template>
  <!-- Header Section Begin -->
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-3">
          <div class="header__logo">
            <a href="./index.html">
              <img src="img/logo.png" alt />
            </a>
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <nav class="header__menu mobile-menu">
            <ul>
              <li v-if="!$store.state.isLogin">
                <a @click.prevent="$router.push('/signup')">Sign Up</a>
              </li>
              <li v-if="!$store.state.isLogin">
                <a @click.prevent="$router.push('/signin')">Sign In</a>
              </li>
              <li v-if="$store.state.isLogin">
                <a @click.prevent="logout">Sign Out</a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-lg-3 col-md-3">
          <div class="header__nav__option">
            <a href="#">
              <img src="img/icon/heart.png" alt />
            </a>
            <a href="#">
              <img src="img/icon/cart.png" alt />
              <span>0</span>
            </a>
            <div class="price">Cart</div>
          </div>
        </div>
      </div>
      <div class="canvas__open">
        <i class="fa fa-bars"></i>
      </div>
    </div>
  </header>
  <!-- Header Section End -->
</template>

<script>
export default {
  name: 'Header',
  methods : {
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/signin')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
</style>
