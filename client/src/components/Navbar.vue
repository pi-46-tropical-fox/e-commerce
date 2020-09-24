<template>
  <div class="sidenav">
    <div class="d-flex justify-content-between align-items-center">
      <div class="align-items-center ml-3">
        <router-link class="btn shadow d-flex justify-content-center align-items-center" :to="{ name: 'Home'}">Anime Shop</router-link>
      </div>
      <div>
        <div class="d-flex justify-content-around align-items-center mr-3">
          <router-link class="btn shadow d-flex justify-content-center align-items-center mr-2" :to="{ name: 'Carts'}">Cart</router-link>
          <a class="btn shadow d-flex justify-content-center align-items-center mr-5">History</a>
          <a @click.prevent="logout" class="btn shadow d-flex justify-content-center align-items-center mr-2">Logout</a>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    logout(){
      this.$store.dispatch("logout")
    }
  }
}
</script>

<style scoped>
  .sidenav {
    height: 50px;
    width: 100vw;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #b33939;
    overflow-x: hidden;
  }

  .sidenav a {
    margin-top: 5px;
    background-color: #fff;
    text-decoration: none;
    font-size: 17px;
    color: #000000;
    display: block;
  }

  .sidenav a:hover {
    color: #fff;
    background-color: #1e272e;
  }

  .logout {
    padding-bottom: 20px;
  }
</style>
