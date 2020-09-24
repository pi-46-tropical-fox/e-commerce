<template>
  <b-navbar id="nav" type="none" variant="none">

    <router-link to="/"><img src="https://img.icons8.com/clouds/2x/t-shirt.png" class="logo-footer" style="height: 50px;"></router-link>
    <b-navbar-nav class="mr-auto">
      <b-nav-item></b-nav-item>
      <b-nav-item><router-link to="/men">Men</router-link></b-nav-item>
      <b-nav-item>|</b-nav-item>
      <b-nav-item><router-link to="/women">Women</router-link></b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto">
      <i class="fa fa-shopping-bag fa-2x m-1" type="button" style="color: white;" aria-hidden="true" @click="toCart"></i>
      <b-nav-item-dropdown right v-if="this.$store.state.isUser">
        <template v-slot:button-content>{{emailName}}</template>
        <div class="ml-4 logout float-center" @click.prevent="logOut" style="color: crimson;">Logout</div>
      </b-nav-item-dropdown>
      <b-nav-item ><router-link to="/login">Login</router-link></b-nav-item>
      <b-nav-item ><router-link to="/register">Register</router-link></b-nav-item>
    </b-navbar-nav>

  </b-navbar>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'Navbar',
  components: {
  },
  methods: {
    logOut () {
      localStorage.clear()
      this.$store.state.isUser = false
      this.$store.dispatch('emptyMyCart')
      this.$router.push({ name: 'Login' })
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Logging Out',
        showConfirmButton: false,
        timer: 1500
      })
    },
    toCart () {
      this.$router.push({ name: 'Cart' })
    }
  },
  computed: {
    emailName () {
      return this.$store.state.userName
    }
  }
}
</script>

<style>
#nav {
  padding: 10px;
  background-image:
    linear-gradient(
      rgb(6, 58, 155),
      rgba(3, 168, 160, 0.578),
      rgba(199, 196, 196, 0)
      );
  z-index: 100;
  position: fixed;
  width: 100%;
}
.logo {
  position: absolute;
  left: 50%;
  transform: translatex(-50%);
}
#nav a {
  font-weight: bold;
  color: rgb(255, 255, 255);
  text-shadow: 0px 0px 8px #000000;
}
#nav a.router-link-exact-active {
  color: #ffffff;
  text-shadow: 0px 0px 12px rgb(56, 223, 0);
}
</style>
