<template>
    <div class="col-4 mt-5 shadow">
      <img class="card-img-top" :src="cart.Product.image_url" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">Title: {{cart.Product.name}}</h5>
        <p class="card-text">TotalPrice: {{cart.totalPrice}}</p>
        <label for="quantity">Quantity: </label><br>
        <input type="number" class="card-text" min="1" :max="cart.Product.stock" v-model="quantity"><br>
        <p class="card-text">Status: {{cart.status}}</p>
      </div>
      <div class="card-footer">
        <button type="button" @click.prevent="remove(cart.id)" class="btn btn-success mr-5">Remove</button>
        <button type="button" @click.prevent="update(cart.id)" class="btn btn-success ml-5">Update</button>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return {
      quantity: this.cart.quantity
    }
  },
  props: ["cart"],
  methods: {
    remove(id){
      this.$store.dispatch("removeCart", id)
    },

    update(id){
      this.$store.dispatch("updateCart", {quantity: this.quantity, id})
    }
  }
}
</script>

<style>

</style>
