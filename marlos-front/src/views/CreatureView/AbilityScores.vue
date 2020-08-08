<template>
  <div>
<!--    {{ currentCreature.abilityScores }}-->
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

<style>

</style>