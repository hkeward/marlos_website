<template>
  <div id="creature-header">
    <div id="title-info">
      <div>
        <h1 v-if="editing.creature === currentCreature.id" v-text="currentCreature.name" @blur="$parent.onEdit" id="name" class="creature-name editing" contenteditable="true">
        </h1>

        <h1 v-else class="creature-name" contenteditable="false">
          {{ currentCreature.name }}
        </h1>
      </div>

      <div>
        <div v-if="editing.creature === currentCreature.id" id="size_type_alignment">
          <div>
            <select v-model="currentCreature.size">
              <option disabled value="">--Size--</option>
              <option v-for="(size, code) in creatureEnums.size" :value="code" :key="code">
                {{ size }}
              </option>
            </select>
          </div>
          <div>
            <select v-model="currentCreature.type">
              <option disabled value="">--Type--</option>
              <option v-for="(type, code) in creatureEnums.type" :value="code" :key="code">
                {{ type }}
              </option>
            </select>
          </div>
          <div>
            <select v-model="currentCreature.alignment">
              <option disabled value="">--Alignment--</option>
              <option v-for="(alignment, code) in creatureEnums.alignment" :value="code" :key="code">
                {{ alignment }}
              </option>
            </select>
          </div>
        </div>

        <div v-else id="size_type_alignment">
          <div class="type" contenteditable="false">
            {{ currentCreature.size | title_case }}
          </div>
          <div class="type" contenteditable="false">
            {{ currentCreature.type | lowercase }},
          </div>
          <div class="type" contenteditable="false">
            {{ currentCreature.alignment | lowercase }}
          </div>
        </div>
      </div>

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
            'isNew',
            'creatureEnums'
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
  #title-info {
    display: flex;
    flex-direction: column;
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
    margin: 0;
  }

  #size_type_alignment {
    display: flex;
    font-style: italic;
  }

  /* this is a disgusting way to make spaces appear Heather */
  /*#size_type_alignment div {*/
  /*  margin-right: 2px;*/
  /*}*/
</style>