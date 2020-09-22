<template>
  <div id="nav" style="padding: 30px; background-color: #ffffff00;">
      <div class="btn-group btn-group-toggle">
        <label class="btn btn-secondary active" >
          <router-link type="radio" to="/user/login">Login</router-link>
        </label>
        <label class="btn btn-secondary">
          <router-link type="radio" to="/user/register">Register</router-link>
        </label>
      </div>
    </div>
</template>

<script>
export default {
  name: 'NavbarLogin',
  methods: {
  }

}
</script>

<style>

</style>
