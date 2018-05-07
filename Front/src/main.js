import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import App from './App.vue';
import {router} from './router';


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
