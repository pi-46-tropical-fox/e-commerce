<template>
  <div class="cartItem">
    <div>
      <img class="cart" :src="cart.Product.image_url" :alt="cart.Product.name" srcset="">
    </div>
    <div class="detailCart">
      <h3>{{cart.Product.name}}</h3>
      <span class="mt-3 mb-3">Price : Rp. {{cart.Product.price.toLocaleString()}}</span><span class="mt-3 mb-3">Quantity : {{cart.quantity}}</span>
      <div>
        <b-button class="mr-3" href="#" variant="primary" :to="`/EditCartItem/${cart.id}`">Edit</b-button>
        <b-button href="#" variant="danger" @click.prevent="deleteCart">Delete</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cartItem',
  props: ['cart'],
  methods: {
    deleteCart () {
      this.$store.dispatch('deleteCart', this.cart.id)
        .then(() => {
          setTimeout(() => {
            this.$store.commit('SET_NOTIFICATION', [])
          }, 2000)
        })
        .catch(() => {
          setTimeout(() => {
            this.$store.commit('SET_NOTIFICATION', [])
          }, 2000)
        })
    }
  }
}
</script>

<style>
.cartItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border:solid grey;
  margin-bottom: 20px;
  width: 700px;
}

.cart {
  height: 300px;
  width: 300px;
}

.detailCart {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width:300px;
}

</style>
