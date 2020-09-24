<template>
  <div class="home">
    <md-toolbar class="md-medium">
      <h3 class="md-title">
        <router-link to="/">
          <img alt="Vue logo" src="../../assets/logo.png" />
        </router-link>
      </h3>

      <div v-if="!loggedIn" class="md-toolbar-section-end">
        <div style="border-left:1px solid #000;height:40px"></div>
        <router-link to="/login">
          <md-button class="md-button">
          Login
        </md-button>
        </router-link>
        <router-link to="/register">
          <md-button class="md-button">
          Register
        </md-button>
        </router-link>
      </div>
      <div v-if="loggedIn" class="md-toolbar-section-end">
        <router-link to="/cart">
          <md-button class="md-button">
            <md-icon>shopping_cart</md-icon>
            Cart
            {{ cartTotal.totalItem }}
          </md-button>
        </router-link>
        <div style="border-left:1px solid #000;height:40px;margin:0 2em;"></div>
        <md-menu md-direction="bottom-start" md-align-trigger>
          <md-button md-menu-trigger>
            <md-icon>person</md-icon>
            {{ this.$store.state.user }}
          </md-button>

          <md-menu-content>
            <md-menu-item @click="logout">Logout</md-menu-item>
          </md-menu-content>
        </md-menu>
      </div>
    </md-toolbar>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  components: {},
  computed: {
    loggedIn: {
      get() {
        return this.$store.state.loggedIn;
      },
    },
    cartTotal: {
      get() {
        return this.$store.state.cart;
      },
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  },
  created() {
    this.$store.dispatch("fetchCart")
  },
};
</script>
