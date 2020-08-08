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
var store;
var room1;

// from https://stackoverflow.com/a/52259482/8997224
beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
});
afterAll(() => {
    console.error.mockRestore();
});
afterEach(() => {
    console.error.mockClear();
});

beforeEach(() => {
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

    mockError = false;
    returnData = {};
    room1 = {
        id: 1,
        name: "First room",
        type: "fighting",
        tags: "",
        description: "good",
        rating: null,
        quality: null,
        difficulty: null,
        environment: null,
        darkvision: false,
        grid: false
    };

    store = new Vuex.Store({
        state: {
            rooms: {}
        }
    });
});

describe('RoomView', () => {
    it('displays a room already found in state.rooms', () => {
        store.state.rooms = {1: room1};
        shallowMount(RoomView, {
            store,
            localVue,
            mocks: {
                $route: {params: {id: room1.id}},
            }
        });

        expect(fetch).not.toHaveBeenCalled();
    });

    it('fetches a room not found in state.rooms', async () => {
        returnData = {json: () => room1};
        shallowMount(RoomView, {
            store,
            localVue,
            mocks: {
                $route: { params: { id: room1.id } }
            }
        });

        await Vue.nextTick();

        expect(fetch).toHaveBeenCalled();
        expect(url).toBe(`https://heatherward.dev/rest/rooms/${room1.id}`);
    });


    it('sets roomFound to false if room is not in state.rooms and cannot be fetched', async () => {
        mockError = true;
        const wrapper = shallowMount(RoomView, {
            store,
            localVue,
            mocks: {
                $route: { params: { id: 2 } },
            }
        });

        await Vue.nextTick();

        expect(fetch).toHaveBeenCalled();
        expect(wrapper.vm.roomFound).toBe(false);
    });
});
