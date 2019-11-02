import Vuex from 'vuex'
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import RoomList from '@/views/RoomList'

const localVue = createLocalVue();
localVue.use(Vuex);

var actions;
var store;
var room1;
var room2;

const fake_keycloak_object = {token: "fake_token"};

beforeEach(() => {
    room1 = {roomId: 1, roomName: "B First room", type: "fighting", tags: "magic, riddle", description: "good", rating: null, quality: null, difficulty: null, environment: null, darkvision: false, grid: false};
    room2 = {roomId: 2, roomName: "A Second room", type: "RP", tags: "magic", description: "Many spiders", rating: null, quality: null, difficulty: null, environment: null, darkvision: false, grid: false};

    actions = {
        getRoomData: jest.fn()
    };

    store = new Vuex.Store({
        state: {
            KEYCLOAK_CONFIG: {
                realm: "marlos",
                url: "https://keycloak.heatherward.dev/auth",
                clientId: "marlos-front"
            },
            keycloak: fake_keycloak_object,
            rooms: {1: room1, 2: room2},
            editing: null,
            isAdminUser: false,
            fetched: false
        },
        actions
    });
});

describe('RoomList', () => {
    it('retrieves room data and displays rooms alphabetically', () => {
        const wrapper = shallowMount(RoomList, {
            store,
            localVue,
            stubs: {
                RouterLink: RouterLinkStub
            }
        });

        expect(actions.getRoomData).toHaveBeenCalled();
        expect(wrapper.findAll('.room-button').length).toBe(2);
        expect(wrapper.find('#create-room').exists()).toBe(false);
        expect(wrapper.findAll('.room-button').at(0).text()).toBe("A Second room");
    });

    it('filters rooms', () => {
        const wrapper = shallowMount(RoomList, {
            store,
            localVue,
            stubs: {
                RouterLink: RouterLinkStub
            }
        });

        wrapper.findAll('.tag-button').at(1).trigger('click');
        expect(wrapper.findAll('.room-button').length).toBe(1);
        wrapper.findAll('.tag-button').at(0).trigger('click');
        expect(wrapper.vm.tagFilters.length).toBe(1);

        wrapper.find('.filter-button').trigger('click');
        expect(wrapper.findAll('.room-button').length).toBe(2);
    });

    it('displays create room button for admin users', () => {
        store.state.isAdminUser = true;
        const wrapper = shallowMount(RoomList, {
            store,
            localVue,
            stubs: {
                RouterLink: RouterLinkStub
            }
        });

        expect(wrapper.find('#create-room').exists()).toBe(true);
    });
});