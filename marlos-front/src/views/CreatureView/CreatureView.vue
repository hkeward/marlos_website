<template>
  <div v-if="creatureFound">
    <creature-title-info :currentCreature="currentCreature" />
    <div>
      <p>Raw json of the object, I'll prettify this later</p>
      <p>{{ currentCreature }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CreatureTitleInfo from './CreatureTitleInfo'

export default {
    name: 'creature-view',

    components: {
        CreatureTitleInfo
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