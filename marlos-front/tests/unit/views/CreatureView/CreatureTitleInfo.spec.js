import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import CreatureTitleInfo from '@/views/CreatureView/CreatureTitleInfo'

const localVue = createLocalVue();
localVue.use(Vuex);

var cancelEdit;
var actions;
var store;
var creature1;

const parentComponentStub = { name:"parentStub", template:'<div></div>', methods: {onEdit: jest.fn()}};

beforeEach(() => {
    cancelEdit = jest.fn();
    creature1 = {id: 1, "name": "First creature", "level": null, "size": null, "type": null, "alignment": null, "ac": null, "hp": { "average": null, "hit_die": null }, "speed": { "walk": null, "burrow": null, "climb": null, "fly": null, "swim": null }, "abilityScores": { "strength": null, "dexterity": null, "constitution": null, "intelligence": null, "wisdom": null, "charisma": null }, "savingThrows": { "strength": null, "dexterity": null, "constitution": null, "intelligence": null, "wisdom": null, "charisma": null }, "skills": null, "damageImmunities": [], "damageVulnerabilities": [], "damageResistances": [], "conditionImmunities": [], "innateSpells": { "atWill": [], "oncePerDay": [], "twicePerDay": [], "thricePerDay": [] }, "spells": [], "senses": { "blindsight": null, "darkvision": null, "tremorsense": null, "truesight": null }, "languages": null, "cr": { "rating": null, "experience": null }, "textReference": { "book": null, "pageNumber": null }, "abilities": [], "actions": [], "legendaryActions": []}

    actions = {
        toggleEditing: jest.fn(),
        editCreature: jest.fn()
    };

    store = new Vuex.Store({
        state: {
            creatures: {},
            editing: {room: null, creature: null, spell: null},
            isAdminUser: false,
            isNew: {
                room: false,
                creature: false,
                spell: false
            }
        },
        actions
    });
});

describe('CreatureTitleInfo', () => {
    it('displays a name for a creature, does not display admin buttons', () => {
        const wrapper = shallowMount(CreatureTitleInfo, {
            store,
            localVue,
            propsData: {
                currentCreature: creature1,
            },
        });

        expect(wrapper.find('.creature-name').text()).toBe(creature1.name);
        expect(wrapper.find('.edit-button').exists()).toBe(false);
        expect(wrapper.find('.delete-button').exists()).toBe(false);
    });

    it('displays admin buttons (edit, delete)',  () => {
        store.state.isAdminUser = true;
        const wrapper = shallowMount(CreatureTitleInfo, {
            store,
            localVue,
            propsData: {
                currentCreature: creature1
            }
        });

        expect(wrapper.find('.edit-button').exists()).toBe(true);
        expect(wrapper.find('.delete-button').exists()).toBe(true);

        wrapper.find('.edit-button').trigger('click');
        expect(actions.toggleEditing).toHaveBeenCalled();
    });

    it('displays editing mode buttons',  () => {
        store.state.isAdminUser = true;
        store.state.editing.creature = creature1.id;
        const wrapper = shallowMount(CreatureTitleInfo, {
            parentComponent: parentComponentStub,
            store,
            localVue,
            propsData: {
                currentCreature: creature1,
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
        expect(actions.editCreature).toHaveBeenCalled();
    });
});
