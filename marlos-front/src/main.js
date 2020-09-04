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

// Filters
Vue.filter('capitalize', (value) => {
   if (!value) return '';
   value = value.toString();
   return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase().split('_').join(' ');
});

Vue.filter('title_case', (value) => {
    var converted = [];
    if (!value) {
        return '';
    } else {
        value.toString().split(/[\s_]/).forEach(word => {
            converted.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        });
        return converted.join(' ');
    }
});

Vue.filter('lowercase', (value) => {
    if (!value) {
        return ''
    } else {
        return value.toString().toLowerCase().split('_').join(' ');
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
