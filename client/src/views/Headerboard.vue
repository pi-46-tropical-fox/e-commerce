<template>
  <header class="masthead">
            <div class="container d-flex h-100 align-items-center">
                <div class="mx-auto text-center">
                    <h1 class="mx-auto my-0 text-uppercase">We Wear Black</h1>
                    <h2 class="text-white-50 mx-auto mt-2 mb-5">black isn't just a color</h2>
                    <router-link class="btn btn-primary js-scroll-trigger" to="/products">Start Shopping!</router-link>
                </div>
            </div>
        </header>
</template>

<script>
export default {
  name: 'HeaderBoard',
  created () {
    this.$store.commit('setUserEmail')
  }
}
</script>

<style>

</style>
