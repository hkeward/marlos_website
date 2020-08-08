<template>
  <div v-if="creatureFound">
    <creature-title-info :currentCreature="currentCreature" />
    <ability-scores :currentCreature="currentCreature"></ability-scores>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CreatureTitleInfo from './CreatureTitleInfo'
import AbilityScores from './AbilityScores.vue'

export default {
    name: 'creature-view',

    components: {
        CreatureTitleInfo,
        AbilityScores
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
            if (Object.keys(this.genericCreature).includes(e.target.id)) {
                this.currentCreature[e.target.id] = e.target.innerText;
            }
        }
    },

    created() {
        this.getCurrentCreature(this.$route.params.id);
    }
}
</script>

<style>

</style>