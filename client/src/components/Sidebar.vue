<template>
  <div class="container">
    <div class="list">
      <ul><h3>Gender</h3>
        <li
          v-for="(gender, index) in genders" :key="index"
        >
          <router-link :to="`/${gender.gender}`" >{{gender.gender}}</router-link>
        </li>
      </ul>
    </div>
    <div class="list">
      <ul><h3>Category</h3>
        <li
          v-for="category in categories" :key="category.id"
        >
          <router-link :to="`/${category.id}`" >{{category.category}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      gender: '',
      id: ''
    }
  },
  computed: {
    categories: {
      get () {
        return this.$store.state.categories
      }
    },
    genders: {
      get () {
        return this.$store.state.genders
      }
    }
  },
  methods: {
  },
  created () {
    this.$store.dispatch('fetchCategories')
  }

}
</script>

<style>
.home {
  display: flex
}
.list {
    margin-top: 30px;
}
li {
  margin: 15px 0;
  text-decoration: none;
}

</style>
