<template>
    <div>
        <div v-if="currentCreature.actions.length > 0" id="actions">
            <hr />
            <h3>Actions</h3>
            <div v-for="action in currentCreature.actions" v-bind:key="action.id" class="action">
                <i><strong>{{ action.name }}.</strong></i> {{action.description}}
            </div>
        </div>
        <div v-if="currentCreature.legendaryActions.length > 0" id="legendary-actions">
            <hr />
            <h3>Legendary Actions</h3>
            <div v-for="action in currentCreature.legendaryActions" v-bind:key="action.id" class="action">
                <i><strong>{{ action.name }}.</strong></i> {{ action.description }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'actions',

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

<style scoped>
h3 {
    margin: 0;
}

.action {
    margin: 10px 0;
}
</style>