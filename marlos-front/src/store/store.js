import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import mutations from './mutations';

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
    actions: {
        async getRoomData ({commit, state}) {
            if (state.fetched === true) {
                return;
            }
            try {
                const response = await fetch("https://heatherward.dev/rest/rooms", {
                    headers: {'Authorization': 'Bearer ' + state.keycloak.token}
                });
                const data_array = await response.json();
                const data_json = Object.assign({}, ...(data_array.map(item => ({ [item['roomId']]: item }) )));
                commit('SET_ROOMS', data_json);
            } catch (err) {
                console.error(err.message);
            }
        },
        async addRoom ({ commit, state }, room) {
            try {
                const response = await fetch('https://heatherward.dev/rest/rooms', {
                    method: 'POST',
                    body: JSON.stringify(room),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'Authorization': 'Bearer ' + state.keycloak.token
                    }
                });
                const data = await response;
                const roomId = await data.json();
                if (data.status === 200) {
                    const newRoom = {...room, roomId};
                    commit('ADD_ROOM', newRoom);
                    router.push("/rooms");
                }
            } catch(error) {
                console.error(error);
            }
        },
        toggleEditing({commit}, mode) {
            commit('EDIT_MODE', mode);
        },
        async editRoom ({ commit, state }, updatedRoom) {
            try {
                const response = await fetch(`https://heatherward.dev/rest/rooms/${updatedRoom.roomId}`, {
                    method: 'PUT',
                    body: JSON.stringify(updatedRoom),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        'Authorization': 'Bearer ' + state.keycloak.token
                    }
                });
                const data = await response;
                if (data.status === 400) {
                    const errorMessage = await data.json();
                    console.error(errorMessage);
                } else if (data.status === 200) {
                    commit('SAVE_ROOM', updatedRoom);
                    commit('EDIT_MODE', false);
                }
            } catch (error) {
                console.error(error);
            }
        },
        async deleteRoom({ commit, state }, roomId) {
          try {
              const response = await fetch(`https://heatherward.dev/rest/rooms/${roomId}`, {
                  method: 'DELETE',
                  headers: {'Authorization': 'Bearer ' + state.keycloak.token}
              });
              const data = await response;
              if (data.status === 200) {
                  commit('DELETE_ROOM', roomId);
                  router.push("/rooms");
              }
          } catch (error) {
              console.error(error);
          }
        },
        initializeKeycloak ({ commit, state }) {
            commit('CONFIGURE_KEYCLOAK');
            return new Promise(function(resolve, reject) {
                state.keycloak.init({onLoad: "login-required"})
                    .success(auth => {
                        if (!auth) {
                            window.location.reload();
                            reject();
                        } else {
                            console.log("Authenticated");
                            commit('SET_USER_ROLE');
                            resolve();
                        }
                    })
                    .error(e => {
                   reject(e);
                });
            })
        }
    }
});
