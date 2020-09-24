<template>
  <div class="product-container">
    <Product
    v-for="product in data"
    :key="product.id"
    :value="product"
    ></Product>
    <router-view/>
  </div>
</template>

<script>
import Product from "../components/itemCard";
export default {
  name: "Home",
  data(){
    return {
      product: []
    }
  },
  components: {
    Product
  },
  computed: {
    data() {
      return this.$store.state.data;
    }
  },
  methods:{
    fetchData(){
      return this.$store.dispatch("fetchData")
    }
  },
  created(){
    this.fetchData()
  }
};
</script>

<style scoped>
.product-container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 15% auto;
    gap: 15px;
    margin-left: 75px;
}
</style>