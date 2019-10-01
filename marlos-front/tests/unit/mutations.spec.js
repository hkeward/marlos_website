import mutations from '../../src/store/mutations.js'

var room_data;
var state;

beforeEach(() => {
    room_data = {
        4: {roomId: 4, roomName: 'Fourth room', type: 'Fighting', tags: []},
        16: {roomId: 16, roomName: 'Sixteen', type: 'RP', tags: []}
    };
    state = {
        rooms: {},
        fetched: false,
        editing: null,
        isAdminUser: false
    };
});



describe("SET_ROOMS", () => {
   it('sets fetched flag and populates state.rooms', () => {

     mutations.SET_ROOMS(state, room_data);

     expect(state).toEqual({
         rooms: { 4: { roomId: 4, roomName: 'Fourth room', type: 'Fighting', tags: []},
          16: { roomId: 16, roomName: 'Sixteen', type: 'RP', tags: []}},
         fetched: true,
         editing: null,
         isAdminUser: false
     });
   });
});


const newRoom1 = { roomId: 15, roomName: 'A new room', type: 'RP', tags: ['riddle']};
const newRoom2 = { roomId: 25, roomName: 'Second new room', type: 'Fighting', tags: ['magic']};

describe("ADD_ROOM", () => {
   it('adds a room to state.rooms when state.rooms is empty and when it is non-empty', () => {
       mutations.ADD_ROOM(state, newRoom1);

       expect(state.rooms).toEqual(
           { 15: { roomId: 15, roomName: 'A new room', type: 'RP', tags: ['riddle']}}
       );

       mutations.ADD_ROOM(state, newRoom2);

       expect(state.rooms).toEqual(
          { 15: { roomId: 15, roomName: 'A new room', type: 'RP', tags: ['riddle']},
            25: { roomId: 25, roomName: 'Second new room', type: 'Fighting', tags: ['magic']}}
       );
   });
});

describe('EDIT_MODE', () => {
   it('sets editing to mode', () => {
       mutations.EDIT_MODE(state, 15);

       expect(state.editing).toEqual(15);
   });
});


const updatedRoom = { roomId: 15, roomName: 'Better room name', type: 'Fighting', tags: ['riddle']};

describe("SAVE_ROOM", () => {
    it('changes the room name and type', () => {
        mutations.ADD_ROOM(state, newRoom1);
        mutations.SAVE_ROOM(state, updatedRoom);

        expect(state.rooms).toEqual(
            { 15: { roomId: 15, roomName: 'Better room name', type: 'Fighting', tags: ['riddle']}}
        );
    });
});

describe("DELETE_ROOM", () => {
   it('should delete a room', () => {
      mutations.SET_ROOMS(state, room_data);
      mutations.DELETE_ROOM(state, 4);

      expect(state.rooms).toEqual(
          { 16: {roomId: 16, roomName: 'Sixteen', type: 'RP', tags: []}}
      );
   });
});

describe("SET_USER_ROLE", () => {
   it('sets the isAdminUser state based on keycloak role', () => {
       const keycloak = {
           hasRealmRole: function(role) {
               const roles = ['admin'];
               return roles.includes(role);
           }
       };
       state = { ...state, keycloak};
       mutations.SET_USER_ROLE(state);

       expect(state.isAdminUser).toBe(true);
   });
});