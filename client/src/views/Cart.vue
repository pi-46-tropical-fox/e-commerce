<template>
  <div id="cart">
    <div class="title">
      <h3>Your Cart</h3>
    </div>
    <div class="actions my-4">
      <button class="checkout">Checkout</button>
      <button class="checkout" @click="clearCart">Clear Cart</button>
    </div>
    <div class="data">
      <Table :cartProducts="cartProducts" />
    </div>
  </div>
</template>

<script>
import Table from '@/components/cart/Table.vue'

import axios from '@/config/axios'
import swal from '@/config/swal'

export default {
  name: 'Cart',
  components: {
    Table
  },

  methods: {
    async clearCart(){
      if(await swal.showSwalConfirm('Are you sure you want to clear your cart?')) {
        axios({
          url: `/cart`,
          method: 'DELETE',
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({data}) => {
          swal.showToastSuccess(data.message)
          this.$router.push({ name: 'Home' })
        })
        .catch(({response}) => {
          swal.showSwalError(response.data.join('<br>'))
        })
      }
    }
  },

  computed: {
    cartProducts() {
      return this.$store.state.cart
    }
  },

  mounted(){
    this.$store.dispatch('getCart')
  }
}
</script>

<style>
button{
  @apply py-2;
  @apply px-4;
  @apply mx-2;

  @apply rounded-lg;

  @apply transition-colors;
  @apply duration-200;
}

button:hover,
button.checkout:hover,
button.clear:hover
{
  @apply text-white;
}

button.checkout{
  @apply border-red-600;
  @apply border-2;
  @apply text-red-600;
}

button.checkout:hover{
  @apply bg-red-600
}
</style>