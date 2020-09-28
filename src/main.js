import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Element from 'element-ui';
import './styles/element-variables.scss';
import '@/styles/index.scss';

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

Vue.use(VXETable)
import VideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';
Vue.use(VideoPlayer);

Vue.use(Element);

import {get, post, deletes, put} from './api/index';
Vue.prototype.$HTTPGET = get;
Vue.prototype.$HTTPPOST = post;
Vue.prototype.$HTTPDEL = deletes;
Vue.prototype.$HTTPPUT = put;
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
