<template>
  <div id="creature-list">
    <div id="header-info">
      <div class="title">
        <h1>Creatures</h1>
      </div>
    </div>
    <div id="interact-buttons">
      <div class="search-bar">
        <input v-model="searchTerm"
               placeholder="Search creatures"
               onfocus="this.placeholder=''"
               onblur="this.placeholder='Search creatures'"
               v-on:keyup.escape="searchTerm=''"
               id="search"
         />
      </div>
      <div>
        <button v-if="isAdminUser" @click="addCreature" id="create-creature">Create new creature</button>
      </div>
    </div>
    <p v-if="creatures.length < 1" class="empty-table">
      No creatures in database
    </p>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Creature</th>
            <th>Level</th>
            <th>Size</th>
            <th>Type</th>
            <th>Alignment</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="creature in filteredCreatures" v-bind:key="creature.id">
            <td>
              <router-link tag="button" class="creature-button" :to="{ name: 'creature', params: { id: creature.id }}">
                {{ creature.name }}
              </router-link>
            </td>

            <td>
              {{ creature.level }}
            </td>

            <td>
              {{ creature.size }}
            </td>

            <td>
              {{ creature.type }}
            </td>

            <td>
              {{ creature.alignment }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'creature-list',

    data() {
        return {
            searchTerm: ''
        }
    },

    methods: {
        ...mapActions([
            'getCreatureData',
            'addCreature'
        ])
    },

    computed: {
        ...mapState([
            'creatures',
            'isAdminUser'
        ]),

        filteredCreatures: function() {
            var creatures_array = Object.keys(this.creatures).map(key => this.creatures[key]);

            var filteredCreatures = creatures_array.filter(creature => {
                return (creature.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
            });

            return filteredCreatures.sort((a, b) => {
               return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
            });
        }
    },

    mounted() {
        this.getCreatureData();
    }
}
</script>


<style scoped>
  #header-info {
    display: flex;
    justify-content: space-between;
  }

  .title {
    display: flex;
    justify-content: flex-start;
  }

  h1 {
    margin-bottom: 5px;
  }

  .search-bar {
    display: flex;
    justify-content: flex-start;
    vertical-align: middle;
  }

  input {
    padding: 0.5rem;
    font-size: 0.9rem;
    border-radius: 3px;
    border-style: hidden;
  }

  #interact-buttons {
    margin: 10px 0 10px 0;
    display: flex;
    justify-content: space-between;
  }

  .filter-button {
    margin: 0 5px 0 0;
  }

  #create-creature {
    background: #AAC97A;
    border-color: #AAC97A;
    color: #1F2430;
  }

  #create-creature:hover {
    background: #1F2430;
    color: white;
  }

  .creature-button {
    width: 15rem;
    margin-bottom: 0;
  }

  table {
    margin-bottom: 3rem;
  }

</style>
