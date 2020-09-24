<template>
  <nav class="navbar navbar-expand-md navbar-light bg-primary">
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
      <router-link to='/' style="text-decoration:none;">
        <button id="logo" type="button" class="btn btn-dark">SomeShop</button>
      </router-link>
    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <button type="button" class="btn btn-outline-warning" style="margin-right: 10px" @click.prevent="showCart">Cart</button>
              <button type="button" class="btn btn-outline-warning" style="margin-right: 10px" @click.prevent="historyPurchased">Purchase</button>
              <button type="button" class="btn btn-danger" @click.prevent="logout" >Logout</button>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('login')
        })
    },
    showCart () {
      this.$router.push({ path: '/cart' })
    },
    historyPurchased () {
      this.$router.push({ path: '/purchase' })
    }
  }
}
</script>

<style>

</style>
