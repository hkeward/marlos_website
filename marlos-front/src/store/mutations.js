import * as Keycloak from "keycloak-js";

const SET_ROOMS = (state, rooms) => {
    state.fetched.rooms = true;
    state.rooms = rooms;
};

const ADD_ROOM = (state, newRoom) => {
    state.rooms = { ...state.rooms, [newRoom.id]: newRoom };
};

const SET_CREATURES = (state, creatures) => {
    state.fetched.creatures = true;
    state.creatures = creatures;
};

const ADD_CREATURE = (state, newCreature) => {
    state.creatures = { ...state.creatures, [newCreature.id]: newCreature };
};

const SAVE_CREATURE = (state, updatedCreature) => {
    state.creatures[updatedCreature.id] = updatedCreature;
};

const DELETE_CREATURE = (state, id) => {
    delete state.creatures[id];
};

const EDIT_MODE = (state, {type, mode}) => {
    state.editing[type] = mode;
};

const SET_INFO_EXPANDED = (state, mode) => {
    state.infoExpanded = mode;
};

const SET_NEW = (state, {type, mode}) => {
    state.isNew[type] = mode;
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
    SET_CREATURES,
    ADD_CREATURE,
    EDIT_MODE,
    SET_INFO_EXPANDED,
    SET_NEW,
    SAVE_ROOM,
    DELETE_ROOM,
    SAVE_CREATURE,
    DELETE_CREATURE,
    CONFIGURE_KEYCLOAK,
    SET_USER_ROLE
};