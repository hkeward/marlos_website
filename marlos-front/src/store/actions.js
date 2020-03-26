import router from '../router'

const getRoomData = async ({commit, state}) => {
    if (state.fetched === true) {
        return;
    }
    try {
        const response = await fetch("https://heatherward.dev/rest/rooms", {});
        const data_array = await response.json();
        const data_json = Object.assign({}, ...(data_array.map(item => ({ [item['id']]: item }) )));
        commit('SET_ROOMS', data_json);
    } catch (err) {
        throw Error("Error fetching room data");
    }
};

const addRoom = async ({ commit, state }) => {
    try {
        const response = await fetch('https://heatherward.dev/rest/rooms', {
            method: 'POST',
            body: JSON.stringify(state.genericRoom),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        const data = await response;
        const id = await data.json();
        if (data.status === 200) {
            const newRoom = {...state.genericRoom, id};
            commit('ADD_ROOM', newRoom);
            router.push(`/rooms/${id}`);
            commit('EDIT_MODE', id);
            commit('SET_INFO_EXPANDED', true);
            commit('SET_NEW_ROOM', true);
        }
    } catch(error) {
        throw Error("Error adding room");
    }
};

const toggleEditing = ({ commit }, mode) => {
    commit('EDIT_MODE', mode);
};

const toggleInfoExpanded = ({commit, state}) => {
    commit('SET_INFO_EXPANDED', !state.infoExpanded);
};

const editRoom = async ({ commit, state }, updatedRoom) => {
    try {
        const response = await fetch(`https://heatherward.dev/rest/rooms/${updatedRoom.id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedRoom),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        const data = await response;
        if (data.status === 200) {
            commit('SAVE_ROOM', updatedRoom);
            commit('EDIT_MODE', false);
            if (state.isNewRoom) {
                commit('SET_NEW_ROOM', false);
                commit('SET_INFO_EXPANDED', false);
            }
        }
    } catch (error) {
        throw Error("Error saving room");
    }
};

const deleteRoom = async ({ commit, state }, id) => {
    try {
        const response = await fetch(`https://heatherward.dev/rest/rooms/${id}`, {
            method: 'DELETE'
        });
        const data = await response;
        if (data.status === 200) {
            commit('DELETE_ROOM', id);
            if (state.isNewRoom) {
                commit('SET_NEW_ROOM', false);
                commit('SET_INFO_EXPANDED', false);
            }
            router.push("/rooms");
        }
    } catch (error) {
        throw Error("Error deleting room");
    }
};

const initializeKeycloak = ({ commit, state, dispatch }) => {
    commit('CONFIGURE_KEYCLOAK');
    return new Promise(function(resolve, reject) {
        state.keycloak.init({onLoad: "login-required"})
            .success(auth => {
                if (!auth) {
                    window.location.reload();
                    reject();
                } else {
                    commit('SET_USER_ROLE');
                    state.keycloak.onTokenExpired = () => {
                        dispatch("refreshToken")
                            .catch(() => {
                                console.error("Error refreshing token");
                            });
                    };
                    // Force the first token refresh; onTokenExpired seems only to start up after the first refresh
                    dispatch("refreshToken", 3600);
                    resolve();
                }
            })
            .error(e => {
                reject(e);
            });
    })
};

const refreshToken = ({ state }, minValidity=30) => {
    return state.keycloak.updateToken(minValidity);
};

export default {
    getRoomData,
    addRoom,
    toggleEditing,
    toggleInfoExpanded,
    editRoom,
    deleteRoom,
    initializeKeycloak,
    refreshToken
};