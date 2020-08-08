import router from '../router'

const getRoomData = async ({commit, state}) => {
    if (state.fetched.rooms === true) {
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
            commit('EDIT_MODE', {type: 'room', mode: id});
            commit('SET_INFO_EXPANDED', true);
            commit('SET_NEW', {type: 'room', mode: true});
        }
    } catch(error) {
        throw Error("Error adding room");
    }
};

const getCreatureData = async ({commit, state}) => {
    if (state.fetched.creatures === true) {
        return;
    }
    try {
        const response = await fetch("https://heatherward.dev/rest/creatures", {});
        const data_array = await response.json();
        const data_json = Object.assign({}, ...(data_array.map(item => ({ [item['id']]: item }) )));
        commit('SET_CREATURES', data_json);
    } catch (err) {
        throw Error("Error fetching creature data");
    }
};

const addCreature = async ({ commit, state }) => {
    try {
        const response = await fetch('https://heatherward.dev/rest/creatures', {
            method: 'POST',
            body: JSON.stringify(state.genericCreature),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        const data = await response;
        const id = await data.json();
        if (data.status === 200) {
            const newCreature = {...state.genericCreature, id};
            commit('ADD_CREATURE', newCreature);
            router.push(`/creatures/${id}`);
            commit('EDIT_MODE', {type: 'creature', mode: id});
            commit('SET_NEW', {type: 'creature', mode: true});
        }
    } catch(error) {
        throw Error("Error adding creature");
    }
};

const toggleEditing = ({ commit }, {type, mode}) => {
    commit('EDIT_MODE', {type: type, mode: mode});
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
            commit('EDIT_MODE', {type: 'room', mode: false});
            if (state.isNew.room) {
                commit('SET_NEW', {type: 'room', mode: false});
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
            if (state.isNew.room) {
                commit('SET_NEW', {type: 'room', mode: false});
                commit('SET_INFO_EXPANDED', false);
            }
            router.push("/rooms");
        }
    } catch (error) {
        throw Error("Error deleting room");
    }
};

const editCreature = async ({ commit, state }, updatedCreature) => {
    try {
        const response = await fetch(`https://heatherward.dev/rest/creatures/${updatedCreature.id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedCreature),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        const data = await response;
        if (data.status === 200) {
            commit('SAVE_CREATURE', updatedCreature);
            commit('EDIT_MODE', {type: 'creature', mode: false});
            if (state.isNew.creature) {
                commit('SET_NEW', {type: 'creature', mode: true});
            }
        }
    } catch (error) {
        throw Error("Error saving creature");
    }
};

const deleteCreature = async ({ commit, state }, id) => {
    try {
        const response = await fetch(`https://heatherward.dev/rest/creatures/${id}`, {
            method: 'DELETE'
        });
        const data = await response;
        if (data.status === 200) {
            commit('DELETE_CREATURE', id);
            if (state.isNew.room) {
                commit('SET_NEW', {type: 'creature', mode: false});
            }
            router.push("/creatures");
        }
    } catch (error) {
        throw Error("Error deleting creature");
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
    getCreatureData,
    addCreature,
    toggleEditing,
    toggleInfoExpanded,
    editRoom,
    deleteRoom,
    editCreature,
    deleteCreature,
    initializeKeycloak,
    refreshToken
};