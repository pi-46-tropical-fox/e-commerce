<template>

<section class="signup-section" style="height:92vh" id="signup">
              <NavbarLogin/>
            <div class="container">
                 <router-view/>
            </div>
        </section>
  <!-- <div class="container">

      <div class="row mt-5">
          <div class="col-6">
            <img src="../assets/image.png" class="card-img-top" alt="Login Image">
          </div>
          <div class="col-6 card shadow">
            <NavbarLogin/>

            <router-view/>
            </div>
            <img src="../assets/logowebsite.png" class="card-img-top" alt="Login Image" style="width: 40%; height:auto;">

          </div>
      </div> -->
</template>

<script>
import NavbarLogin from '../components/NavbarLogin.vue'

export default {
  name: 'LoginPage',
  components: {
    NavbarLogin
  }

}
</script>

<style>
#loginbtn {
  color: rgb(236 173 60);
  font-weight: bold;
  width: 200px;
}

.loginColumn {
  width: 200px;
}

</style>
