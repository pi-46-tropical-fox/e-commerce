import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import titleMixin from './mixins/titleMixin';
import Buefy from 'buefy';
import '@/assets/scss/main.scss';
import VueCurrencyFilter from 'vue-currency-filter';

Vue.use(Buefy, {
    defaultIconPack: 'fas',
});

Vue.mixin(titleMixin);

Vue.use(VueCurrencyFilter, {
    symbol: 'Rp',
    thousandsSeparator: '.',
    symbolPosition: 'front',
    symbolSpacing: true,
    avoidEmptyDecimals: undefined,
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
