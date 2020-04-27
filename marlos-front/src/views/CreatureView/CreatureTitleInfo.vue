<template>
  <div id="creature-header">
    <div id="title-info">

      <h1 v-if="editing.creature === currentCreature.id" v-text="currentCreature.name" @blur="$parent.onEdit" id="name" class="creature-name editing" contenteditable="true">
      </h1>

      <h1 v-else class="creature-name" contenteditable="false">
        {{ currentCreature.name }}
      </h1>


      <h3 v-if="editing.creature === currentCreature.id" v-text="currentCreature.type" @blur="$parent.onEdit" id="type" class="type editing" contenteditable="true">
      </h3>

      <h3 v-else class="type" contenteditable="false">
        {{ currentCreature.type }}
      </h3>

    </div>

    <div v-if="editing.creature === currentCreature.id && isAdminUser" class="edit-bar">

      <button @click="editCreature(currentCreature)" class="save-button">
        Save
      </button>

      <button @click="isNew.creature ? deleteCreature(currentCreature.id) : cancelEdit()" class="muted-button">
        Cancel
      </button>

    </div>

    <div v-else-if="isAdminUser" class="edit-bar">

      <button @click="editMode(currentCreature)" class="edit-button">
        Edit
      </button>

      <button @click="deleteCreature(currentCreature.id)" class="delete-button">
        Delete
      </button>
    </div>

    <div v-else class="edit-bar">
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'creature-title-info',

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
            'isAdminUser',
            'isNew'
        ])
    },

    methods: {
        ...mapActions([
            'editCreature',
            'deleteCreature',
            'toggleEditing'
        ]),

        editMode(creature) {
            this.cachedCreature = Object.assign({}, creature);
            this.toggleEditing({type: 'creature', mode: creature.id});
        },

        cancelEdit() {
            Object.assign(this.currentCreature, this.cachedCreature);
            this.currentCreature.__ob__.dep.notify();
            this.toggleEditing({type: 'creature', mode: false});
        },
    },
}
</script>

<style scoped>
  .delete-button, .edit-button, .save-button, .muted-button {
    margin: 30px 0 10px 5px;
  }

  #title-info {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
  }

  #creature-header {
    display: flex;
    justify-content: space-between;
  }

  .creature-name {
    font-weight: 900;
    margin-right: 1rem;
    border: 1px solid transparent;
  }

  .type {
    font-weight: 400;
    border: 1px solid transparent;
  }

  .save-button {
    background: #AAC97A;
    border-color: #AAC97A;
    color: #1F2430;
  }

  .save-button:hover {
    color: white;
  }

  .delete-button {
    background: #D33C40;
    border-color: #D33C40;
  }

  .muted-button {
    background: #6D7392;
    border-color: #6D7392;
  }

  .edit-bar {
    margin: 30px 0 0 0;
    display: flex;
    justify-content: flex-end;
  }
</style>