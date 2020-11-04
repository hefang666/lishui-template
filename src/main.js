import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import jsCookie from 'js-cookie'
import Element from "element-ui";
import moment from 'moment'
import "./styles/element-variables.scss";
import "@/styles/index.scss";
import KtButton from "./components/ktButton/KtButton"

Vue.prototype.$cookie = jsCookie
Vue.prototype.$moment = moment
Vue.use(Element);
Vue.component("KtButton", KtButton);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");