<template>
  <div class="mb-5">
    <b-navbar toggleable="lg" id="bg-color">
      <b-navbar-brand>
        <div class="container ">
          <div v-html="icon" class="mr-2 icon"></div>
          <div id="cms">Schmetterling Shop</div>
        </div>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <router-link to="/login" id="link" class="mr-2">Login</router-link>
            <router-link to="/register" id="link" class="mr-2">Register</router-link>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500&display=swap');
.icon {
  fill: #BEC7B4;
}
.button-add:hover {
  color: black;
}
#cms {
  color: #6A3F71;
  text-decoration: none;
  background-size: 100% 2px, 0 2px;
  background-position: 100% 100%, 0 100%;
  background-repeat: no-repeat;
  transition: background-size 2s linear;
}
#cms:hover {
  background-size: 0 2px, 100% 2px;
}
#user {
  color: #6A3F71;
  padding: 10px;
  font-family: 'Playfair Display', serif;
  font-weight: 900;
  font-style: bold;
}
#bg-color {
    background-color: #8fa6d2;
}
#link {
  color:#6A3F71;
  text-decoration: none;
  background-size: 20px 2px, 100% 2px, 0 2px;
  background-position: calc(20px * -1) 100%, 100% 100%, 0 100%;
  background-repeat: no-repeat;
  transition: background-size 2s linear, background-position 2s linear;
}
#link:hover {
  background-size: 20px 2px, 0 2px, 100% 2px;
  background-position: calc(100% + 20px) 100%, 100% 100%, 0 100%;
}
</style>