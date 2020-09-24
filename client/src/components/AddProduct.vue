<template>
  <div >
    <form v-on:submit.prevent="onAddProduct">
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input type="text" class="form-control" id="add-name" v-model="name">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Image URL</label>
        <input type="text" class="form-control" id="add-img-url" v-model="img_url">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Price (IDR)</label>
        <input type="text" class="form-control" id="add-price" v-model="price">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Stock(s)</label>
        <input type="number" class="form-control" id="add-stock" v-model="stock">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Category</label>
        <select class="form-control" id="add-category" v-model="category">
          <option>Men</option>
          <option>Women</option>
        </select>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Description</label>
        <textarea rows="1" cols="1000" maxlength="5000" class="form-control"
        placeholder="Enter text here"
        id="add-description"
        v-model="description">
        </textarea>
      </div>
      <button type="submit" class="btn btn-info mb-3">Submit</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'addProduct',
  data () {
    return {
      name: '',
      img_url: '',
      price: '',
      stock: '',
      category: '',
      description: ''

    }
  },
  methods: {
    onAddProduct () {
      this.$store.dispatch('addProduct', {
        name: this.name,
        img_url: this.img_url,
        price: String(this.price).toLocaleString(),
        stock: this.stock,
        category: this.category,
        description: this.description
      })
      this.name = ''
      this.img_url = ''
      this.price = 0.0
      this.stock = 0.0
      this.category = ''
      this.description = ''
    }

  }
}
</script>

<style>
input {
  text-align: center;
}
select {
  align-content: center;
}
</style>
