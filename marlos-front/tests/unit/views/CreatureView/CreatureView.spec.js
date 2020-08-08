import Vue from 'vue'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import CreatureView from '@/views/CreatureView/CreatureView'

const localVue = createLocalVue();
localVue.use(Vuex);

var url;
var body;
var mockError;
var returnData;
var store;
var creature1;

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
    creature1 = {id: 1, "name": "First creature", "level": null, "size": null, "type": null, "alignment": null, "ac": null, "hp": { "average": null, "hit_die": null }, "speed": { "walk": null, "burrow": null, "climb": null, "fly": null, "swim": null }, "abilityScores": { "strength": null, "dexterity": null, "constitution": null, "intelligence": null, "wisdom": null, "charisma": null }, "savingThrows": { "strength": null, "dexterity": null, "constitution": null, "intelligence": null, "wisdom": null, "charisma": null }, "skills": null, "damageImmunities": [], "damageVulnerabilities": [], "damageResistances": [], "conditionImmunities": [], "innateSpells": { "atWill": [], "oncePerDay": [], "twicePerDay": [], "thricePerDay": [] }, "spells": [], "senses": { "blindsight": null, "darkvision": null, "tremorsense": null, "truesight": null }, "languages": null, "cr": { "rating": null, "experience": null }, "textReference": { "book": null, "pageNumber": null }, "abilities": [], "actions": [], "legendaryActions": []}

    store = new Vuex.Store({
        state: {
            creatures: {}
        }
    });
});

describe('CreatureView', () => {
    it('displays a creature already found in state.creatures', () => {
        store.state.creatures = {1: creature1};
        shallowMount(CreatureView, {
            store,
            localVue,
            mocks: {
                $route: {params: {id: creature1.id}},
            }
        });

        expect(fetch).not.toHaveBeenCalled();
    });

    it('fetches a creature not found in state.creatures', async () => {
        returnData = {json: () => creature1};
        shallowMount(CreatureView, {
            store,
            localVue,
            mocks: {
                $route: { params: { id: creature1.id } }
            }
        });

        await Vue.nextTick();

        expect(fetch).toHaveBeenCalled();
        expect(url).toBe(`https://heatherward.dev/rest/creatures/${creature1.id}`);
    });


    it('sets creatureFound to false if creature is not in state.creatures and cannot be fetched', async () => {
        mockError = true;
        const wrapper = shallowMount(CreatureView, {
            store,
            localVue,
            mocks: {
                $route: { params: { id: 2 } },
            }
        });

        await Vue.nextTick();

        expect(fetch).toHaveBeenCalled();
        expect(wrapper.vm.creatureFound).toBe(false);
    });
});
