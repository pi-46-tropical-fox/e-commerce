<template>
<transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog">
          <div class="modal-content">
            <!--  -->
            <div class="modal-body">
              <div>
                <form v-on:submit.prevent="onEditProduct" class="edit-form">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input
                    type="text" class="form-control" v-model="name">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Image URL</label>
                    <input
                    type="text" class="form-control" v-model="img_url">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Price (IDR)</label>
                    <input
                    type="text" class="form-control" v-model="price">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Stock(s)</label>
                    <input type="number" class="form-control" v-model="stock">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Category</label>
                    <select class="form-control" v-model="category">
                      <option>Men</option>
                      <option>Women</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Description</label>
                    <textarea rows="1" cols="1000" maxlength="5000" placeholder="Enter text here"
        id="add-description" class="form-control" v-model="description">
                    </textarea>
                  </div>
                  <button
                  type="button" class="btn btn-primary m-2" @click.prevent="onEditProduct">
                  Update!</button>
                  <button
                  type="button" class="btn btn-danger m-2" @click.prevent="cancelEdit">
                  Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'editProduct',

  data () {
    return {
      name: this.$store.state.storedData.name,
      img_url: this.$store.state.storedData.img_url,
      price: this.$store.state.storedData.price,
      stock: this.$store.state.storedData.stock,
      category: this.$store.state.storedData.category,
      description: this.$store.state.storedData.description,
      passUpdateDatas: {
        id: this.$store.state.storedData.id,
        name: '',
        img_url: '',
        price: '',
        stock: '',
        category: '',
        description: ''
      }

    }
  },
  methods: {
    onEditProduct () {
      this.passUpdateDatas.name = this.name
      this.passUpdateDatas.img_url = this.img_url
      this.passUpdateDatas.price = this.price
      this.passUpdateDatas.stock = this.stock
      this.passUpdateDatas.category = this.category
      this.passUpdateDatas.description = this.description
      this.$store.dispatch('editProduct', this.passUpdateDatas)
      this.$emit('emitShowEdit')
    },
    cancelEdit () {
      this.name = ''
      this.img_url = ''
      this.price = ''
      this.stock = ''
      this.category = ''
      this.description = ''
      this.$emit('emitShowEdit')
    }

  },
  mounted () {
    // console.log(this.dataEdit);
    console.log(this.name)
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(30, 139, 195, 1);
  display: table;
  margin-top: 0;

}
.modal-mask, modal-header {
  text-align: center;
  align-content: center;
  align-items: center;

}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  margin-top: 0;
}
input {
  text-align: center;
}
</style>
