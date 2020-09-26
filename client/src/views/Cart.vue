<template>
  <div class="cartGroup">
    <div class="col-6 cartList">
      <b-alert :variant="color" show v-if="notification[0]">{{notification[0]}}</b-alert>
      <cartItem v-for="cart in carts" :key="cart.id" :cart="cart"></cartItem>
    </div>
    <div class="col-3 cartSide">
      <cartSidebar :carts="carts"></cartSidebar>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import cartSidebar from '../components/cartSidebar.vue'
import cartItem from '../components/cartItem'

export default {
  name: 'Cart',
  components: {
    cartItem,
    cartSidebar
  },
  computed: {
    carts: {
      get () {
        return this.$store.state.carts
      }
    },
    notification: {
      get () {
        return this.$store.state.notification
      }
    },
    color: {
      get () {
        return this.$store.state.color
      }
    }
  },
  created () {
    this.$store.dispatch('fetchCarts')
  }
}
</script>

<style>
.cartGroup {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;
}
.cartList {
  display: flex;
  flex-direction: column;
  position: absolute;
}
</style>
