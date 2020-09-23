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
      <td class="align-middle">{{cart.Product.price}}</td>
      <td class="align-middle">
        <div class="align-middle row row-cols-3">
          <button type="button" @click="removeMore(cart.id)" class="btn btn-primary">-</button>

          <div class="card my-auto" >{{cart.quantity}}</div>
          <button type="button" @click="addMore(cart.id)" class="btn btn-primary">+</button>
        </div>
        </td>
      <td class="align-middle">Totalnya</td>
      <td class="align-middle">
        <a href="#" class="btn btn-product btn-primary" @click="deleteItem(cart.id)">Delete</a>
      </td>
    </tr>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'CartCard',
  props: ['cart', 'number'],
  methods: {
    addMore (id) {
      this.$store.dispatch('addOne', id)
    },
    removeMore (id) {
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
