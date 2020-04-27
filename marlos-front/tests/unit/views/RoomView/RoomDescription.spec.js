import Vuex from 'vuex';
import RoomDescription from '@/views/RoomView/RoomDescription'
import {shallowMount, createLocalVue} from "@vue/test-utils";

const localVue = createLocalVue();
localVue.use(Vuex);

let store;
let room1;

beforeEach(() => {
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
            rooms: {},
            editing: {room: null, creature: null, spell: null},
        }
    });
});

describe('RoomDescription', () => {
    it('displays the room description', () => {
        const wrapper = shallowMount(RoomDescription, {
            store,
            localVue,
            propsData: {
                currentRoom: room1
            }
        });

        expect(wrapper.find('.description').text()).toBe(room1.description);
        expect(wrapper.find('.editing').exists()).toBe(false);
    });

    it('displays editing bar', () => {
        store.state.editing.room = room1.id;
        const wrapper = shallowMount(RoomDescription, {
            store,
            localVue,
            propsData: {
                currentRoom: room1
            }
        });

        expect(wrapper.find('.editing').exists()).toBe(true);
        expect(wrapper.find('.editor-menu-bar').exists()).toBe(true);
    });
});

describe('RoomDescription functions', () => {
    it('cleans link URLs', () => {
        const wrapper = shallowMount(RoomDescription, {
            store,
            localVue,
            propsData: {
                currentRoom: room1
            }
        });
        expect(wrapper.vm.cleanLinkUrl("github.com")).toBe("https://www.github.com");
        expect(wrapper.vm.cleanLinkUrl("https://github.com")).toBe("https://github.com");
        expect(wrapper.vm.cleanLinkUrl("www.github.com")).toBe("https://www.github.com");
        expect(wrapper.vm.cleanLinkUrl("https://www.github.com")).toBe("https://www.github.com");
    });
});