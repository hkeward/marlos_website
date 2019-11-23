import Vue from "vue";
import Vuex from 'vuex';
import App from "./App.vue";
import router from "./router";
import { store } from './store/store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeading, faBold, faItalic, faUnderline, faTable, faLink } from '@fortawesome/free-solid-svg-icons';
require('./assets/styles.css');
require('./assets/Raleway.css');

Vue.config.productionTip = false;
Vue.use(Vuex);

library.add(faHeading,
            faBold,
            faItalic,
            faUnderline,
            faTable,
            faLink);

Vue.component('font-awesome-icon', FontAwesomeIcon);

store.dispatch('initializeKeycloak')
    .then(() => {
        new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount("#app");
    })
    .catch(() => {
        throw Error("Failed initializing keycloak");
    });
