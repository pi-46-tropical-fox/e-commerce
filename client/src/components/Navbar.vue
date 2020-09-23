<template>
  <nav class="navbar">
    <div class="left-content">
      <router-link to='/'>
      <img src="../assets/logo.jpg" alt="">
      </router-link>
    </div>

    <div class="center-content">
      <div>
        <b-dropdown id="dropdown-1" text="Category" class="m-md-2">
          <router-link
            class="dropdown-item"
            v-for="category in categoriesData"
            :key="category.id"
            :to='`/category/${category.id}`'>
          {{category.name}}
          </router-link>
          <!-- <b-dropdown-item>First Action</b-dropdown-item> -->
        </b-dropdown>
      </div>
    </div>

    <div class="right-content">
      <div>
        <b-dropdown id="dropdown-1" text="Account" class="m-md-2">
          <!-- {{isLogin}} -->
          <router-link to='/register' class="dropdown-item" v-show="!isLogin">
            Register
          </router-link>
          <router-link to='/login' class="dropdown-item" v-show="!isLogin">
            Login
          </router-link>
          <router-link to='/cart' class="dropdown-item" v-show="isLogin">
            Cart
          </router-link>
          <button @click.prevent='logout' class="dropdown-item" v-show="isLogin">
            Logout
          </button>
        </b-dropdown>
      </div>
    </div>

  </nav>
</template>

<script>
import swal from 'sweetalert'

export default {
  data () {
    return {
      // isLogin: false
    }
  },
  methods: {
    logout () {
      swal('Are you sure you want to do this?', {
        buttons: {
          cancel: 'cancel',
          yes: 'logout'
        }
      })
        .then((value) => {
          if (value === 'yes') {
            this.$store.dispatch('logout')
          }
        })
    }
  },
  computed: {
    isLogin: function () {
      if (this.$store.state.isLogin) {
        return true
      } else {
        return false
      }
    },

    categoriesData () {
      return this.$store.state.categoriesData
    }
  },
  watch: {
    // isLogin: function(){

    // }
  },
  created () {
    this.$store.dispatch('isLogin', {})
    this.$store.dispatch('fetchCategories')
  }
}
</script>

<style>

</style>
