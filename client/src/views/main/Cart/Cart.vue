<template>
  <div>
    <div class="cart-container" v-if="carts.cart.length">
      <div class="cart">
        <CartItem
          v-for="cart in carts.cart"
          :key="cart.id"
          :cart="cart"
          @deleteCart="deleteCart"
        />
      </div>
      <div class="checkout md-elevation-2">
        <Checkout :carts="carts" @checkout="checkout" :notEnough="notEnough" />
      </div>
    </div>
    <div class="empty-cart" v-else>
      <h1 style="margin-top:2em">Your Cart Is Empty</h1>
    </div>
  </div>
</template>

<script>
import CartItem from "../../../components/CartItem";
import Checkout from "../../../components/Checkout";

export default {
  name: "Cart",
  components: {
    CartItem,
    Checkout,
  },
  methods: {
    deleteCart(id) {
      this.$store
        .dispatch("deleteCart", id)
        .then((res) => {
          this.$store.dispatch("fetchCart");
          this.$swal.fire({
            icon: "success",
            title: res.data.message,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        })
        .catch((err) => {
          this.$swal.fire({
            icon: "error",
            title: err.data.message,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        });
    },
    checkout() {
      this.$store
        .dispatch("checkout")
        .then((res) => {
          this.$store.dispatch("fetchCart");
          this.$swal.fire({
            icon: "success",
            title: res.data.message,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        })
        .catch((err) => {
          console.log(err);
          this.$swal.fire({
            icon: "error",
            title: err.data.message,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        });
    },
  },
  computed: {
    carts() {
      return this.$store.state.cart;
    },
    notEnough() {
      return this.$store.state.empty;
    },
  },
};
</script>

<style>
.cart-container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.checkout {
  height: 20em;
  width: 20em;
}

.empty-cart {
  text-align: center;
}
</style>
