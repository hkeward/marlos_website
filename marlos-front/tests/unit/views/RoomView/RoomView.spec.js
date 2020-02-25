import Vue from 'vue'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import RoomTitleInfo from '@/views/RoomView/RoomTitleInfo'

const localVue = createLocalVue();
localVue.use(Vuex);

var url;
var body;
var mockError;
var returnData;
var actions;
var store;
var room1;

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
    it('displays a roomName and type for a room, does not display admin buttons', () => {
        const wrapper = shallowMount(RoomTitleInfo, {
            store,
            localVue,
            propsData: {
                currentRoom: room1,
            },
        });

        expect(wrapper.find('.room-name').text()).toBe(room1.roomName);
        expect(wrapper.find('.type').text()).toBe(room1.type);
        expect(wrapper.find('.edit-button').exists()).toBe(false);
        expect(wrapper.find('.delete-button').exists()).toBe(false);
    });

    it('displays admin buttons (edit, delete)',  () => {
        store.state.isAdminUser = true;
        const wrapper = shallowMount(RoomTitleInfo, {
            store,
            localVue,
            propsData: {
                currentRoom: room1
            }
        });

        expect(wrapper.find('.edit-button').exists()).toBe(true);
        expect(wrapper.find('.delete-button').exists()).toBe(true);

        wrapper.find('.edit-button').trigger('click');
        expect(actions.toggleEditing).toHaveBeenCalled();
    });

    // TODO separate onEdit somehow so I don't have to call it using $parent
    // calling using $parent is not portable and proving difficult to test
    // it('displays editing mode buttons',  () => {
    //     store.state.isAdminUser = true;
    //     store.state.editing = room1.roomId;
    //     const wrapper = shallowMount(RoomTitleInfo, {
    //         store,
    //         localVue,
    //         propsData: {
    //             currentRoom: room1,
    //         },
    //         mocks: {
    //             $parent : {
    //                 onEdit : jest.fn(),
    //             },
    //         },
    //     });
    //
    //     console.log(wrapper.$parent);
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
    // TODO what if we're editing more than 1 room in different pages?
    //    should I add editing info to each room object?
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
    // });
});
