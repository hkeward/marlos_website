import Vue from "vue";
import Vuex from 'vuex';
import App from "./App.vue";
import router from "./router";
import fetchIntercept from 'fetch-intercept'
import { store } from './store/store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeading, faBold, faItalic, faUnderline, faTable, faLink, faImage } from '@fortawesome/free-solid-svg-icons';
require('./assets/styles.css');
require('./assets/Raleway.css');

Vue.config.productionTip = false;
Vue.use(Vuex);

library.add(faHeading,
            faBold,
            faItalic,
            faUnderline,
            faTable,
            faLink,
            faImage);

Vue.component('font-awesome-icon', FontAwesomeIcon);

// eslint-disable-next-line no-unused-vars
const unregister = fetchIntercept.register({
  request: (url, config) => {
    config.headers = config.headers || {};
    config.headers.Authorization = 'Bearer ' + store.state.keycloak.token;
    return [url, config];
  },

  requestError: function(error) {
    return Promise.reject(error);
  },

  response: function(response) {
    return response;
  },

  responseError: function(error) {
    return Promise.reject(error);
  }
});

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
