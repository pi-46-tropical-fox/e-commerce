<template>
  <!-- Header Section Begin -->
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-3">
          <div class="header__logo">
            <a @click.prevent="$router.push('/')" href="">
              <img src="img/logo.png" alt />
            </a>
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <nav class="header__menu mobile-menu">
            <ul>
              <li v-if="!access_token">
                <a @click.prevent="$router.push('/signup')" href="">Sign Up</a>
              </li>
              <li v-if="!access_token">
                <a @click.prevent="$router.push('/signin')" href="">Sign In</a>
              </li>
              <li v-if="access_token">
                <a @click.prevent="logout" href="">Sign Out</a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-lg-3 col-md-3">
          <div class="header__nav__option">
            <a @click.prevent="$router.push('/wishlist')" href="">
              <img src="img/icon/heart.png" alt="wishlist" />
            </a>
            <div class="price">Wishlist</div>
            <a></a>
            <a @click.prevent="$router.push('/cart')" href="">
              <img src="img/icon/cart.png" alt />
              <span>0</span>
            </a>
            <div class="price">Cart</div>
            <a></a>
            <a @click.prevent="$router.push('/history')" href="">
              <img src="img/icon/search.png" alt />
            </a>
            <div class="price">History</div>
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
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/signin')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    access_token () {
      return localStorage.getItem('access_token')
    }
  }
}
</script>

<style>
</style>
