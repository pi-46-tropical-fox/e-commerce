<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand">Aya</a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
            <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li v-if="isLoggedIn" class="nav-item active">
            <router-link to="/logout" class="nav-link">Logout</router-link>
        </li>
        <li v-else class="nav-item active">
            <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        </ul>
        <form v-if="isLoggedIn" class="form-inline my-2 my-lg-0">
            <router-link to="/cart">
              <button class="btn btn-light btn-sm"><img src="https://img.icons8.com/fluent/48/000000/shopping-cart.png"/></button>
            </router-link>
        </form>
    </div>
    </nav>
</template>

<script>
export default {
    computed:{
        isLoggedIn(){
            return this.$store.state.access_token
        }
    }
}
</script>