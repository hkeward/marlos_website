import * as Keycloak from "keycloak-js";

const SET_ROOMS = (state, rooms) => {
    state.fetched = true;
    state.rooms = rooms;
};

const ADD_ROOM = (state, newRoom) => {
    state.rooms = { ...state.rooms, [newRoom.id]: newRoom };
};

const EDIT_MODE = (state, mode) => {
    state.editing = mode;
};

const SET_INFO_EXPANDED = (state, mode) => {
    state.infoExpanded = mode;
};

const SET_NEW_ROOM = (state, mode) => {
    state.isNewRoom = mode;
};

const SAVE_ROOM = (state, updatedRoom) => {
    state.rooms[updatedRoom.id] = updatedRoom;
};

const DELETE_ROOM = (state, id) => {
    delete state.rooms[id];
};

const CONFIGURE_KEYCLOAK = (state) => {
    state.keycloak = new Keycloak(state.KEYCLOAK_CONFIG);
};


const SET_USER_ROLE = (state) => {
    state.isAdminUser = state.keycloak.hasRealmRole('admin');
};

export default {
    SET_ROOMS,
    ADD_ROOM,
    EDIT_MODE,
    SET_INFO_EXPANDED,
    SET_NEW_ROOM,
    SAVE_ROOM,
    DELETE_ROOM,
    CONFIGURE_KEYCLOAK,
    SET_USER_ROLE
};