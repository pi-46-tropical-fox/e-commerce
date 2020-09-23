<template>
  <tbody>
      <tr>
        <td><img :src="cart.Product.image_url" alt="" style="height: 5rem"></td>
        <td>{{cart.Product.name}}</td>
        <td>{{rupiahFormat}}</td>
        <td>
          <a href="#"><i class="fa fa-minus" aria-hidden="true" @click.prevent="minUpdate" data-toggle="tooltip" title="Reduce"></i>
          </a> <span v-if="qtyStatus === 'aman'" style="margin-left: 10px; margin-right: 10px;">{{cart.qty}}</span> <a href="#">
          </a> <span v-if="qtyStatus !== 'aman'" style="background-color: red; color: white; margin-left: 10px; margin-right: 10px;">{{cart.qty}}</span> <a href="#">
          <i class="fa fa-plus" aria-hidden="true" @click.prevent="addUpdate" data-toggle="tooltip" title="Add"></i></a>
        </td>
        <td><i class="fa fa-times" aria-hidden="true" style="color: red;" @click.t="deleteCart" data-toggle="tooltip" title="Delete"></i></td>
      </tr>
  </tbody>
</template>

<script>
export default {
  props: ['cart'],
  methods: {
    deleteCart () {
      this.$store.dispatch('deleteCart', this.cart.id)
    },
    minUpdate () {
      // console.log('masuk minus')
      if (this.cart.qty === 1) {
        this.$store.dispatch('deleteCart', this.cart.id)
      } else {
        this.$store.dispatch('updateMinCart', this.cart.id)
      }
    },
    addUpdate () {
      // console.log('masuk add')
      this.$store.dispatch('updateAddCart', this.cart.id)
    }
  },
  computed: {
    rupiahFormat () {
      return `Rp. ${this.cart.price.toLocaleString()}`
    },
    qtyStatus () {
      if (this.cart.qty <= this.cart.Product.stock) {
        return 'aman'
      } else {
        return 'stock tidak cukup'
      }
    }
  },
  updated () {
    if (this.qtyStatus !== 'aman') {
      this.$emit('tidakaman', this.cart.Product.name)
      // console.log('gak aman', this.cart.Product.name)
    } else {
      this.$emit('aman', this.cart.Product.name)
    }
  }
}
</script>

<style>
i {
  cursor: pointer
}
</style>
