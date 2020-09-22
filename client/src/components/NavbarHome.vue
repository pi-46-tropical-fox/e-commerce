<template>

<nav class="navbar navbar-expand-lg justify-content-center sticky-top" id="nav">
  <span class="navbar-brand disabled" style="color:white">Thrift & Co</span>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
       <router-link class="nav-link" to="/">Product</router-link>
      </li>
      <li class="nav-item active">
       <router-link class="nav-link" to="/cart">My Carts</router-link>
      </li>

    </ul>
        <div class="dropdown mb-2 ml-auto">
          <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{$store.state.user}}
          </button>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item disabled" href="#" style="color:black;">Role: {{$store.state.role}}</a>
            <span class="dropdown-item " style="color:black;" @click="logout">Logout</span>
          </div>
      </div>
  </div>
</nav>

</template>

<script>
export default {
  name: 'NavbarHome',
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/user')
    }
  }
}
</script>

<style>

</style>
