import Vuex from 'vuex'
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import CreatureList from '@/views/CreatureList'

const localVue = createLocalVue();
localVue.use(Vuex);

var actions;
var store;
var creature1;
var creature2;

const fake_keycloak_object = {token: "fake_token"};

beforeEach(() => {
    creature1 = {id: 1, "name": "First creature", "level": null, "size": null, "type": null, "alignment": null, "ac": null, "hp": { "average": null, "hit_die": null }, "speed": { "walk": null, "burrow": null, "climb": null, "fly": null, "swim": null }, "abilityScores": { "strength": null, "dexterity": null, "constitution": null, "intelligence": null, "wisdom": null, "charisma": null }, "savingThrows": { "strength": null, "dexterity": null, "constitution": null, "intelligence": null, "wisdom": null, "charisma": null }, "skills": null, "damageImmunities": [], "damageVulnerabilities": [], "damageResistances": [], "conditionImmunities": [], "innateSpells": { "atWill": [], "oncePerDay": [], "twicePerDay": [], "thricePerDay": [] }, "spells": [], "senses": { "blindsight": null, "darkvision": null, "tremorsense": null, "truesight": null }, "languages": null, "cr": { "rating": null, "experience": null }, "textReference": { "book": null, "pageNumber": null }, "abilities": [], "actions": [], "legendaryActions": []}
    creature2 = {id: 2, "name": "A Second creature", "level": null, "size": null, "type": null, "alignment": null, "ac": null, "hp": { "average": null, "hit_die": null }, "speed": { "walk": null, "burrow": null, "climb": null, "fly": null, "swim": null }, "abilityScores": { "strength": null, "dexterity": null, "constitution": null, "intelligence": null, "wisdom": null, "charisma": null }, "savingThrows": { "strength": null, "dexterity": null, "constitution": null, "intelligence": null, "wisdom": null, "charisma": null }, "skills": null, "damageImmunities": [], "damageVulnerabilities": [], "damageResistances": [], "conditionImmunities": [], "innateSpells": { "atWill": [], "oncePerDay": [], "twicePerDay": [], "thricePerDay": [] }, "spells": [], "senses": { "blindsight": null, "darkvision": null, "tremorsense": null, "truesight": null }, "languages": null, "cr": { "rating": null, "experience": null }, "textReference": { "book": null, "pageNumber": null }, "abilities": [], "actions": [], "legendaryActions": []}

    actions = {
        getCreatureData: jest.fn()
    };

    store = new Vuex.Store({
        state: {
            KEYCLOAK_CONFIG: {
                realm: "marlos",
                url: "https://keycloak.heatherward.dev/auth",
                clientId: "marlos-front"
            },
            keycloak: fake_keycloak_object,
            creatures: {1: creature1, 2: creature2},
            editing: {room: null, creature: null, spell: null},
            isAdminUser: false,
            fetched: {creatures: false}
        },
        actions
    });
});

describe('CreatureList', () => {
    it('retrieves creature data and displays creatures alphabetically', () => {
        const wrapper = shallowMount(CreatureList, {
            store,
            localVue,
            stubs: {
                RouterLink: RouterLinkStub
            }
        });

        expect(actions.getCreatureData).toHaveBeenCalled();
        expect(wrapper.findAll('.creature-button').length).toBe(2);
        expect(wrapper.find('#create-creature').exists()).toBe(false);
        expect(wrapper.findAll('.creature-button').at(0).text()).toBe("A Second creature");
    });

    it('filters creatures on search term', () => {
        const wrapper = shallowMount(CreatureList, {
            store,
            localVue,
            stubs: {
                RouterLink: RouterLinkStub
            }
        });

        wrapper.find('#search').setValue('second');
        expect(wrapper.findAll('.creature-button').length).toBe(1);
    });

    it('displays create creature button for admin users', () => {
        store.state.isAdminUser = true;
        const wrapper = shallowMount(CreatureList, {
            store,
            localVue,
            stubs: {
                RouterLink: RouterLinkStub
            }
        });

        expect(wrapper.find('#create-creature').exists()).toBe(true);
    });
});