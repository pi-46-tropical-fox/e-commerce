<template>
    <div>
        <div class="col-3 my-2 ml-1">
            <div class="card" style="width: 15rem; height: 25rem;">
                <a @click="detailProduct(product.id)"
                    class="detailProduct"
                    role="button">
                <img height="200"
                :src="product.image_url"
                class="card-img-top"
                alt="image"></a>
                <div
                class="card-body d-flex flex-column justify-content-around">
                    <span
                    class="card-text text-truncate font-weight-bold">
                    {{product.name}}</span>
                    <span class="card-text text-wrap">Price: {{price}}</span>
                    <span class="card-text text-wrap">Stock : {{product.stock}}</span>
                    <span class="card-text text-truncate">{{product.category}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Products',
  props: ['product'],
  computed: {
    price () {
      return this.product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
    }
  },
  methods: {
    detailProduct (id) {
      this.$store.dispatch('findProduct', id)
    }
  }
}
</script>

<style>

</style>
