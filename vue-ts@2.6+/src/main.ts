import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";

import "normalize.css";
import "element-ui/lib/theme-chalk/index.css";
import CrossForm from "@/components/vue";

Vue.use(CrossForm);
Vue.use(ElementUI);

new Vue({
    router,
    render: (h) => h(App)
}).$mount("#app");
