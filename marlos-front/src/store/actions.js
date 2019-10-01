import router from '../router'

const getRoomData = async ({commit, state}) => {
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
        throw Error("Error fetching room data")
    }
};

const addRoom = async ({ commit, state }, room) => {
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
        throw Error("Error adding room");
    }
};

const toggleEditing = ({commit}, mode) => {
    commit('EDIT_MODE', mode);
};

const editRoom = async ({ commit, state }, updatedRoom) => {
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
        if (data.status === 200) {
            commit('SAVE_ROOM', updatedRoom);
            commit('EDIT_MODE', false);
        }
    } catch (error) {
        throw Error("Error saving room");
    }
};

const deleteRoom = async ({ commit, state }, roomId) => {
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
        throw Error("Error deleting room");
    }
};

const initializeKeycloak = ({ commit, state }) => {
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
};

export default {
    getRoomData,
    addRoom,
    toggleEditing,
    editRoom,
    deleteRoom,
    initializeKeycloak
};