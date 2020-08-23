<template>
  <div>
    <div v-if="currentCreature.damageVulnerabilities.length > 0">
      <strong>Vulnerabilities</strong> {{ currentCreature.damageVulnerabilities.map(({ damage_type }) => damage_type).join(", ") | title_case }}
    </div>
    <div v-if="currentCreature.damageImmunities.length > 0">
      <strong>Damage Immunities</strong> {{ currentCreature.damageImmunities.map(({ damage_type }) => damage_type).join(", ") | title_case }}
    </div>
    <div v-if="currentCreature.conditionImmunities.length > 0">
      <strong>Condition Immunities</strong> {{ currentCreature.conditionImmunities.map(({ damage_type }) => damage_type).join(", ") | title_case }}
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
        ])
    }
}
</script>

<style>

</style>