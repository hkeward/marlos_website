import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import * as Keycloak from "keycloak-js";

Vue.config.productionTip = false;

let keycloakConfig = {
  realm: "marlos",
  url: "https://keycloak.heatherward.dev/auth",
  clientId: "marlos-front"
};

let keycloak = new Keycloak(keycloakConfig);

keycloak
  .init({ onLoad: "login-required" })
  .success(auth => {
    if (!auth) {
      window.location.reload();
    } else {
      console.log("Authenticated " + keycloak.token);
    }

    new Vue({
      router,
      data: {
        keycloak: keycloak
      },
      render: h => h(App)
    }).$mount("#app");
  })
  .error(() => {
    console.log("Authentication failed");
  });
