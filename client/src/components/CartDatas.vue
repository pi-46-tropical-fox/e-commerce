<template>
    <tr>
        <td scope="row">
            <img width="200"
            :src="cart.Product.image_url"
            alt="image">
        </td>
        <td style="width: 15rem;">{{cart.Product.name}}</td>
        <td style="width: 10rem;">{{price}}</td>
        <div class="container">
            <div v-html="plusIcon" id="icon" @click.prevent="plus(cart.id, cart.quantity, cart.Product.id)">  </div>
            {{cart.quantity}}
            <div v-html="minusIcon" id="icon" @click.prevent="minus(cart.id, cart.quantity, cart.Product.id)">  </div>
          </div>
          <td>
            <a @click="deleteCart(cart.id)" role="button" class="btn btn-danger">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </a>
        </td>
    </tr>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CartDatas',
  props: ['cart'],
  data () {
    return {
      plusIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>',
      minusIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-12v-2h12v2z"/></svg>'
    }
  },
  computed: {
    price () {
      return (this.cart.Product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }))
    }
  },
  methods: {
    deleteCart (id) {
      console.log(id, 'ini id')
      this.$store.dispatch('deleteCart', id)
    },
    minus (id, quantity, ProductId) {
      if (+quantity - 1 === 0) {
        return swal('Can not Proceed!', 'Please delete product!', 'error')
      }
      axios({
         url: `${this.baseUrl}/carts/${id}/quantity`,
        method: 'PATCH',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          quantity: +quantity - 1,
          ProductId: ProductId
        }
      })
        .then(() => {
          this.$store.dispatch('fetchCarts')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    plus (id, quantity, ProductId) {
      if (this.cart.Product.stock < +quantity + 1) {
        return swal('Can not Proceed!', 'Stock is not available!', 'error')
      }
      axios({
        url: `${this.baseUrl}/carts/${id}/quantity`,
        headers: {
          access_token: localStorage.access_token
        },
        method: 'PATCH',
        data: {
          quantity: +quantity + 1,
          ProductId
        }
      })
        .then(data => {
          this.$store.dispatch('fetchCarts')
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }
  }
}
</script>

<style>

</style>
