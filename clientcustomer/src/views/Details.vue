<template>
  <DetailsForm :product="this.$store.state.tampungDetail"></DetailsForm>
</template>

<script>
import DetailsForm from '../components/DetailsForm.vue'
export default {
  name: 'Details',
  components: {
    DetailsForm
  },
  created () {
    this.$store.dispatch('details', this.$route.params.id)
  },
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>
