<template>
  <div>
    <div class="product-container">
      <h1 class="title">Available Firearms</h1>
      <div class="card-container">
        <Card
          v-for="product in products"
          :key="product.id"
          :product="product"
          @addToCart="addToCart"
          :loggedIn="loggedIn"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../../../components/Card";

export default {
  name: "Dashboard",
  components: {
    Card,
  },
  methods: {
    addToCart(id) {
      this.$store
        .dispatch("addToCart", id)
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
  },
  computed: {
    loggedIn: {
      get() {
        return this.$store.state.loggedIn;
      },
    },
    products: {
      get() {
        return this.$store.state.products;
      },
    },
  },
  created() {
    this.$store.dispatch("fetchProduct");
  },
};
</script>

<style>
.title {
  text-align: center;
}

.product-container {
  padding: 4em 0;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
