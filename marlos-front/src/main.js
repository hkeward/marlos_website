import Vue from "vue";
import Vuex from 'vuex';
import App from "./App.vue";
import router from "./router";
import { store } from './store/store';

Vue.config.productionTip = false;
Vue.use(Vuex);

// store.dispatch('initializeKeycloak')
//     .then(() => {
//         new Vue({
//             router,
//             store,
//             render: h => h(App)
//         }).$mount("#app");
//     });

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");


store.state.keycloak = {
    token: 'hithereIamfake'
};

store.state.isAdminUser = true;

