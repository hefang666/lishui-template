import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Element from 'element-ui';
import './styles/element-variables.scss';
import '@/styles/index.scss';

import Print from 'vue-print-nb'
Vue.use(Print)
Vue.use(Element);

import {get, post, deletes} from './api/index';
Vue.prototype.$HTTPGET = get;
Vue.prototype.$HTTPPOST = post;
Vue.prototype.$HTTPDEL = deletes;
import {api} from './api/api.js';
Vue.prototype.api = api;


import {handlechangedate} from './utils'
Vue.prototype.$changeTime = handlechangedate
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
