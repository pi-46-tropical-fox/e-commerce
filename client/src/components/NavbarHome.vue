<template>
<nav class="navbar navbar-expand-lg navbar-light">
            <div class="container">
                <router-link class="navbar-brand" to="/">We Wear Black</router-link>
                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item"><router-link class="nav-link" to="/products">Product</router-link></li>
                        <li class="nav-item"><router-link class="nav-link" to="/cart">My Carts</router-link></li>
                        <li class="nav-item"><a class="nav-link" href="#signup">Contact</a></li>
                    </ul>
                    <div class="dropdown">
                      <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{$store.state.user}}
                      </button>
                      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                        <!-- <a class="dropdown-item disabled" href="#" style="color:black;">Profile: {{$store.state.role}}</a> -->
                        <button class="dropdown-item " style="color:black;" @click="logout">Logout</button>
                      </div>
                  </div>
                </div>
            </div>
        </nav>

<!-- <nav class="navbar navbar-expand-lg justify-content-center sticky-top" id="nav">
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
</nav> -->

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
