<template>
  <div id="sign" class="container">
    <div class="sing-log-wrap">
      <div class="container"   style="height: 100vh width: 100vw">
        <div id="row-contain" class="row justify-content-center">
          <div class="col-md-6 col-md-offset-3">
            <div class="form-area">
              <div class="form-sing">
                <ul class="nav nav-tabs" role="tablist">
                  <li role="presentation" class="active">
                    <router-link to="/login">Sign In</router-link>
                  </li>
                  <li role="presentation">
                    <router-link to="/register">Sign Up</router-link>
                  </li>
                </ul>
                <div class="tab-content">
                  <router-view />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegistrationPage'
}
</script>

<style>
</style>
