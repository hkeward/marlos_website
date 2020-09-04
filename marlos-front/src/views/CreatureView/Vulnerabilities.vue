<template>
  <div>
    <div v-if="currentCreature.damageVulnerabilities.length > 0">
      <strong>Vulnerabilities</strong> {{ currentCreature.damageVulnerabilities.map(({ damage_type }) => damage_type).join(", ") | title_case }}
    </div>
    <div v-if="currentCreature.damageImmunities.length > 0">
      <strong>Damage Immunities</strong> {{ currentCreature.damageImmunities.map(({ damage_type }) => damage_type).join(", ") | title_case }}
    </div>
    <div v-if="currentCreature.conditionImmunities.length > 0">
      <strong>Condition Immunities</strong> {{ currentCreature.conditionImmunities.map(({ condition_type }) => condition_type).join(", ") | title_case }}
    </div>
    <div v-if="Object.values(currentCreature.senses).includes(true) || currentCreature.senses.other.length > 0">
      <strong>Senses</strong> {{ senses | title_case }}
    </div>
    <div v-if="currentCreature.languages.length > 0">
      <strong>Languages</strong> {{ currentCreature.languages.split(",").join(", ") }}
    </div>
    <div>
      <strong>Challenge</strong> {{ currentCreature.cr.rating }} ({{ currentCreature.cr.experience }} XP)
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';


export default {
  name: 'vulnerabilities',

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
    senses() {
      return Object.entries(this.currentCreature.senses).map(([key, value]) => {
        if (key === "other") {
          return value;
        } else if (value === true) {
          return key;
        }
      }).filter((key) => key).join(", ");
    }
  },
}
</script>

<style>

</style>