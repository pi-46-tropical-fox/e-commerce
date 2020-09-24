<template>
  <tr>
    <td class="image"><img :src="cart.image_url" style="width: 20rem; height: 15rem"/></td>
    <td class="name">{{cart.name}}</td>
    <td class="price">Rp. {{ new Number(cart.price).toLocaleString("id-ID") }}</td>
    <td class="amount"><input type="number" v-model="amount" min="0" /></td>
    <td class="pricesubtotal">Rp. {{new Number(cart.price * amount).toLocaleString("id-ID")}}</td>
    <td><button type="button" class="btn btn-danger" @click.prevent="deleteCart(cart.Cart.ProductId)">DELETE</button></td>
  </tr>
</template>

<script>
export default {
  name: 'CartTable',
  props: ['cart'],
  data () {
    return {
      amount: this.cart.Cart.amount,
    }
  },
  methods: {
    deleteCart (id) {
      this.$store.dispatch('deleteCart', id)
    }
  },
  computed: {
    formatPrice () {
      return `Rp. ${this.cart.price.toLocaleString()}`
    }
  },
  watch: {
    amount (newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`);
      this.$store.dispatch('updateAmount', {amount: this.amount, id: this.cart.id})
    }
  }
}
</script>

<style>

</style>
