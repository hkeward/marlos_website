import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        KEYCLOAK_CONFIG: {
            realm: "marlos",
            url: "https://keycloak.heatherward.dev/auth",
            clientId: "marlos-front"
        },
        keycloak: {},
        rooms: {},
        creatures: {},
        editing: {
            room: null,
            creature: null,
            spell: null
        },
        isAdminUser: false,
        infoExpanded: false,
        isNew: {
            room: false,
            creature: false,
            spell: false
        },
        fetched: {
            rooms: false,
            creatures: false,
            spells: false
        },
        genericRoom: {
            name: "New room",
            timeEstimate: null,
            rating: null,
            difficulty: null,
            grid: null,
            darkvision: null,
            type: "Room type",
            environment: null,
            tags: "",
            quality: null,
            description: "Room description"
        },
        genericCreature: {
            name: "New creature",
            level: null,
            size: null,
            type: null,
            alignment: null,
            ac: null,
            hp: {
                average: null,
                hit_die: null
            },
            speed: {
                walk: null,
                burrow: null,
                climb: null,
                fly: null,
                swim: null
            },
            abilityScores: {
                strength: null,
                dexterity: null,
                constitution: null,
                intelligence: null,
                wisdom: null,
                charisma: null
            },
            savingThrows: {
                strength: null,
                dexterity: null,
                constitution: null,
                intelligence: null,
                wisdom: null,
                charisma: null
            },
            skills: null,
            damageImmunities: [],
            damageVulnerabilities: [],
            damageResistances: [],
            conditionImmunities: [],
            innateSpells: {
                atWill: [],
                oncePerDay: [],
                twicePerDay: [],
                thricePerDay: []
            },
            spells: [],
            senses: {
                blindsight: null,
                darkvision: null,
                tremorsense: null,
                truesight: null
            },
            languages: null,
            cr: {
                rating: null,
                experience: null
            },
            textReference: {
                book: null,
                pageNumber: null
            },
            abilities: [],
            actions: [],
            legendaryActions: []
        },
        creatureEnums: {
            size: {
                "TINY": "Tiny",
                "SMALL": "Small",
                "MEDIUM": "Medium",
                "LARGE": "Large",
                "HUGE": "Huge",
                "GARGANTUAN": "Gargantuan",
            },
            type: {
                "ABBERATION": "Abberation",
                "BEAST": "Beast",
                "CELESTIAL": "Celestial",
                "CONSTRUCT": "Construct",
                "DRAGON": "Dragon",
                "ELEMENTAL": "Elemental",
                "FEY": "Fey",
                "FIEND": "Fiend",
                "GIANT": "Giant",
                "HUMANOID": "Humanoid",
                "MONSTROSITY": "Monstrosity",
                "OOZE": "Ooze",
                "PLANT": "Plant",
                "UNDEAD": "Undead",
            },
            alignment: {
                "LAWFUL_GOOD": "Lawful good",
                "NEUTRAL_GOOD": "Neutral good",
                "CHAOTIC_GOOD": "Chaotic good",
                "LAWFUL_NEUTRAL": "Lawful neutral",
                "NEUTRAL": "Neutral",
                "CHAOTIC_NEUTRAL": "Chaotic neutral",
                "LAWFUL_EVIL": "Lawful evil",
                "NEUTRAL_EVIL": "Neutral evil",
                "CHAOTIC_EVIL": "Chaotic evil",
            }
        }
    },
    mutations,
    actions
});
