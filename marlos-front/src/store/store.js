import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        KEYCLOAK_CONFIG: {
            realm: "marlos",
            url: "https://keycloak.heatherward.dev/auth",
            clientId: "marlos-front"
        },
        keycloak: {},
        rooms: {},
        editing: null,
        isAdminUser: false,
        fetched: false
    },
    mutations,
    actions
});
