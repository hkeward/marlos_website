import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as Keycloak from 'keycloak-js'
//
// let keycloakScript = document.createElement('script');
// keycloakScript.setAttribute('src', 'https://keycloak.heatherward.dev/auth/js/keycloak.js');
// document.head.appendChild(keycloakScript);

Vue.config.productionTip = false;

let keycloakConfig = {
    "realm": "marlos",
    "url": "https://keycloak.heatherward.dev/auth",
    "clientId": "marlos-front"
};

let keycloak = new Keycloak(keycloakConfig);

keycloak.init({ onLoad: 'login-required' }).success((auth) => {
  if(!auth) {
      console.log("Auth doesn't exist");
    // window.location.reload();
  } else {
    console.log("Authenticated");
  }

  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}).error(() => {
  console.log("Authentication failed");
});

