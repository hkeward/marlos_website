<template>
  <div v-if="creatureFound" class="creature-card">
    <creature-title-info :currentCreature="currentCreature" />
    <ac-block :currentCreature="currentCreature" />
    <ability-scores :currentCreature="currentCreature"></ability-scores>
    <vulnerabilities :currentCreature="currentCreature"></vulnerabilities>
    <abilities :current-creature="currentCreature"></abilities>
    <actions :currentCreature="currentCreature"></actions>
  </div>
  <div v-else>
    <h1> No creatures with ID {{ this.$route.params.id }} found.</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CreatureTitleInfo from './CreatureTitleInfo'
import AcBlock from "./ACBlock";
import AbilityScores from './AbilityScores'
import Vulnerabilities from './Vulnerabilities'
import Abilities from './Abilities'
import Actions from './Actions'

export default {
    name: 'creature-view',

    components: {
        CreatureTitleInfo,
        AcBlock,
        AbilityScores,
        Vulnerabilities,
        Abilities,
        Actions
    },

    data() {
        return {
            currentCreature: {}
        }
    },

    computed: {
        ...mapState([
            'creatures',
            'genericCreature'
        ]),
        creatureFound() {
            return this.currentCreature.id || false;
        }
    },

    methods: {
        async getCurrentCreature (id) {
            if (id in this.creatures) {
                this.currentCreature = this.creatures[id];
            } else {
                try {
                    const response = await fetch(`https://heatherward.dev/rest/creatures/${id}`, {});
                    this.currentCreature = await response.json();
                } catch (err) {
                    console.error(err);
                }
            }
        },

        onEdit(e) {
            var levels = e.target.id.split('.');
            if (checkNested(this.genericCreature, levels[0], levels.slice(1,))) {
              setNested(this.currentCreature, levels, e.target.innerText);
            }

            function checkNested(obj, level, ...rest) {
                if (obj === undefined) {
                    return false;
                }
                if (rest.length == 0 && obj.hasOwnProperty(level)) {
                    return true;
                } else {
                    return checkNested(obj[level], ...rest);
                }
            }

            function setNested(obj, path, value) {
                if (path.length == 1) {
                    obj[path] = value;
                    return;
                }
                return setNested(obj[path[0]], path.slice(1), value)
            }
        }
    },

    created() {
        this.getCurrentCreature(this.$route.params.id);
    }
}
</script>

<style>
.creature-card {
  padding-bottom: 10em;
}
</style>