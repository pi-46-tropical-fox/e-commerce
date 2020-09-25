<template>
  <div class="container">
 <!-- <div class="row" style="margin-left: 150px;" id="">
    <CardBook v-for="product in allProduct" :key="product.id"
    :product="product"></CardBook>
    </div> -->
    <h5>Shopping bag's owner : {{ name }}</h5>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <!-- <th scope="col">#</th> -->
          <th scope="col">Product</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col">Total Price</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody v-for="cart in carts" :key="cart.id" :cart="cart">
        <tr>
          
          <td style="width: 35em;">{{ cart.Product.name }}</td>
          <input type="number" 
          class="form-control" v-model="cart.quantity" style="width: 4em">
          <td style="width: 8em">{{ cart.Product.price }}</td>
          <td style="width: 8em">{{ cart.total }}</td>
          <!-- <td style="width: 8em" v-for="onePrice in price" :key='onePrice' :onePrice="onePrice"></td> -->

          <td>
            <button class="btn btn-info" style="width: 5em;"
              @click.prevent="updateCart(cart.id, cart.UserId, cart.ProductId, cart.quantity)">Update
            </button> 
          
            <button class="btn btn-danger" style="width: 5.5em;"
               @click.prevent="deleteCart(cart.id, cart.UserId, cart.ProductId)">Remove
            </button>
          </td>
        </tr>
        <!-- <h4>Total {{ cart.grandTotal }} </h4> -->
      </tbody> 
      <!-- <h4>Total   </h4> -->
      <button class="btn btn-success" style="width: 6em;"
        @click.prevent="checkOut()">Checkout
      </button>

  </table>

  </div>
</template>

<script>
import axios from '../config/axios'
import { Toast } from '../config/toaster'

export default {
  name: 'CartTable',
  methods: {
    getCart () {
      this.$store.dispatch('getCart')
    },
    updateCart (id, userId, productId, quantity) {
      // console.log(id, userId, productId, +quantity, 'carttable');
      const data = {
        UserId: userId,
        ProductId: +productId,
        quantity: +quantity
      }
      this.$store.dispatch('updateCart', data)
    },
    
    deleteCart(id, userId, productId) {
      const data = {
        UserId: userId,
        ProductId: +productId
      }
      this.$store.dispatch('deleteCart', data)
      this.$store.dispatch('getCart')
    },

    checkOut () {
      const data = {
        UserId: +localStorage.id,
      }
      this.$store.dispatch('checkOut', data)
    }
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    name () {
      return localStorage.user
    }

  },
  mounted () {
    this.getCart()
  }
}
</script>

<style scoped>
.container {
  font-family: 'Roboto Slab', serif;
}
</style>