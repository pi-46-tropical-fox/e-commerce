<template>
  <div class="ProductList">
    <tr v-for="(product , idx) in this.$store.state.allProducts" :key='idx'>
      <td> {{product.id}} </td>
      <td class="img"> {{product.img_url}} </td>
      <td> {{product.name}} </td>
      <td> {{product.price}} </td>
      <td> {{product.stock}} </td>
      <td>
        <button type="button" class="btn btn-primary" @click.prevent="bringProductData(product.id)">
          Edit
        </button>
        <button type="button" class="btn btn-danger" @click.prevent='bringProductId(product)'>
          Delete
        </button>
      </td>
    </tr>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  props: ['data'],

  created () {
    this.getProduct()
  },
  methods: {
    getProduct () {
      this.$store.dispatch('getProduct')
      console.log(this.$store.state.allProducts)
    }
  }
}
</script>

<style scoped>
.img{
    width: 300px;
    height: 200px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
