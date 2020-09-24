<template>
  <div>
    <div class="my-modal">
      <div class="my-modal-content">
        <span class="close-my-modal" @click.prevent="closeMyModal">&times;</span>
        <form @submit.prevent="updateProfile">
            <div class="form-group">
                <label for="address">Address</label>
                <input type="text" class="form-control" v-model="address">
            </div>
            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="text" class="form-control" v-model="phone">
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Shipping',
  data () {
    return {
      address: '',
      phone: ''
    }
  },
  methods: {
    updateProfile () {
      const obj = {
        address: this.address.trim(),
        phone: this.phone.trim()
      }
      this.$store.dispatch('updateProfile', obj)
    },
    closeMyModal () {
      this.$router.push({ name: 'Cart' })
    }
  }
}
</script>

<style>

</style>
