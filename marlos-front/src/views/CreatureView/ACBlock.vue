<template>
  <div>
    <div v-if="editing.creature == currentCreature.id && isAdminUser" id="ac_hp_speed">
      <div class="flex-start">
        <div class="labeled-div">
          <div>
            <div>
              <strong>Armour class</strong>
            </div>
            <div>
              <strong>Hit points</strong>
            </div>
            <div>
              <strong>Speed</strong>
            </div>
          </div>

          <div>
            <div v-text="currentCreature.ac" @blur="$parent.onEdit" id="ac" class="ac editing" contenteditable="true"></div>
            <div class="flex-start">
                Average<div v-text="currentCreature.hp.average" @blur="$parent.onEdit" id="hp.average" class="hp.average editing" contenteditable="true"></div>
                <div></div>
                Num hit die<div v-text="currentCreature.hp.die_count" @blur="$parent.onEdit" id="hp.die_count" class="hp.die_count editing" contenteditable="true"></div>
                Hit die<div v-text="currentCreature.hp.hit_die" @blur="$parent.onEdit" id="hp.hit_die" class="hp.hit_die editing"></div>
            </div>
            <div v-text="currentCreature.speed.walk" @blur="$parent.onEdit" id="speed.walk" class="speed-walk editing" contenteditable="true"></div>
          </div>

        </div>
        </div>
      </div>

    <div v-else id="ac_hp_speed">

      <div>
        <div>
          <strong>Armour class</strong> {{ currentCreature.ac }}
        </div>
        <div>
          <strong>Hit points</strong> {{ currentCreature.hp.average }} ({{ currentCreature.hp.die_count }}{{ currentCreature.hp.hit_die }} + {{ currentCreature.abilityScores.constitution }})
        </div>
        <div>
          <strong>Speed</strong> {{ currentCreature.speed.walk }}
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ac-block',

    props: {
        currentCreature: Object,
    },

    data() {
        return {
            cachedCreature: {},
        }
    },

    computed: {
        ...mapState([
            'editing',
            'isAdminUser'
        ])
    },

    methods: {
    }
}
</script>

<style>
.flex-start {
  display: flex;
  justify-content: flex-start;
}
</style>