<template>
  <div>
    <Navbar />
    <Product></Product>
    <router-view />
  </div>
</template>

<script>
import Navbar from "../components/navbar";
import Product from "../components/productContainer";
export default {
  name: "Home",
  components: {
    Navbar,
    Product,
  }
};
</script>

<style></style>
