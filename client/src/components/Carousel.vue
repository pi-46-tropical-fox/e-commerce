<template>
  <v-carousel cycle height="400" :hide-delimiters="true" show-arrows-on-hover>
    <v-carousel-item eager v-for="(item, i) in items" :key="i">
      <v-img :src="item.src" height="115%" eager/>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { src: 'https://i.imgur.com/Y3kiGqx.png' },
        { src: 'https://i.imgur.com/0BjUaGn.png' },
        { src: 'https://i.imgur.com/IG4R5pl.png' },
        { src: 'https://i.imgur.com/m5pj6Wm.jpg' },
        { src: 'https://i.imgur.com/TEAvYai.png' }
      ]
    }
  }
}
</script>
