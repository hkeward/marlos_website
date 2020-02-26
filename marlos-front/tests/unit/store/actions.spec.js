import actions from '@/store/actions.js'

var url;
var body;
var mockError;
var returnData;

var commit;
var state;

const room1 = { roomId: 1, roomName: "First room", type: "Fighting", tags: ""};
const room2 = { roomId: 2, roomName: "Second room", type: "RP", tags: "first tag"};

const room1_updated = {roomId: 1, roomName: "First room renamed", type: "Fighting", tags: ""};

beforeEach(() => {
    commit = jest.fn();
    state = {keycloak: {token: ""}, fetched: false, genericRoom: room1};
    url = '';
    body = {};
    mockError = false;
    returnData = {};
});

global.fetch = jest.fn(returnData).mockImplementation((_url, _body) => {
    return new Promise((resolve, reject) => {
        if (mockError) {
            reject();
        }

        url = _url;
        body = _body;
        resolve(returnData);
    });
});

describe("getRoomData", () => {
   it("retrieved room data", async () => {
       returnData = {json: () => [room1, room2]};
       await actions.getRoomData({commit, state});

       expect(url).toBe("https://heatherward.dev/rest/rooms");
       expect(commit).toHaveBeenCalledWith('SET_ROOMS', { 1: room1, 2: room2});
   });

   it('did not fetch room data if it was already fetched', async () => {
        state.fetched = true;
        await actions.getRoomData({commit, state});

        expect(commit).not.toHaveBeenCalled();
   });

   it("caught an error", async () => {
      mockError = true;

      await expect(actions.getRoomData({commit, state})).rejects.toThrow("Error fetching room data");
   });
});

describe("addRoom", () => {
    it("added a room", async () => {
       returnData = {json: () => room1.roomId, status: 200};
       await actions.addRoom({commit, state});

       expect(url).toBe("https://heatherward.dev/rest/rooms");
       expect(body).toEqual({method: 'POST', body: JSON.stringify(room1), headers: {'Content-type': 'application/json; charset=UTF-8'}});
       expect(commit).toHaveBeenCalledWith('ADD_ROOM', room1);
    });

    it("caught an error", async () => {
       mockError = true;

       await expect(actions.addRoom({commit, state})).rejects.toThrow("Error adding room");
    });
});

describe('toggleEditing', () => {
   it('toggles edit mode', () => {
       const mode = room1.roomId;
       actions.toggleEditing({commit}, mode);

       expect(commit).toHaveBeenCalledWith('EDIT_MODE', mode);
   });
});

describe('editRoom', () => {
    it('edited a room', async () => {
        returnData = {status: 200};

        await actions.editRoom({commit, state}, room1_updated);

        expect(url).toBe(`https://heatherward.dev/rest/rooms/${room1_updated.roomId}`);
        expect(body).toEqual({
            method: 'PUT',
            body: JSON.stringify(room1_updated),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }});
        expect(commit).toHaveBeenCalledWith('SAVE_ROOM', room1_updated);
        expect(commit).toHaveBeenCalledWith('EDIT_MODE', false);
    });

    it('caught an error', async () => {
        mockError = true;

        await expect(actions.editRoom({commit, state}, room1_updated)).rejects.toThrow("Error saving room");
    });
});

describe('deleteRoom', () => {
    it('deleted a room', async () => {
        returnData = {status: 200};

        await actions.deleteRoom({commit, state}, room1.roomId);

        expect(url).toBe(`https://heatherward.dev/rest/rooms/${room1.roomId}`);
        expect(body).toEqual({
            method: 'DELETE'
        });
        expect(commit).toHaveBeenCalledWith('DELETE_ROOM', room1.roomId);
    });

    it('caught an error', async () => {
        mockError = true;

        await expect(actions.deleteRoom({commit, state}, room1.roomId)).rejects.toThrow("Error deleting room");
    });
});

describe('initializeKeycloak', () => {
    it('initialized keycloak', () => {
        actions.initializeKeycloak({commit, state});

        expect(commit).toHaveBeenCalledWith('CONFIGURE_KEYCLOAK');
    });
});