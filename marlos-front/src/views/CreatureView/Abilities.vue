<template>
    <div>
        <div v-if="abilities_defined" class="ability">
            <hr />
            <div v-for="ability in currentCreature.abilities" v-bind:key="ability.id">
                <i><strong>{{ ability.name }}.</strong></i> {{ ability.description }}
            </div>
        </div>

        <div v-if="currentCreature.spellcastingAbility.description.length > 0" class="ability">
            <strong><i>Spellcasting</i></strong> {{ currentCreature.spellcastingAbility.description }}
        </div>
        <div class="ability spells">
            <div v-if="level1_spells.length > 0">
                Level 1: {{ level1_spells.map((spell) => spell.name).join(", ") | title_case }}
            </div>
            <div v-if="level2_spells.length > 0">
                Level 2: {{ level2_spells.map((spell) => spell.name).join(", ") | title_case }}
            </div>
            <div v-if="level3_spells.length > 0">
                Level 3: {{ level3_spells.map((spell) => spell.name).join(", ") | title_case }}
            </div>
            <div v-if="level4_spells.length > 0">
                Level 4: {{ level4_spells.map((spell) => spell.name).join(", ") | title_case }}
            </div>
            <div v-if="level5_spells.length > 0">
                Level 5: {{ level5_spells.map((spell) => spell.name).join(", ") | title_case }}
            </div>
            <div v-if="level6_spells.length > 0">
                Level 6: {{ level6_spells.map((spell) => spell.name).join(", ") | title_case }}
            </div>
            <div v-if="level7_spells.length > 0">
                Level 7: {{ level7_spells.map((spell) => spell.name).join(", ") | title_case }}
            </div>
        </div>

        <div v-if="currentCreature.innateSpellcastingAbility.description.length > 0" class="ability">
            <strong><i>Innate Spellcasting</i></strong> {{ currentCreature.innateSpellcastingAbility.description }}
        </div>
        <div class="ability spells">
            <div v-if="Object.values(currentCreature.innateSpells).filter((spell_array) => spell_array.length > 0).length > 0">
                <div v-if="currentCreature.innateSpells.atWill.length > 0">
                    At will: {{ currentCreature.innateSpells.atWill.map((spell) => spell.name).join(", ") | title_case }}
                </div>
                <div v-if="currentCreature.innateSpells.oncePerDay.length > 0">
                    Once per day: {{ currentCreature.innateSpells.oncePerDay.map((spell) => spell.name).join(", ") | title_case }}
                </div>
                <div v-if="currentCreature.innateSpells.twicePerDay.length > 0">
                    Twice per day: {{ currentCreature.innateSpells.twicePerDay.map((spell) => spell.name).join(", ") | title_case }}
                </div>
                <div v-if="currentCreature.innateSpells.thricePerDay.length > 0">
                    Thrice per day: {{ currentCreature.innateSpells.thricePerDay.map((spell) => spell.name).join(", ") | title_case }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "abilities",

    props: {
        currentCreature: Object
    },

    data() {
        return {
            cachedCreature: {}
        }
    },

    computed: {
        ...mapState([
            'editing',
            'isAdminUser'
        ]),
        abilities_defined() {
            return !!(this.currentCreature.abilities.length > 0 || this.currentCreature.spells.length > 0 || Object.keys(this.currentCreautre.innateSpells).filter((key) => this.currentCreature.innateSpells[key].length > 0));
        },
        level1_spells() {
            return this.currentCreature.spells.filter((spell) => spell.spellLevel === 1);
        },
        level2_spells() {
            return this.currentCreature.spells.filter((spell) => spell.spellLevel === 2);
        },
        level3_spells() {
            return this.currentCreature.spells.filter((spell) => spell.spellLevel === 3);
        },
        level4_spells() {
            return this.currentCreature.spells.filter((spell) => spell.spellLevel === 4);
        },
        level5_spells() {
            return this.currentCreature.spells.filter((spell) => spell.spellLevel === 5);
        },
        level6_spells() {
            return this.currentCreature.spells.filter((spell) => spell.spellLevel === 6);
        },
        level7_spells() {
            return this.currentCreature.spells.filter((spell) => spell.spellLevel === 7);
        }
    }
}
</script>

<style>
.spells {
    text-indent: 10px;
}

.ability {
    margin: 10px 0;
}
</style>