import Vue from 'vue'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import RoomView from '@/views/RoomView/RoomView'

const localVue = createLocalVue();
localVue.use(Vuex);

var url;
var body;
var mockError;
var returnData;
var actions;
var store;
var room1;

const editor = {
    setContent: jest.fn()
};

const fake_keycloak_object = {token: "fake_token"};

global.fetch = jest.fn().mockImplementation((_url, _body) => {
    return new Promise((resolve, reject) => {
        if (mockError) {
            reject();
        }

        url = _url;
        body = _body;
        resolve(returnData);
    });
});

beforeEach(() => {
    url = '';
    body = {};
    mockError = false;
    returnData = {};
    room1 = {roomId: 1, roomName: "First room", type: "fighting", "tags": "", description: "good", rating: null, quality: null, difficulty: null, environment: null, darkvision: false, grid: false};

    actions = {
        toggleEditing: jest.fn(),
        toggleInfoExpanded: jest.fn(),
        editRoom: jest.fn()
    };

    store = new Vuex.Store({
        state: {
            KEYCLOAK_CONFIG: {
                realm: "marlos",
                url: "https://keycloak.heatherward.dev/auth",
                clientId: "marlos-front"
            },
            keycloak: fake_keycloak_object,
            rooms: {},
            infoExpanded: false,
            editing: null,
            isAdminUser: false,
            fetched: false
        },
        actions
    });
});

describe('RoomView', () => {
    // TODO broken due to separating components
    // it('displays a fetched room, does not display admin buttons, toggleInfo not expanded', async () => {
    //     returnData = {json: () => room1};
    //     const wrapper = shallowMount(RoomView, {
    //         store,
    //         localVue,
    //         mocks: {
    //             $route: { params: { id: room1.roomId } }
    //         }
    //     });
    //
    //     await Vue.nextTick();
    //
    //     expect(wrapper.isVueInstance()).toBeTruthy();
    //     expect(url).toBe(`https://heatherward.dev/rest/rooms/${room1.roomId}`);
    //     expect(body).toEqual({headers: {'Authorization': 'Bearer ' + fake_keycloak_object.token}});
    //     expect(wrapper.find('.room-name').text()).toBe(room1.roomName);
    //     expect(wrapper.find('.type').text()).toBe(room1.type);
    //     // expect(wrapper.find('.description').text()).toBe(room1.description);
    //     expect(wrapper.find('.edit-button').exists()).toBe(false);
    //     expect(wrapper.find('.delete-button').exists()).toBe(false);
    // });
    //
    // it('displays a room already found in state.rooms', () => {
    //    store.state.rooms = {1: room1};
    //    const wrapper = shallowMount(RoomView, {
    //        data() {
    //            return {
    //                editor
    //            }
    //        },
    //        store,
    //        localVue,
    //        mocks: {
    //            $route: {params: {id: room1.roomId}},
    //            editor: {setContent: jest.fn()}
    //        }
    //    });
    //
    //     expect(wrapper.find('.room-name').text()).toBe(room1.roomName);
    //     expect(wrapper.find('.type').text()).toBe(room1.type);
    //     expect(editor.setContent).toHaveBeenCalledWith(room1.description);
    // });

    it('caught an error', async () => {
        mockError = true;
        const wrapper = shallowMount(RoomView, {
            store,
            localVue,
            mocks: {
                $route: { params: { id: 2 } },
            }
        });

        await Vue.nextTick();

        expect(wrapper.vm.roomFound).toBe(false);
    });
    //
    // it('displays admin buttons', async () => {
    //     returnData = {json: () => room1};
    //     store.state.isAdminUser = true;
    //     const wrapper = shallowMount(RoomView, {
    //         store,
    //         localVue,
    //         mocks: {
    //             $route: { params: { id: room1.roomId } },
    //         }
    //     });
    //
    //     await Vue.nextTick();
    //
    //     expect(wrapper.find('.edit-button').exists()).toBe(true);
    //     expect(wrapper.find('.delete-button').exists()).toBe(true);
    //     expect(wrapper.find('.toggle-info').text()).toBe('► More info');
    //
    //     wrapper.find('.toggle-info').trigger('click');
    //     expect(actions.toggleInfoExpanded).toHaveBeenCalled();
    //
    //     wrapper.find('.edit-button').trigger('click');
    //     expect(actions.toggleEditing).toHaveBeenCalled();
    // });
    //
    // it('shows expanded info', async () => {
    //     returnData = {json: () => room1};
    //     store.state.infoExpanded = true;
    //     const wrapper = shallowMount(RoomView, {
    //         store,
    //         localVue,
    //         mocks: {
    //             $route: { params: { id: room1.roomId } },
    //         }
    //     });
    //
    //     await Vue.nextTick();
    //     expect(wrapper.find('.toggle-info').text()).toBe('▼ Less');
    // });
    //
    // it('displays editing mode areas', async () => {
    //     returnData = {json: () => room1};
    //     store.state.isAdminUser = true;
    //     store.state.editing = room1.roomId;
    //     const wrapper = shallowMount(RoomView, {
    //         store,
    //         localVue,
    //         mocks: {
    //             $route: { params: { id: room1.roomId } },
    //             toggleEditing: jest.fn(),
    //         }
    //     });
    //
    //     await Vue.nextTick();
    //
    //     expect(wrapper.find('.muted-button').exists()).toBe(true);
    //     expect(wrapper.find('.save-button').exists()).toBe(true);
    //     wrapper.find('.muted-button').trigger('click');
    //     expect(actions.toggleEditing).toHaveBeenCalled();
    //
    //     wrapper.find('.save-button').trigger('click');
    //     expect(actions.editRoom).toHaveBeenCalled();
    // });
    //
    // it('sets currentRoom parameters based on edit boxes', async() => {
    //     returnData = {json: () => room1};
    //     store.state.isAdminUser = true;
    //     store.state.editing = room1.roomId;
    //     store.state.infoExpanded = true;
    //
    //     const wrapper = shallowMount(RoomView, {
    //         store,
    //         localVue,
    //         mocks: {
    //             $route: { params: { id: room1.roomId } },
    //         }
    //     });
    //
    //     await Vue.nextTick();
    //
    //     wrapper.find('.room-name').element.innerText = 'New room name';
    //     wrapper.find('.room-name').trigger('blur');
    //     expect(wrapper.find('.room-name').text()).toBe('New room name');
    //
    //     wrapper.find('.type').element.innerText = 'RP';
    //     wrapper.find('.type').trigger('blur');
    //     expect(wrapper.find('.type').text()).toBe('RP');
    //
    //     wrapper.find('.rating').element.innerText = 'PG';
    //     wrapper.find('.rating').trigger('blur');
    //     expect(wrapper.find('.rating').text()).toBe('PG');
    //
    //     wrapper.find('.quality').element.innerText = 'A-';
    //     wrapper.find('.quality').trigger('blur');
    //     expect(wrapper.find('.quality').text()).toBe('A-');
    //
    //     wrapper.find('.difficulty').element.innerText = 'Hard';
    //     wrapper.find('.difficulty').trigger('blur');
    //     expect(wrapper.find('.difficulty').text()).toBe('Hard');
    //
    //     wrapper.find('.environment').element.innerText = 'Urban';
    //     wrapper.find('.environment').trigger('blur');
    //     expect(wrapper.find('.environment').text()).toBe('Urban');
    //
    //     // text selecting darkvision/grid
    // });
    //
    // it('displays darkvision and grid info if they are required', async () => {
    //     room1.darkvision = true;
    //     room1.grid = true;
    //     returnData = {json: () => room1};
    //     store.state.infoExpanded = true;
    //
    //     const wrapper = shallowMount(RoomView, {
    //         store,
    //         localVue,
    //         mocks: {
    //             $route: { params: { id: room1.roomId } },
    //         }
    //     });
    //
    //     await Vue.nextTick();
    //
    //     expect(wrapper.find('#darkvision').exists()).toBe(true);
    //     expect(wrapper.find('#grid').exists()).toBe(true);
    // });
});
