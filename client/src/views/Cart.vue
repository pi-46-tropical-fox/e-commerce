<template>
  <div>
      <Navbar/>
    <div class="container">
      <h1 class="display-1 my-5">Your Cart</h1>
      <h2 class="display-2 my-5">{{ $store.state.email }}</h2>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">
              <h4>Product Image</h4>
            </th>
            <th scope="col">
              <h4>Name</h4>
            </th>
            <th scope="col">
              <h4>Price</h4>
            </th>
            <th scope="col">
              <h4>Quantity</h4>
            </th>
            <th scope="col">
              <h4>Action</h4>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <th>
              <img :src="item.Product.image_url" alt class="img-thumbnail" style="max-width: 10vw;" />
            </th>
            <td>
              <h5>{{ item.Product.name }}</h5>
            </td>
            <td>
              <h5>{{ new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.Product.price) }}</h5>
            </td>
            <td class="d-inline-flex align-items-center">
                <button class="btn btn-sm btn-primary mx-2" @click="editCartQty(item.id, 1)">-</button>
                <h5>{{ item.quantity }}</h5>
                <button class="btn btn-sm btn-primary mx-2" @click="editCartQty(item.id, -1)">+</button>
            </td>
            <td>
              <!-- <button >Edit</button> -->
              <!-- <router-link :to="{ name:'Edit', params:{ id : product.id }}" class="btn btn-primary mx-1">Edit</router-link> -->
              <button class="btn btn-primary mx-1" @click="deleteCart(item.id, item.Product.id, item.quantity)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
export default {
    components: {
        Navbar
    },
    created () {
        this.$store.dispatch('getCart')
    },
    computed: {
        cart () {
            return this.$store.state.cart
        }
    },
    methods: {
        deleteCart(id, productID, qty) {
            const params = {
                id: id,
                productID: productID,
                qty: qty
            }
            this.$store.dispatch('deleteCartItem', params)
            .then(result => {
                console.log(result);
                this.$store.dispatch('getCart')
            })
        },
        editCartQty (id, operator) {
            const params = {
                id: id,
                operator: operator
            }
            this.$store.dispatch('editCartQty', params)
            .then(result => {
                console.log(result);
                this.$store.dispatch('getCart')
            })
        }
    }
};
</script>