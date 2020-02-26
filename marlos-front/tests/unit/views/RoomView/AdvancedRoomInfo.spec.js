import Vue from 'vue';
import Vuex from 'vuex';
import AdvancedRoomInfo from '@/views/RoomView/AdvancedRoomInfo'
import {shallowMount, createLocalVue} from "@vue/test-utils";

const localVue = createLocalVue();
localVue.use(Vuex);

let store;
let room1;
let parentComponentStub;

beforeEach(() => {
    parentComponentStub = { name:"parentStub", template:'<div></div>', methods: {onEdit: jest.fn()} };
    room1 = {
        roomId: 1,
        roomName: "First room",
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
            rooms: {},
            infoExpanded: false,
            editing: null,
            isAdminUser: false,
        }
    });
});

describe('AdvancedRoomInfo', () => {
    it('shows expanded info', async () => {
        store.state.infoExpanded = true;
        const wrapper = shallowMount(AdvancedRoomInfo, {
            store,
            localVue,
            propsData: {
                currentRoom: room1,
            },
        });

        await Vue.nextTick();

        expect(wrapper.find('.toggle-info').text()).toBe('▼ Less');
    });

    it('emits an event on focus change', async() => {
        store.state.isAdminUser = true;
        store.state.editing = room1.roomId;
        store.state.infoExpanded = true;
        const wrapper = shallowMount(AdvancedRoomInfo, {
            parentComponent: parentComponentStub,
            store,
            localVue,
            propsData: {
                currentRoom: room1,
            },
        });

        await Vue.nextTick();

        wrapper.find('.rating').element.innerText = 'PG';
        wrapper.find('.rating').trigger('blur');
        expect(parentComponentStub.methods.onEdit).toHaveBeenCalledTimes(1);

        wrapper.find('.quality').element.innerText = 'A-';
        wrapper.find('.quality').trigger('blur');
        expect(parentComponentStub.methods.onEdit).toHaveBeenCalledTimes(2);

        wrapper.find('.difficulty').element.innerText = 'Hard';
        wrapper.find('.difficulty').trigger('blur');
        expect(parentComponentStub.methods.onEdit).toHaveBeenCalledTimes(3);

        wrapper.find('.environment').element.innerText = 'Urban';
        wrapper.find('.environment').trigger('blur');
        expect(parentComponentStub.methods.onEdit).toHaveBeenCalledTimes(4);
    });

    it('displays darkvision and grid info if they are required', async () => {
        room1.darkvision = true;
        room1.grid = true;
        store.state.infoExpanded = true;

        const wrapper = shallowMount(AdvancedRoomInfo, {
            store,
            localVue,
            propsData: {
                currentRoom: room1,
            },
        });

        await Vue.nextTick();

        expect(wrapper.find('#darkvision').exists()).toBe(true);
        expect(wrapper.find('#grid').exists()).toBe(true);
    });
});
