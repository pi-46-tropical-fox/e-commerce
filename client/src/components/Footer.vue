<template>
  <v-footer app dark padless fixed>
    <v-card class="flex" flat tile>
      <v-card-title class="grey darken-2">
        <span class="footer-title">Get connected with us on social networks!</span>
        <v-spacer></v-spacer>
        <v-btn v-for="(icon,i) in icons" :key="i" :href="icon.src" target=”_blank” class="mx-4" dark icon>
          <v-icon size="24px">{{ icon.name }}</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} —
        <strong>Mario Supit</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      {
        name: 'mdi-instagram',
        src: 'https://www.instagram.com/mariosarmando/'
      },
      {
        name: 'mdi-facebook',
        src: 'https://www.facebook.com/mariosupit'
      },
      {
        name: 'mdi-twitter',
        src: 'https://twitter.com/damnmario'
      }
    ]
  })
}
</script>

<style scoped>
.footer-title {
  font-family: 'Nunito', sans-serif;
}

.py-2.white--text {
  font-family: 'Nunito', sans-serif;
}
</style>
