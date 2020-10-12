import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Element from 'element-ui';
import Print from 'vue-print-nb';
import './styles/element-variables.scss';
import '@/styles/index.scss';
// import Blob from "@/excel/Blob.js";
// import Export2Excel from '@/excel/Export2Excel.js';

Vue.use(Element);
Vue.use(Print);

// 初始化地图的用户名和密码
window.SNTGIS.userName = 'admin';
window.SNTGIS.passWord = 'Sntsoft123';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
