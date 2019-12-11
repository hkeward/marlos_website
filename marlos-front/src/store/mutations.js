import * as Keycloak from "keycloak-js";

const SET_ROOMS = (state, rooms) => {
    state.fetched = true;
    state.rooms = rooms;
};

const ADD_ROOM = (state, newRoom) => {
    state.rooms = { ...state.rooms, [newRoom.roomId]: newRoom };
};

const EDIT_MODE = (state, mode) => {
    state.editing = mode;
};

const SET_INFO_EXPANDED = (state, mode) => {
    state.infoExpanded = mode;
};

const SAVE_ROOM = (state, updatedRoom) => {
    state.rooms[updatedRoom.roomId] = updatedRoom;
};

const DELETE_ROOM = (state, roomId) => {
    delete state.rooms[roomId];
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
    SAVE_ROOM,
    DELETE_ROOM,
    CONFIGURE_KEYCLOAK,
    SET_USER_ROLE
};