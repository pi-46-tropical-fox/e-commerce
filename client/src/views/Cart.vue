<template>
  <v-container>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Product</th>
          <th scope="col">Product Name</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Subtotal</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <!-- {{carts}} -->
        <tr :key="i" v-for="(cart,i) in carts">
          <td>{{i+1}}</td>
          <td><img :src="cart.image_url" height="180" alt="image"></td>
          <td>{{cart.name}}</td>
          <td>IDR {{new Number (cart.price).toLocaleString("id-ID")}}</td>
          <td><input id="input-qty" type="number" :value="cart.Cart.quantity" min="1"></td>
          <td>IDR {{new Number(cart.price * cart.Cart.quantity).toLocaleString("id-ID")}}</td>
          <td><button @click.prevent="deleteFromCart(cart.Cart.ProductId)"><v-icon class="accent--text">{{links[0].icon}}</v-icon>delete</button></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>Total</td>
          <td>{{new Number(price).toLocaleString("id-ID")}}</td>
          <td><v-btn>Checkout</v-btn></td>
        </tr>
      </tbody>
    </table>
  </v-container>
</template>

<script>

export default {
  name: 'Cart',
  data () {
    return {
      links: [
        { icon: 'delete', text: 'Delete' }
      ]
    }
  },
  computed: {
    carts () {
      const carts = this.$store.state.carts
      let temp = 0
      carts.forEach(element => {
        temp += element.price * element.Cart.quantity
      })
      this.price = temp
      this.product = carts
      return carts
    }
  },
  methods: {
    deleteFromCart (id) {
      console.log(id, 'ini delete cart')
      this.$store.dispatch('deleteFromCart', id)
    }
  },
  created () {
    this.$store.dispatch('fetchCarts')
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
