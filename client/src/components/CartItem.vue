<template>
  <div>
    <tr>
      <td>{{index + 1}}</td>
      <td><img :src="cart.image_url" height="180" alt="image"></td>
      <td>{{cart.name}}</td>
      <td>IDR {{new Number (cart.price).toLocaleString("id-ID")}}</td>
      <td><input id="input-qty" v-model="quantity" type="number" min="1"></td>
      <td>IDR {{new Number(cart.price * cart.Cart.quantity).toLocaleString("id-ID")}}</td>
      <td><button @click.prevent="deleteFromCart(cart.Cart.ProductId)"><v-icon class="accent--text">{{links[0].icon}}</v-icon>delete</button></td>
    </tr>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: ['cart','index'],
  data () {
    return {
      links: [
        { icon: 'delete', text: 'Delete' }
      ],
      quantity: this.cart.Cart.quantity
    }
  },
  methods: {
    deleteFromCart (id) {
      console.log(id, 'ini delete cart')
      this.$store.dispatch('deleteFromCart', id)
    }
  },
  watch: {
    quantity: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
      this.$store.dispatch('updateCart', {id: this.cart.id, quantity: val})
    }
  },
  created () {
    console.log(this.cart)
  }
}
</script>

<style>
#input-qty {
  border: rgba(0, 0, 0, .75);
  background-color: rgba(0, 0, 0, .15);
  border-radius: 5px;
  max-width: 3em;
  min-height: 1.5em;
}
</style>