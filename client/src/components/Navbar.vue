<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <router-link class="navbar-brand" to="/"><img src="../assets/logo-sepatu-kw-1.png" alt="" style="height: 40px; border-radius: 15px"></router-link>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto" id="nav">
                <!-- <li class="nav-item">
                    <router-link class="nav-link" to="/home">Home</router-link>
                </li> -->
                <!-- <li class="nav-item">
                    <router-link class="nav-link" to="/" v-if="$store.state.isLogin === false">Sign In</router-link>
                </li> -->
                <li class="nav-item">
                    <router-link class="nav-link" to="/cart" v-if="$store.state.isLogin === true"><i class="fa fa-shopping-cart" aria-hidden="true"></i><sup v-if="countCart > 0">{{countCart}}</sup></router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/product" v-if="$store.state.isLogin === true">Products</router-link>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" v-if="$store.state.isLogin === true" @click.prevent="logout">Sign Out</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" v-if="$store.state.isLogin === false" @click.prevent="login">Sign In</a>
                </li>
                </ul>
            </div>
        </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      console.log('masuk logout di methods')
      this.$store.dispatch('logout')
    },
    login () {
      this.$router.push({ path: '/login' })
    }
  },
  computed: {
    countCart () {
      return this.$store.state.carts.length
    }
  }
}
</script>

<style>
sup {
  font-size: 20px;
}
</style>
