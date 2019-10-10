import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import App from '@/App'

const localVue = createLocalVue();
localVue.use(Vuex);

var actions;
var store;

beforeEach(() => {

    actions = {
        getRoomData: jest.fn()
    };

    store = new Vuex.Store({
        state: {},
        actions
    });
});

describe('App', () => {
    it('retrieves room data and displays rooms', () => {
        const wrapper = shallowMount(App, {
            store,
            localVue,
            stubs: ['router-view']
        });

        expect(actions.getRoomData).toHaveBeenCalled();
    });
});