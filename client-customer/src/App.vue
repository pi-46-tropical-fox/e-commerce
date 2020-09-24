<template>
  <div id="app">
    <router-view/>
    <div id="nav">
      <router-link to="/home"></router-link>
      <router-link to="/category/:category"></router-link>
      <router-link to="/"></router-link>
    </div>
  </div>
</template>

<style>
/* KEYFRAME */
@keyframes bannerGradient {
  0%{background-position:28% 0%}
  50%{background-position:73% 100%}
  100%{background-position:28% 0%}
}
/* GENERAL */
#app  {
  background: linear-gradient(211deg, #01579b, #1e4376);
  background-size: 400% 400%;
  animation: bannerGradient 3s ease infinite;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
