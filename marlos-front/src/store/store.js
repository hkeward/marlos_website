import Vue from 'vue'
import Vuex from 'vuex'
import * as Keycloak from 'keycloak-js'
import router from '../router'

// Mutations
import { SET_ROOMS, ADD_ROOM, EDIT_MODE, SAVE_ROOM, DELETE_ROOM, CONFIGURE_KEYCLOAK, SET_USER_ROLE } from './mutations'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        KEYCLOAK_CONFIG: {
            realm: "marlos",
            url: "https://keycloak.heatherward.dev/auth",
            clientId: "marlos-front"
        },
        keycloak: {},
        // TODO temp
        rooms: {},
        // end temp
        editing: null,
        isAdminUser: false,
        fetched: false
    },
    mutations: {
        [SET_ROOMS] (state, rooms) {
            state.fetched = true;
            state.rooms = rooms;
        },
        [ADD_ROOM] (state, newRoom) {
            state.rooms[newRoom.roomId] = newRoom;
        },
        [EDIT_MODE] (state, mode) {
            state.editing = mode;
        },
        [SAVE_ROOM] (state, updatedRoom) {
            state.rooms[updatedRoom.roomId] = updatedRoom;
        },
        [DELETE_ROOM] (state, roomId) {
            delete state.rooms[roomId];
        },
        [CONFIGURE_KEYCLOAK] (state) {
            state.keycloak = new Keycloak(state.KEYCLOAK_CONFIG);
        },
        [SET_USER_ROLE] (state) {
            state.isAdminUser = state.keycloak.hasRealmRole('admin');
        }
    },
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
                // TODO temp vv
                room['roomId'] = 3;
                commit('ADD_ROOM', room);
                router.push("/rooms");
                // TODO end temp
            }
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
                // TODO temp
                commit('SAVE_ROOM', updatedRoom);
                commit('EDIT_MODE', false);
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
              // TODO temp vv
              commit('DELETE_ROOM', roomId);
              router.push("/rooms");
              //  TODO end temp
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
                })
        }
    }
});
