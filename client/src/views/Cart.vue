<template>
  <div class="container mt-5 animate__animated animate__fadeIn">
    <div class="row">
      <div class="col">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th></th>
            </tr>
          </thead>
          <Table v-for="cart in carts" :key="cart.id" :cart="cart" @tidakaman="status" @aman="aman"></Table>
        </table>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-header">Invoice</div>
          <div class="card-body">
            <h5
              v-if="$store.state.qtyAman === false"
              style="color: red; matgin-bottom: 15px"
            >Sorry, we don't have enough {{noStock.join(',')}} shoes in our stock.</h5>
            <h4 class="card-title">Total Price</h4>
            <h5 class="card-text">{{totalPrice}}</h5>
            <a href="#" class="btn btn-success mt-3" @click.prevent="checkout">
              <b>Checkout</b>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from '../components/CartTable'
import Swal from 'sweetalert2'
export default {
  components: {
    Table
  },
  data () {
    return {
      noStock: []
    }
  },
  methods: {
    fetchCart () {
      this.$store.dispatch('fetchCart')
    },
    checkout () {
      if (this.totalPrice !== 'Rp. 0') {
        if (this.qtyStatus) {
          console.log(this.carts, 'dari checkout')
          for (let i = 0; i < this.carts.length; i++) {
            this.$store.dispatch('checkout', this.carts[i])
          }
          Swal.fire({
            icon: 'success',
            title: 'Thank you for shopping'
          })
        } else {
          Swal.fire('Sorry, please check your order quantity.')
        }
      } else {
        Swal.fire('Insert your cart before checkout.')
      }
    },
    status (payload) {
      // console.log('masuk method status di cart', payload)
      this.name = payload
      if (this.noStock.length < 1) {
        this.noStock.push(payload)
      } else {
        let flag = true
        for (let i = 0; i < this.noStock.length; i++) {
          // console.log(this.noStock[i])
          if (this.noStock[i] !== payload) {
            // console.log('beda', payload)
          } else {
            flag = false
            // console.log('sama')
          }
        }
        if (flag) {
          this.noStock.push(payload)
          // console.log('harusnya bisa nambah')
        }
      }
    },
    aman (payload) {
      // console.log('aman', payload)
      let index = 0
      for (let i = 0; i < this.noStock.length; i++) {
        if (this.noStock[i] === payload) {
          index = i
        }
      }
      this.noStock.splice(index, 1)
    }
  },
  created () {
    this.fetchCart()
  },
  computed: {
    carts () {
      return this.$store.state.carts
    },
    totalPrice () {
      let ttlPrice = 0
      this.carts.forEach((el) => {
        ttlPrice += el.price
      })
      return `Rp. ${ttlPrice.toLocaleString()}`
    },
    qtyStatus () {
      return this.$store.state.qtyAman
    }
  },
  updated () {
    if (this.noStock.length >= 1) {
      this.$store.commit('SET_QTY_AMAN', false)
    } else {
      this.$store.commit('SET_QTY_AMAN', true)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
