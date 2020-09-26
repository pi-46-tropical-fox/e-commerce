<template>
  <div class="container">
    <div class="page-wrapper">
    <h5>Shopping bag's owner : {{ name }}</h5>
    <table class="table">
      <thead class="thead-dark text-center">
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
          class="form-control text-center" v-model="cart.quantity" style="width: 4em">
          <td class="text-center" style="width: 8em">{{ cart.Product.price }}</td>
          <td class="text-center" style="width: 8em">{{ cart.total }}</td>
          <td>
            <!-- <div class="btn-table-wrapper"> -->
              <button class="btn btn-info" id="btn-upd" style="width: 5em;"
                @click.prevent="updateCart(cart.id, cart.UserId, cart.ProductId, cart.quantity)">Update
              </button> 
            
              <button class="btn btn-danger" id="btn-del" style="width: 5.5em;"
                @click.prevent="deleteCart(cart.id, cart.UserId, cart.ProductId)">Remove
              </button>
          </td>
        </tr>

      </tbody> 
  </table>
  <h5>Total : {{price}} </h5>
  <button class="btn btn-success" style="width: 6em;"
    @click.prevent="checkOut()">Checkout
  </button>
    </div>
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
    },
    price () {
      return this.$store.state.price
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

#btn-upd {
  margin: 0px 5px 0px 0px;
}

.page-wrapper {
  margin: 50px 0px;
}

.table {
  margin: 25px 0;
}
</style>