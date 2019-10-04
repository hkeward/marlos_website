import Vuex from 'vuex'
import { shallowMount, createLocalVue, RouterLinkStub} from '@vue/test-utils'
import Navbar from '../../src/components/Navbar'

const localVue = createLocalVue();
localVue.use(Vuex);

var actions;
var store;

const fake_keycloak_object = {token: "fake_token", logout: jest.fn(), idTokenParsed: {preferred_username: 'hkeward'}};

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

describe('Navbar', () => {
    it('displays username', () => {
        const wrapper = shallowMount(Navbar, {
            store,
            localVue,
            stubs: {
                RouterLink: RouterLinkStub
            }
        });

        expect(wrapper.find('#user-banner').text()).toBe(`Welcome ${store.state.keycloak.idTokenParsed.preferred_username}`);
    });

    it('allows a user to log out', () => {
        const wrapper = shallowMount(Navbar, {
            store,
            localVue,
            stubs: {
                RouterLink: RouterLinkStub
            }
        });

        wrapper.find('#log-out').trigger('click');
        expect(store.state.keycloak.logout).toHaveBeenCalled();
    });
});