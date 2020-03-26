import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import RoomTitleInfo from '@/views/RoomView/RoomTitleInfo'

const localVue = createLocalVue();
localVue.use(Vuex);

var cancelEdit;
var actions;
var store;
var room1;

const parentComponentStub = { name:"parentStub", template:'<div></div>', methods: {onEdit: jest.fn()}};

beforeEach(() => {
    cancelEdit = jest.fn();
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

    actions = {
        toggleEditing: jest.fn(),
        editRoom: jest.fn()
    };

    store = new Vuex.Store({
        state: {
            rooms: {},
            editing: null,
            isAdminUser: false,
        },
        actions
    });
});

describe('RoomTitleInfo', () => {
    it('displays a name and type for a room, does not display admin buttons', () => {
        const wrapper = shallowMount(RoomTitleInfo, {
            store,
            localVue,
            propsData: {
                currentRoom: room1,
            },
        });

        expect(wrapper.find('.room-name').text()).toBe(room1.name);
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

    it('displays editing mode buttons',  () => {
        store.state.isAdminUser = true;
        store.state.editing = room1.id;
        const wrapper = shallowMount(RoomTitleInfo, {
            parentComponent: parentComponentStub,
            store,
            localVue,
            propsData: {
                currentRoom: room1,
            },
            methods: {
                cancelEdit: cancelEdit
            }
        });

        expect(wrapper.find('.muted-button').exists()).toBe(true);
        expect(wrapper.find('.save-button').exists()).toBe(true);
        wrapper.find('.muted-button').trigger('click');
        expect(cancelEdit).toHaveBeenCalled();

        wrapper.find('.save-button').trigger('click');
        expect(actions.editRoom).toHaveBeenCalled();
    });
});
