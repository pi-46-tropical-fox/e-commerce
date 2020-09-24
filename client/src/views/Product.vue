<template>
  <div class="Product">
    <div class="container" id="todolist">
      <h1>All Products</h1>
      <button class="btn btn-info logout float-right" @click.prevent="logOut">LogOut</button>
      <div class="add-trigger">
        <button @click.prevent="showAdd()" class="btn btn-warning float-left">
          {{btnAddName}}</button><br><br>
        <AddProduct v-if="showFormAdd" class="" role="group"></AddProduct>
      </div>
      <table class="table" id="table-todo">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Price (IDR)</th>
            <th scope="col">Stock</th>
            <th scope="col">Category</th>
            <th scope="col">Description</th>
            <th scope="col" colspan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, idx) in this.$store.state.allProducts" :key='idx'>
            <td class="td-input">
              <img v-bind:src="product.img_url" width="150px" height="auto;">
            </td>
            <td class="td-input" style="vertical-align:middle"> {{product.name}} </td>
            <td class="td-input" style="vertical-align:middle">
              {{priceFormat(product.price)}}</td>
            <td class="td-input" style="vertical-align:middle"> {{product.stock}} </td>
            <td class="td-input" style="vertical-align:middle"> {{product.category}} </td>
            <td class="td-input" style="vertical-align:middle"> {{product.description}} </td>
            <td class="td-input" style="vertical-align: middle;">
                <button
                 type="button"
                 @click.prevent="onDeleteProduct(product.id)" class="btn btn-danger mr-2">
                  Delete</button>
            </td>
            <td class="td-input" style="vertical-align: middle;">
                <button @click.prevent="showEdit(idx)" class="btn btn-success">
                  {{btnEditName}}</button>
            </td>
                <EditProduct v-if="showFormEdit" @emitShowEdit="showEdit" class="" role="group">
                </EditProduct>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import AddProduct from '@/components/AddProduct.vue'
import EditProduct from '@/components/EditProduct.vue'
import Swal from 'sweetalert2'
export default {
  name: 'Product',
  components: {
    AddProduct,
    EditProduct
  },
  props: [],
  data () {
    return {
      products: '',
      showFormAdd: false,
      showFormEdit: false,
      btnAddName: 'Add Product',
      btnEditName: 'Edit'
    }
  },
  created () {
    this.getAllProducts()
  },
  methods: {
    getAllProducts () {
      this.$store.dispatch('getProduct')
      console.log('getAllProduct in Product.vue', this.$store.state.allProducts)
    },
    logOut () {
      localStorage.clear()
      this.$router.push({ name: 'Login' })
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Logging Out',
        showConfirmButton: false,
        timer: 1500
      })
    },
    onDeleteProduct (id) {
      this.$store.dispatch('deleteProduct', id)
    },
    onEditProduct (id) {
      console.log('MASUK EDIT di PRODUCT for axios', id)
      this.$store.dispatch('editProduct', id)
    },
    showAdd () {
      if (this.showFormAdd) {
        this.showFormAdd = false
        this.btnAddName = 'Click me to add a product!'
      } else if (!this.showFormAdd) {
        this.showFormAdd = true
        this.btnAddName = 'Minimize me!'
      }
    },
    showEdit (index) {
      if (this.showFormEdit) {
        this.showFormEdit = false
        this.btnEditName = 'Edit'
      } else {
        console.log('masuk showEdit di RPDUCT', index)
        this.$store.dispatch('getStoredProduct', index)
        this.showFormEdit = true
        this.btnEditName = 'Minimize me!'
      }
    },
    priceFormat (num) {
      const newData = num.toLocaleString()
      return `Rp. ${newData},00`
    }
  }
}
</script>

<style >
.btn-warning {
  color: white;
}

</style>
