<template>
  <div>
    <table>
      <tr>
        <th v-for="ability in Object.keys(currentCreature.abilityScores)" v-bind:key="ability">
          {{ ability.slice(0,3).toUpperCase() }}
        </th>
      </tr>
      <tr>
        <td v-for="(score, ability) in currentCreature.abilityScores" v-bind:key="ability">
          {{ score }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
    name: 'ability-scores',

    props: {
        currentCreature: Object
    },

    data() {
        return {
            cachedCreature: {}
        }
    }
}
</script>

<style scoped>
th, td {
  text-align: center;
  border-bottom: none;
}
table {
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid white;
}
</style>