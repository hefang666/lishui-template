import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from "element-ui";
import "./styles/element-variables.scss";
import "@/styles/index.scss";
// import ol from 'openlayers';

// Vue.prototype.$ol = ol;

Vue.use(Element);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");