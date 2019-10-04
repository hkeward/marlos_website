import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import RoomForm from '../../src/views/RoomForm'

const localVue = createLocalVue();
localVue.use(Vuex);

var actions;
var store;

const fake_keycloak_object = {token: "fake_token"};

beforeEach(() => {
    actions = {
        addRoom: jest.fn()
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
            editing: null,
            isAdminUser: false,
            fetched: false
        },
        actions
    });
});

describe('RoomForm', () => {
    it('submits a valid room', () => {
        const wrapper = shallowMount(RoomForm, {
            store,
            localVue
        });

        wrapper.find('#type').setValue("Fighting");
        wrapper.find("form").trigger('submit');
        expect(wrapper.find('.error-message').text()).toBe("❗ Please fill out all required fields");

        wrapper.find('#room-name').setValue("A Town Within");
        wrapper.find('#tags').setValue("riddle");
        wrapper.find("form").trigger('submit');
        expect(actions.addRoom).toHaveBeenCalled();
        expect(wrapper.find('.success-message').text()).toBe("✅ Room successfully added");
    });
});