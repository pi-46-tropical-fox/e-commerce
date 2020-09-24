<template>

    <tr>
      <th scope="row" class="align-middle" > {{ number+1 }}</th>
      <td class="align-middle">
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row no-gutters">
            <div class="col-md-6">
             <img :src="cart.Product.image_url" class="card-img-top rounded mx-auto"
                alt="product" id="imageProduct">
            </div>
            <div class="col-md-6">
              <div class="card-body">
                <h5 class="card-title">{{cart.Product.name}}</h5>
              </div>
            </div>
          </div>
        </div>
        </td>
      <td class="align-middle">Rp. {{cart.Product.price}}</td>
      <td class="align-middle">
        <div class="align-middle row row-cols-3">
          <button type="button" @click="removeMore(cart.id)" class="btn btn-primary" style=" padding: 0 !important;">-</button>

          <div class="card my-auto" >{{cart.quantity}}</div>
          <button type="button" @click="addMore(cart.id)" class="btn btn-primary" style=" padding: 0 !important;">+</button>
        </div>
        </td>
      <td class="align-middle">Rp. {{total}}</td>
      <td class="align-middle">
        <a href="#" class="btn btn-product btn-primary" style=" padding: 1em !important;" @click="deleteItem(cart.id)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18px" height="18px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/></svg> <br><small>Delete</small></a>
      </td>
    </tr>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'CartCard',
  props: ['cart', 'number'],
  data () {
    return {
      total: 0
    }
  },
  methods: {
    addMore (id) {
      this.cart.quantity++
      this.total += this.cart.Product.price
      this.$store.commit('setTotal', this.total)
      this.$store.dispatch('addOne', id)
    },
    removeMore (id) {
      this.cart.quantity--
      this.total -= this.cart.Product.price
      this.$store.commit('setTotal', this.total)
      this.$store.dispatch('removeOne', id)
    },
    deleteItem (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
        this.confirmDelete(id)
      })
    },
    confirmDelete (id) {
      this.$store.dispatch('deleteCart', id)
      this.$emit('removeData', id)
    }
  },
  created () {
    this.total = this.cart.Product.price * this.cart.quantity
  }
}
</script>

<style>
#imageProduct {
   width: auto;
    height: 120px;
    display: block;
}
</style>
