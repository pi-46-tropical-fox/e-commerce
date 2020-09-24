<template>
  <div class="bill-price-container">
      <h6> <i class="fas fa-chevron-right"></i> {{item.Product.name}}</h6>
      <small class="mx-auto">
          {{item.Product.price}} x  {{item.quantity}} = {{total}}
      </small>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'BillPrice',
  props: ['item'],
  computed: {
    total () {
      return this.item.quantity * this.item.Product.price
    }
  }

}
</script>

<style>

</style>
