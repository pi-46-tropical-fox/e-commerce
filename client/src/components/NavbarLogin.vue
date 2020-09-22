<template>
  <div class="mb-5">
    <b-navbar toggleable="lg" id="bg-color">
      <b-navbar-brand>
        <div class="container">
          <div class="mr-3"></div>
          <div id="cms">Schmetterling Laden</div>
        </div>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link to="/" id="link" class="ml-5">Products</router-link>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <router-link to="/cart" class="container cart" v-b-tooltip.hover title="See Cart">
              <div v-html="cartIcon"></div>
            </router-link>
            <router-link to="/history" class="container cart" v-b-tooltip.hover title="See History Transactions">
              <div v-html="historyIcon"></div>
            </router-link>
          </b-navbar-nav>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->

            <template v-slot:button-content>
              <em id="link">{{ $store.state.userLogin }}</em>
            </template>
            <b-dropdown-item @click.prevent="signOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cartIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"/></svg>',
      historyIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 12c0 6.627-5.373 12-12 12s-12-5.373-12-12h2c0 5.514 4.486 10 10 10s10-4.486 10-10-4.486-10-10-10c-2.777 0-5.287 1.141-7.099 2.977l2.061 2.061-6.962 1.354 1.305-7.013 2.179 2.18c2.172-2.196 5.182-3.559 8.516-3.559 6.627 0 12 5.373 12 12zm-13-6v8h7v-2h-5v-6h-2z"/></svg>'
    }
  },
  methods: {
    signOut () {
      localStorage.clear()
      this.$store.commit('SET_ISLOGIN', false)
      this.$store.commit('SET_USER', '')
      if (this.$route.path !== '/') this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500&display=swap');
.cart {
  fill: #143109;
}
.button-add:hover {
  color: black;
}
#cms {
  color: #6A3F71;
  text-decoration: none;
  background-size: 100% 2px, 0 2px;
  background-position: 100% 100%, 0 100%;
}
#user:hover{
    color: #FEF8D4;
}
#user {
  color: #6A3F71;
  padding: 10px;
  font-family: 'Playfair Display', serif;
  font-weight: 900;
  font-style: bold;
}
#bg-color {
  background-color: #8FA6D2;
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
#mb-5{
    background-color: #346573;
}
</style>