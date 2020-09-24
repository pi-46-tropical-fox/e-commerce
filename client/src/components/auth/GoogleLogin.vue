<template>
  <div>
    <div class="wrapper text-center">
      <span class="block mb-4">Or sign in using your Google account</span>
      <div id="g-signin" class="flex justify-center"></div>
    </div>
  </div>
</template>

<script>
export default {
    mounted() {
        this.renderButton()
    },

    methods: {
        gSignInOnSuccess(googleUser){
            this.$store.dispatch('googleLogin', googleUser)
        },
        gSignInOnFail(error){
            console.log(error);
        },
        renderButton(){
            gapi.signin2.render('g-signin', {
                'scope': 'profile email',
                'width': 240,
                'height': 50,
                'longtitle': true,
                'theme': 'dark',
                'onsuccess': this.gSignInOnSuccess,
                'onfailure': this.gSignInOnFailure
            });
        }
    }
};
</script>

<style>
</style>