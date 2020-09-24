<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="#">Aya</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
            <router-link to="/" class="nav-link" href="#">Home</router-link>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
        </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
            <router-link to="/cart">
              <button class="btn btn-light btn-sm"><img src="https://img.icons8.com/fluent/48/000000/shopping-cart.png"/></button>
            </router-link>
        </form>
    </div>
    </nav>
</template>

<script>
export default {
    
}
</script>