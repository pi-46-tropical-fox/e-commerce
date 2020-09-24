import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faLock, faRocket, faShoppingCart, faHeart, faUser, faPlusSquare, faMinusSquare, faHome, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEnvelope, faLock, faRocket, faShoppingCart, faHeart, faUser, faPlusSquare, faMinusSquare, faHome, faPhone)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
