<template>
  <div>
    <Navbar></Navbar>
    <div class="container mt-5 text-left">
      <div class="row">
        <div class="col-6">
          <h1 class="text-danger mt-5">404: Not Found</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <h4 class="mt-2">Full-Stuck Philosophy</h4>
          <p>Full-Stuck was initially invented when the author have to face the truthful reality that he, himself, just got stuck so many times by the obstacles in becoming a full-stack developer. Never waver, he pushes himself harder to break all the obstacles.</p>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
export default {
  name: 'About',
  components: {
    Navbar,
    Footer
  }
}
</script>
